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
    this.state = { unit: this.props.unit };
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  handleUnitChange(e) {
    this.setState({ unit: e.target.value })
  }
  
  render() {
    const value = this.props.value;
    const unit = this.state.unit;
    const selected = this.props.unit;

    return (
      <div className="container">
        <form id="units-conversion">
          <div className= "form-group">
            <label><h3>Unit in {unit}</h3></label>
            <div className="input-select">
              <input className="form-control text-center" id="focusedInputed" type="text" value={value}
                onChange={this.handleChange} />
              <div className="select">
                <select name="values" id="measurements" onChange={this.handleUnitChange} form="units-conversion">
                  <option value={scales[1]}>{scales[1]}</option>
                  <option value={scales[2]}>{scales[2]}</option>
                  <option value={scales[3]}>{scales[3]}</option>
                  <option value={scales[4]}>{scales[4]}</option>
                  <option value={scales[5]}>{scales[5]}</option>
                  <option value={scales[6]}>{scales[6]}</option>
                  <option value={scales[7]}>{scales[7]}</option>
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
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: '', scale: 'cups'};
  }

  handleChange(value) {
   this.setState({value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const cups = scale === 'ounces' ? tryConvert(value, toCups) : value;
    const ounces = scale === 'cups' ? tryConvert(value, toOunces) : value;

    return (
      <div className="text-center container-fluid">
        <UnitInput
          value={cups}
          unit={scales[1]}
          onChange={this.handleChange} />
        <div className="container"><h3>=</h3></div>
        <UnitInput
          selected='selected'
          unit={scales[2]}
          value={ounces}
          onChange={this.handleChange} />
      </div>
    );
  }
}

export default Calculator;
