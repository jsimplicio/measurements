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
    this.state = { unit: this.props.unit, selected: this.props.selected };
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
    const selected = this.state.selected;

    return (
      <div className="container">
        <form id="units-conversion">
          <div className= "form-group">
            <label><h3>Unit in {unit}</h3></label>
            <div className="input-select">
              <input className="form-control text-center" id="focusedInputed" type="text" value={value}
                onChange={this.handleChange} />
              <div className="select">
                <select name="values" id="measurements" value={this.state.value} onChange={this.handleUnitChange} form="units-conversion">
                  <option value={scales[1]}>{scales[1]}</option>
                  <option value={scales[2]}>{scales[2]}</option>
                  <option value={scales[3]}>{scales[3]}</option>
                  <option value={scales[4]}>{scales[4]}</option>
                  <option selected={selected} value={scales[5]}>{scales[5]}</option>
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
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
  //  this.handleCupsChange = this.handleCupsChange.bind(this);
 //   this.handleOuncesChange = this.handleOuncesChange.bind(this);
  //  this.handleQuartsChange = this.handleQuartsChange.bind(this);
    this.state = {value: '', unit: ''};
  }


  toCups = (value) => {
    if (this.state.unit === 'ounces') {
      return value / 8;
    } else {
      return value;
    }
  }

  toOunces = (value) => {
    if (this.state.unit === 'cups') {
      return value * 8;
    } else {
      return value;
    }
  }

  toQuarts = (value) => {
    if (this.state.unit === 'cups') {
      return value / 4;
    }
  }

  cups() {
    if (this.state.unit === 'ounces') {
      return tryConvert(this.state.value, this.toCups);
    } else {
      return this.state.value
    }
  }

  quarts() {
    if (this.state.unit === 'cups') {
      return tryConvert(this.state.value, this.toQuarts);
    } else {
      return this.state.value
    }
  }

  ounces() {
    if (this.state.unit === 'cups') {
      return tryConvert(this.state.value, this.toOunces);
    } else {
      return this.state.value
    }
  }

  handleChangeOne(e) {
    this.setState({unit: 'cups', value: e});
  }

  handleChangeTwo(e) {
    this.setState({unit: 'ounces', value: e});
  }

  render() {
    const cups = this.cups();
    const ounces = this.ounces();

    return (
      <div>
        <UnitInput
          scale='cups'
          value={cups}
          unit={scales[1]}
          onChange={this.handleChangeOne} 
        />

        <UnitInput
          selected
          scale='ounces'
          value={ounces}
          unit={scales[5]}
          onChange={this.handleChangeTwo} />
      </div>
    );
  }
}

export default Calculator;
