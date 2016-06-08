import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from './framework/flex';
import { connect } from 'react-redux';
// import { FOO } from '../actions';
import { diversityChart } from "../visualization/diversityChart";

const returnStateNeeded = (fullStateTree) => {
  return {
    entropy: fullStateTree.entropy,
  }
}

@connect(returnStateNeeded)
@Radium
class Diversity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  componentDidMount() {
    diversityChart(this.props.entropy.entropy);
  }
  getStyles() {
    return {
      base: {

      }
    };
  }
  render() {
    const styles = this.getStyles();
    return (
      <div style={[
        styles.base,
        this.props.style
      ]}>
        <p> diversity </p>
        <div className="c3"/>
        <div className="entropy-container">
            <div id="entropy"></div>
        </div>
      </div>
    );
  }
}

export default Diversity;
