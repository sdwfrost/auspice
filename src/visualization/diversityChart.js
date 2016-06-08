export const diversityChart = (entropy, callback) => {
    console.log('enter diversityChart');
    var container = d3.select('.entropy-container');
    var canvas = '#entropy';

    var width = 800; //parseInt(container.style("width"), 10);
    var height = 250;
    console.log("diversity chart dimensions:", width, height);

    function generate(){
        var chart_data = {};
        var chart_types = {};
        var chart_xaxis = {};
        var posToAA = {};
        var ymin = 0;
        var xmax = 0;
        var anno_count= 0;
        var x, gene, start, end;
        for (x in entropy){
            start = entropy[x]['pos'][0]; end = entropy[x]['pos'][entropy[x]['pos'].length-1];
            chart_data['x'+x+'anno'] = [start, 0.5*(start+end), end];
            chart_data[x+'anno'] = [anno_count%3, anno_count%3, anno_count%3].map(function (d) {return -0.1*(d+1);});
            anno_count+=1;
            if (ymin>chart_data[x+'anno'][0]){
                ymin = chart_data[x+'anno'][0];
            }
            chart_types[x+'anno'] = 'line';
            chart_xaxis[x+'anno'] = 'x'+x+'anno';
        }
        for (gene in entropy){
            chart_data[gene]=entropy[gene]['val'];
            chart_data['x'+gene]=entropy[gene]['pos'];
            for (var ii=0; ii<entropy[gene]['pos'].length; ii++){
                if (typeof posToAA[entropy[gene]['pos'][ii]]=="undefined"){
                    posToAA[entropy[gene]['pos'][ii]] = [[gene, entropy[gene]['codon'][ii]]];
                }else{
                    posToAA[entropy[gene]['pos'][ii]].push([gene,entropy[gene]['codon'][ii]]);
                }
            }
            xmax = d3.max(chart_data['x'+gene])>xmax?d3.max(chart_data['x'+gene]):xmax;
            chart_types[gene]='bar';
            chart_xaxis[gene]='x'+gene;
        }
        ymin-=0.1;

        var entropy_chart = c3.generate({
            bindto: canvas,
            size: {width: width-10, height: height},
            onresize: function() {
                width = parseInt(container.style("width"), 10);
                height = 250;
                console.log("diversity chart dimensions:", width, height);
                entropy_chart.resize({height: height, width: width});
            },
            legend: {show: false},
            color: {pattern: ["#AAA"]},
            axis: {
                y: {
                    label: {
                        text: 'variability',
                        position: 'outer-middle'
                    },
                    tick: {
                        values: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6],
                        outer: false
                    },
                    min:ymin,
                },
                x: {
                    label: {
                        text: 'position',
                        position: 'outer-center'
                    },
                    tick: {
                        outer: false,
                        values: ([0,1,2,3,4,5,6]).map(function (d){
                            var dec = Math.pow(10,Math.floor(Math.log(xmax/5) / Math.LN10));
                            var step = dec*Math.floor(xmax/5/dec);
                            console.log('tick',d*step);
                            return d*step;
                        })
                    }
                },
            },
            data: {
                xs: chart_xaxis,
                json: chart_data,
                types: chart_types,
                onclick: callback,
                onmouseover: function (d){
                    document.body.style.cursor = "pointer";
                },
                onmouseout: function (d){
                    document.body.style.cursor = "default";
                },
                labels:{
                    format:function (v, id, i, j){
                        //console.log(v, id, i);
                        if ((typeof id !="undefined")&&(id.substring(id.length-4)=='anno')&&(i==1)) {
                            return id.substring(0,id.length-4);
                        }else{return '';}
                    }
                },
            },
            bar: {width: 2},
            grid: {
                y: {
                    lines: [{value: 0}]
                },
                focus:{
                    show:false
                }
            },
            tooltip: {
                format: {
                    title: function (d) {return posToAA[d][0][0]+" "+(posToAA[d][0][1]+1);},
                    value: function (value, ratio, id) {
                        return id.substring(id.length-4)=='anno'?"start/stop":"Variability: "+value;
                    }
                }
            },
            labels:{
                format:function (v, id, i, j){
                    if ((typeof id !="undefined")&&(id.substring(id.length-4)=='anno')&&(i==1)){
                        return id.substring(0,id.length-4);
                    }else{return '';}
                }
            },

        });
    }
    generate();
    console.log('chart: got to the end');
}

