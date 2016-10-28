import React, {Component} from 'react';

class AddStashModal extends Component {

  render() {
    return <div>
    <input type="radio" name="point"
               value="Point"
               checked={this.props.geometry === "Point"}
               onChange={this.props.onGeometryChange} />Point
    {' '}
    <input type="radio" name="line"
               value="LineString"
               checked={this.props.geometry === "LineString"}
               onChange={this.props.onGeometryChange} />Line
    {' '}
     <input type="radio" name="polygon"
                value="Polygon"
                checked={this.props.geometry === "Polygon"}
                onChange={this.props.onGeometryChange} />Polygon
    </div>
  }
}

module.exports = AddStashModal;
