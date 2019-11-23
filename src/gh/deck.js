import React from 'react';
import DeckGL, {LineLayer, MapController} from 'deck.gl';
import MapboxGlMap from "../components/map/MapboxGlMap";

// Viewport settings
const viewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

// DeckGL react component
export default class MyDeck extends React.Component {
  render() {
    const layers = [
      new LineLayer({id: 'line-layer', data})
    ];

    return (
      <DeckGL controller={true} initialViewState={viewState} layers={layers}>
      </DeckGL>
    );
  }
}
