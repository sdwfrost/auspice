import React from "react";
import { connect } from "react-redux";
import {
  populateMetadataStore,
  populateTreeStore,
  populateSequencesStore,
  populateEntropyStore,
  populateFrequenciesStore
} from "../actions";

import Radium from "radium";
import _ from "lodash";
// import {Link} from "react-router";
// import Awesome from "react-fontawesome";
import Flex from "./framework/flex";
import Header from "./header";
import Controls from "./controls";
import Tree from "./tree";
import Footer from "./footer";

const returnStateNeeded = (fullStateTree) => {
  return {
    metadata: fullStateTree.metadata,
    tree: fullStateTree.tree,
    entropy: fullStateTree.entropy,
    sequences: fullStateTree.sequences,
    frequencies: fullStateTree.frequencies
  };
};

@connect(returnStateNeeded)
@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
      // sidebarDocked: true,
    };
  }
  static propTypes = {
    /* react */
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    /* component api */
    error: React.PropTypes.object,
    loading: React.PropTypes.bool,
    user: React.PropTypes.object,
    routes: React.PropTypes.array,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"

  }
  componentDidMount() {
    this.props.dispatch(populateMetadataStore());
    this.props.dispatch(populateTreeStore());
    this.props.dispatch(populateSequencesStore());
    this.props.dispatch(populateEntropyStore());
    this.props.dispatch(populateFrequenciesStore());
  }
  drawTreeIfData() {
    const p = this.props;
    let markup;

    if (
      p.metadata.metadata &&
      p.tree.tree &&
      p.sequences.sequences &&
      p.frequencies.frequencies
    ) {
      markup = (<Tree/>);
    }

    return markup
  }
  drawDiversityIfData() {
    const p = this.props;
    let markup;

    if (
      p.entropy.entropy
    ) {
      markup = (<Tree/>);
    }

    return markup
  }
  render() {
    return (
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        direction="column"
        style={{
          height: "100%",
          margin: 40
        }}>
        <Header/>
        <Flex
          style={{
            width: "100%"
          }}
          wrap="wrap"
          justifyContent="space-between">
          <Controls/>
          {this.drawTreeIfData()}
        </Flex>
        <Footer/>
      </Flex>
    );
  }
}

export default App;
