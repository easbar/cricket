import React from "react";
import {LatLngInput} from "./lat-lng-input";
import InputBlock from "../components/inputs/InputBlock";
import NumberInput from "../components/inputs/NumberInput";
import Button from "../components/Button";
import StringInput from "../components/inputs/StringInput";
import SelectInput from "../components/inputs/SelectInput";
import PropTypes from "prop-types";

export default class GraphhopperTools extends React.Component {
  static propTypes = {
    ghToolsPoints: PropTypes.object,
    onGoToCoordinate: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.state.routingOpts = {
      traversalMode: 'node',
      ch: 'on',
      lm: 'off',
      vehicle: 'car',
      weighting: 'fastest'
    }
  }

  updateRoutingQuery() {
     }

  buildRouteQuery() {
    if (!this.props.ghToolsPoints.routingFrom || !this.props.ghToolsPoints.routingTo) {
      return 'Select from/to points for routing';
    }
    const edgeBased = this.state.routingOpts.traversalMode === 'edge';
    const chDisabled = this.state.routingOpts.ch === 'off';
    const lmDisabled = this.state.routingOpts.lm === 'off';
    return `http://localhost:8989/route`
       +`?point=${this.coord2Str(this.props.ghToolsPoints.routingFrom, 6)}`
       + `&point=${this.coord2Str(this.props.ghToolsPoints.routingTo, 6)}`
       + `&edge_based=${edgeBased}`
       + `&ch.disable=${chDisabled}`
       + `&lm.disable=${lmDisabled}`
       + `&vehicle=${this.state.routingOpts.vehicle}`
       + `&weighting=${this.state.routingOpts.weighting}`;

  }

  render() {
    const routeQuery = this.buildRouteQuery();

    return <div>
      <h1>Navigation</h1>
      <InputBlock label={"Go to coordinate: "} >
        <LatLngInput onInput={this.props.onGoToCoordinate}/>
      </InputBlock>
      <InputBlock label={"Go to node id: (todo)"}>
        <NumberInput/>
      </InputBlock>
      <InputBlock label={"Go to edge id: (todo)"}>
        <NumberInput/>
      </InputBlock>

      <h1>Routing</h1>
      <InputBlock label={"From: "}>
        <LatLngInput extValue={this.coord2Str(this.props.ghToolsPoints.routingFrom)}/>
      </InputBlock>
      <InputBlock label={"To: "}>
        <LatLngInput extValue={this.coord2Str(this.props.ghToolsPoints.routingTo)}/>
      </InputBlock>
      <InputBlock label={"TraversalMode"} doc={''} data-wd-key={'tmode'}>
        <SelectInput
          options={[
            ['node', 'node-based'],
            ['edge', 'edge-based']
          ]}
          value={this.state.routingOpts.traversalMode}
          onChange={(tMode) => {
            this.setState(state => state.routingOpts.traversalMode = tMode);
            this.updateRoutingQuery();
          }}
        />
      </InputBlock>
      <InputBlock label={"Vehicle"} doc={''} data-wd-key={'vehicle'}>
        <StringInput
          value={this.state.routingOpts.vehicle}
          onChange={(vehicle) => {
            this.setState(state => state.routingOpts.vehicle = vehicle);
            this.updateRoutingQuery();
          }}
        />
      </InputBlock>
      <InputBlock label={"Weighting"} doc={''} data-wd-key={'weighting'}>
        <StringInput
          value={this.state.routingOpts.weighting}
          onChange={(weighting) => {
            this.setState(state => state.routingOpts.weighting = weighting);
            this.updateRoutingQuery();
          }}
        />
      </InputBlock>
      <InputBlock label={"CH"} doc={''} data-wd-key={'ch'}>
        <SelectInput
          options={[
            ['on', 'on'],
            ['off', 'off']
          ]}
          value={this.state.routingOpts.ch}
          onChange={(ch) => {
            this.setState(state => state.routingOpts.ch = ch);
            this.updateRoutingQuery();
          }}
        />
      </InputBlock>
      <InputBlock label={"LM"} doc={''} data-wd-key={'lm'}>
        <SelectInput
          options={[
            ['on', 'on'],
            ['off', 'off']
          ]}
          value={this.state.routingOpts.lm}
          onChange={(lm) => {
            this.setState(state => state.routingOpts.lm = lm);
            this.updateRoutingQuery();
          }}
        />
      </InputBlock>
      <StringInput
        multi={true}
        value={routeQuery}
        onChange={() => {}}
        default="routing query"
      />
      <Button
        data-wd-key="layer-filter-button"
        className="maputnik-add-filter"
        onClick={console.log}>
        Calculate Route (todo)
      </Button>

      <h1>Location Index</h1>
      <InputBlock label={"Snap Coordinate: (todo)"}>
        <LatLngInput extValue={this.coord2Str(this.props.ghToolsPoints.snapping)}/>
      </InputBlock>
    </div>
  }

  coord2Str(p, fixed) {
    return !p ? '' : fixed ? (p.lat.toFixed(fixed) + "," + p.lng.toFixed(fixed)) : (p.lat +","+p.lng);
  }
}
