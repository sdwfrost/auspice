import React from "react";
import Radium from "radium";
// import _ from "lodash";
// import Flex from "./framework/flex";
// import { connect } from "react-redux";
// import { FOO } from "../actions";

// @connect(state => {
//   return state.FOO;
// })
@Radium
class ColorBy extends React.Component {
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
  getStyles() {
    return {
      base: {
        marginBottom: 20
      }
    };
  }
  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.base}>
        <span> Color by </span>
        <select id="coloring">
          <option value="region"> geographic region </option>
        </select>
      </div>
    );
  }
}

export default ColorBy;
