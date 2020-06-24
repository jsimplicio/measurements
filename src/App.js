import React from 'react';
import './App.css';

function toCups(Ounces) {
  return Ounces / 8;
}

function toOunces(Cups) {
  return Cups * 8;
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

    return (
      <div className="container">
        <form id="units-conversion">
          <div className= "form-group">
            <label><h3>Enter measurement in {this.state.content}</h3></label>
            <div className="input-select">
              <input className="form-control text-center" id="focusedInputed" type="text" value={value}
                onChange={this.handleChange} />
              <div className="select">
                <select name="values" id="measurements" onChange={this.handleUnitChange} form="units-conversion">
                  <option value="Cups">Cups</option>
                  <option value="Gallon">Gallon</option>
                  <option value="Quart">Quart</option>
                  <option value="Pint">Pint</option>
                  <option value="Ounce">Ounce</option>
                  <option value="Tablespoon">Tablespoon</option>
                  <option value="Teaspoon">Teaspoon</option>
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
    const Cups = scale === 'o' ? tryConvert(value, toCups) : value;
    const Ounces = scale === 'c' ? tryConvert(value, toOunces) : value;

    return (
      <div className="text-center container-fluid">
        <UnitInput
          scale="c"
          value={Cups}
          onChange={this.handleCupsChange} />
        <UnitInput
          scale="o"
          value={Ounces}
          onChange={this.handleOuncesChange} />
      </div>
    );
  }
}

export default Calculator;
