import React from 'react';
import './App.css';

const scales = ['Cups','Gallons','Quarts','Pints','Ounces','Tablespoons','Teaspoons'];

function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.changeBaseUnit = this.changeBaseUnit.bind(this);
    this.changeConvertToUnit = this.changeConvertToUnit.bind(this);
  //  this.handleCupsChange = this.handleCupsChange.bind(this);
 //   this.handleOuncesChange = this.handleOuncesChange.bind(this);
  //  this.handleQuartsChange = this.handleQuartsChange.bind(this);
    this.state = {value: '', baseUnit: 'Cups', convertToUnit: 'Ounces'};
  }

  changeBaseUnit(e) {
    this.setState({ baseUnit: e.target.value});
  }

  changeConvertToUnit(e) {
    this.setState({
      convertToUnit: e.target.value
    });
  }

  changeValue(e) {
    this.setState({
      value: e.target.value
    });
  }


  toCups = (value) => {
    if (this.state.baseUnit === 'Ounces') {
      return value / 8;
    } else {
      return value;
    }
  }

  toOunces = (value) => {
    if (this.state.baseUnit === 'Cups') {
      return value * 8;
    } else {
      return value;
    }
  }

  toQuarts = (value) => {
    if (this.state.baseUnit === 'Cups') {
      return value / 4;
    }
  }

  cups() {
    if (this.state.baseUnit === 'Ounces') {
      return tryConvert(this.state.value, this.toCups);
    } else {
      return this.state.value
    }
  }

  quarts() {
    if (this.state.baseUnit === 'Cups') {
      return tryConvert(this.state.value, this.toQuarts);
    } else {
      return this.state.value
    }
  }

  ounces() {
    if (this.state.baseUnit === 'Cups') {
      return tryConvert(this.state.value, this.toOunces);
    } else {
      return this.state.value
    }
  }

  render() {
    const {value,baseUnit,convertToUnit} = this.state;
    const scaleChoice = scales.map(scale =>
      <option key={scale} value={scale}> {scale} </option>      
    );

    return (
      <div className="container">
        <form id="units-conversion">
          <div className= "form-group">
            <label><h3>Unit in {baseUnit}</h3></label>
            <div className="input-select">
              <input className="form-control text-center" id="focusedInputed" type="text" value={value}
                onChange={this.handleChange} />
              <div className="select">
                <select  value={baseUnit} onChange={this.changeBaseUnit}>
                  {scaleChoice}
                  <option>{baseUnit}</option>
                </select>
              </div>
            </div>
          </div>
          <div className= "form-group">
            <label><h3>Unit in {convertToUnit}</h3></label>
            <div className="input-select">
              <input className="form-control text-center" id="focusedInputed" type="text" value={value}
                onChange={this.handleChange} />
              <div className="select">
                <select  value={convertToUnit} onChange={this.changeConvertToUnit}>
                  {scaleChoice}
                  <option>{convertToUnit}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Calculator;
