import React from 'react'
import PropTypes from 'prop-types'

export default class MapContextMenu extends React.Component {
  static propTypes = {
    point: PropTypes.func.isRequired,
    popup: PropTypes.func.isRequired
  }

  onCopyToClipboard() {
    copyToClipboard(this.props.point.lat.toFixed(6)+","+this.props.point.lng.toFixed(6));
    this.props.popup.remove();
  }

  onStartRoute() {

  }

  onStopRoute() {

  }

  render() {
    return <div>
      <div className="gh-map-popup-layer-id">Routing</div>
        <label className="gh-map-popup-layer" onClick={() => this.onStartRoute()}>start route here (todo)</label>
        <label className="gh-map-popup-layer" onClick={() => this.onStopRoute()}>stop route here (todo)</label>
      <div className="gh-map-popup-layer-id">Tools</div>
        <label className="gh-map-popup-layer" onClick={() => this.onCopyToClipboard()}>copy coordinate to clipboard</label>
    </div>
  }
}

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData("Text", text);

  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");  // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
