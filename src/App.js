import React from 'react';
import './App.css';

const scaleNames = {
  c: 'Cups',
  f: 'Ounces'
};

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
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    const scale = this.props.scale;
    return (
      <div className="container">
        <form>
          <div className= "form-group">
            <lable><h3>Enter measurement in {scaleNames[scale]} </h3></lable>
            <input className="form-control text-center" id="focusedInputed" type="text" value={value}
              onChange={this.handleChange} />
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
    this.setState({scale: 'f', value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const Cups = scale === 'f' ? tryConvert(value, toCups) : value;
    const Ounces = scale === 'c' ? tryConvert(value, toOunces) : value;

    return (
      <div className="text-center container-fluid">
        <UnitInput
          scale="c"
          value={Cups}
          onChange={this.handleCupsChange} />
        <UnitInput
          scale="f"
          value={Ounces}
          onChange={this.handleOuncesChange} />
      </div>
    );
  }
}

export default Calculator;
