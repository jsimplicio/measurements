import React from 'react';
import './App.css';

const scales = {
  1: 'Cups',
  2: 'Gallons',
  3: 'Quarts',
  4: 'Pints',
  5: 'Ounces',
  6: 'Tablespoons',
  7: 'Teaspoons'
};

function toCups(unit) {
  return unit / 8;
}

function toTablespoons(unit) {
  return unit / 8;
}

function toOunces(unit) {
  return unit * 8;
}

function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class UnitInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.state = {
      content: 'Cups'
    }
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  handleUnitChange(e) {
    const content = e.target.value;
    this.setState({ content: content })
  }

  render() {
    const value = this.props.value;
    const scale = scales[Math.floor(Math.random() * (7 - 0) + 1)];

    return (
      <div className="container">
        <form id="units-conversion">
          <div className= "form-group">
            <label><h3>Unit in {scale}</h3></label>
            <div className="input-select">
              <input className="form-control text-center" id="focusedInputed" type="text" value={value}
                onChange={this.handleChange} />
              <div className="select">
                <select name="values" id="measurements" onChange={this.handleUnitChange} value={scale} form="units-conversion">
                  <option value="Cups">Cups</option>
                  <option value="Gallons">Gallons</option>
                  <option value="Quarts">Quarts</option>
                  <option value="Pints">Pints</option>
                  <option value="Ounces">Ounces</option>
                  <option value="Tablespoons">Tablespoons</option>
                  <option value="Teaspoons">Teaspoons</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCupsChange = this.handleCupsChange.bind(this);
    this.handleOuncesChange = this.handleOuncesChange.bind(this);
    this.state = {value: '', scale: 'c'};
  }

  handleCupsChange(value) {
    this.setState({scale: 'c', value});
  }

  handleOuncesChange(value) {
    this.setState({scale: 'o', value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const cups = scale === 'o' ? tryConvert(value, toCups) : value;
    const ounces = scale === 'c' ? tryConvert(value, toOunces) : value;

    return (
      <div className="text-center container-fluid">
        <UnitInput
          scale="c"
          value={cups}
          onChange={this.handleCupsChange} />
        <div class="container"><h3>=</h3></div>
        <UnitInput
          scale="o"
          value={ounces}
          onChange={this.handleOuncesChange} />
      </div>
    );
  }
}

export default Calculator;
