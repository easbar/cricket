import * as React from "react";
import PropTypes from 'prop-types'

export class LatLngInput extends React.Component {
  static propTypes = {
    extValue: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    onInput: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState = {
      rawStringValue: props.extValue || '',
      lat: 0,
      lng: 0,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.extValue !== prevProps.extValue) {
      const v = this.isValid(this.props.extValue);
      if (v) {
        this.onChange(v.lat+","+v.lng);
      }
    }
  }

  onChange(newValue) {
    this.setState({
      rawStringValue: newValue
    });
  }

  onBlur() {
    const v = this.isValid(this.state.rawStringValue);
    if (!v) {
      this.setState(this.defaultState);
    } else {
      this.setState(v);
      if (this.props.onInput)
        this.props.onInput(v);
    }
  }

  isValid(v) {
    if (!v) return false;
    const vals = v.trim().split(',');
    if (vals.length !== 2) return false;
    const vLat = parseFloat(vals[0]);
    const vLng = parseFloat(vals[1]);
    if (isNaN(vLat)) return false;
    if (isNaN(vLng)) return false;
    return {lat: vLat.toFixed(6), lng: vLng.toFixed(6)};
  }

  render() {
    return <input
      spellCheck="false"
      className="maputnik-number"
      placeholder="lat,lng"
      value={this.state.rawStringValue}
      onChange={e => this.onChange(e.target.value)}
      onBlur={() => this.onBlur()}
    />
  }
}
