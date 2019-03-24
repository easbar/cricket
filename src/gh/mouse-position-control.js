export default class MousePositionControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-ctrl-zoom';

    this.addEventListeners();

    return this._container;
  }

  updateMousePosition(lngLat) {
    const lat = lngLat.lat.toFixed(6);
    const lng = lngLat.lng.toFixed(6);
    this._container.innerHTML = `lat,lng: ${lat}, ${lng}`;
  }

  addEventListeners() {
    this._map.on('mousemove', e => this.updateMousePosition(e.lngLat));
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
