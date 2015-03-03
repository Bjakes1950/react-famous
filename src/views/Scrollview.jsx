import RenderNode from 'famous/core/RenderNode';
import Scrollview from 'famous/views/Scrollview';
import toPlainObject from 'lodash/lang/toPlainObject';
import React from 'react';
import cloneWithProps from 'react/lib/cloneWithProps';

import FamousMixin from '../lib/FamousMixin';

export default React.createClass({
  mixins: [FamousMixin],

  propTypes: {
    direction: React.PropTypes.number,
    drag: React.PropTypes.number,
    friction: React.PropTypes.number,
    edgeDamp: React.PropTypes.number,
    edgeGrip: React.PropTypes.number,
    edgePeriod: React.PropTypes.number,
    groupScroll: React.PropTypes.bool,
    margin: React.PropTypes.number,
    pageDamp: React.PropTypes.number,
    pagePeriod: React.PropTypes.number,
    pageStopSpeed: React.PropTypes.number,
    pageSwitchSpeed: React.PropTypes.number,
    paginated: React.PropTypes.bool,
    rails: React.PropTypes.bool,
    speedLimit: React.PropTypes.number,
    syncScale: React.PropTypes.number
  },

  famousCreate() {
    let scrollview = new Scrollview(this.props.options);
    this.setFamous(scrollview);
    this.setFamousNode(this.getFamousParentNode().add(scrollview));

    let sequence = this.props.children.map(() => new RenderNode());
    scrollview.sequenceFrom(sequence);
    this.setFamousKeyedNodes(toPlainObject(sequence));
  },

  famousUpdate(nextProps) {
    let scrollview = this.getFamous();

    scrollview.setOptions(nextProps.options);
  },

  render() {
    if (!this.getFamousReady()) { return null; }

    return (
      <div data-famous="Scrollview">
        {this.props.children.map((child, key) => cloneWithProps(child, {key}))}
      </div>
    );
  }
});
