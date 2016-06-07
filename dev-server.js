var path = require("path");
var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.config.dev");
var request = require("request");

var app = express();
var compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/Zika_meta", function(req, res) {
  request("http://nextstrain.org/data/Zika_meta.json", function(err,r) {
    if (err) {console.log('error getting data', err)}
    // console.log(r.toJSON())
    res.send(r.toJSON());
  });
});

app.get("/Zika_tree", function(req, res) {
  //request("http://nextstrain.org/data/Zika_tree.json", function(err,r) {
  request("http://flu.tuebingen.mpg.de/data/zika_tree.json", function(err,r) {
    if (err) {console.log('error getting data', err)}
    res.send(r.toJSON());
  });
});


app.get("/Zika_entropy", function(req, res) {
  request("http://flu.tuebingen.mpg.de/data/zika_entropy.json", function(err,r) {
    if (err) {console.log('error getting data', err)}
    res.send(r.toJSON());
  });
});


app.get("/Zika_sequences", function(req, res) {
  request("http://nextstrain.org/data/Zika_sequences.json", function(err,r) {
    if (err) {console.log('error getting data', err)}
    res.send(r.toJSON());
  });
});

app.get("/Zika_frequencies", function(req, res) {
  request("http://nextstrain.org/data/Zika_frequencies.json", function(err,r) {
    if (err) {console.log('error getting data', err)}
    res.send(r.toJSON());
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

var port = 4000;

app.listen(port, "localhost", function(err) {
  if (err) {
    console.log("error", err);
    return;
  }

  console.log("Listening at http://localhost:" + port);
});
