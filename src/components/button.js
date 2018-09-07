import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { getSelectedMonth } from '../actions/index';
import { bindActionCreators } from 'redux';

class ButtonsPN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      buttonArray: []
    }
  }

  componentDidMount() {
    const date = new Date().getMonth();
    this.setState({count: date});
  }

  handleClick = (str: string) => {
    if(str === '-') {
      let moins = this.state.count;
      moins--;
      if(this.state.count === 0) {
        this.setState({count: 11}, () => this.props.getSelectedMonth(this.state.count))
      } else {
        this.setState({count: moins}, () => this.props.getSelectedMonth(this.state.count))
      }
    } else {
      let plus = this.state.count;
      plus++;
      if(this.state.count === 11) {
        this.setState({count: 0}, () => this.props.getSelectedMonth(this.state.count))
      } else {
        this.setState({count: plus}, () => this.props.getSelectedMonth(this.state.count))
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.monthsArray.months.length !== 0) {
      this.setState({buttonArray : nextProps.monthsArray.months})
    }
  }

  render() {
    let tab = [''];
    if(this.state.buttonArray.length !== 0) {
      tab = this.state.buttonArray;
      return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <div>
            <Button onClick={() => this.handleClick('-')}> - </Button>
            <Button onClick={() => this.handleClick('+')}> + </Button>
          </div>
          <div>
            <p>{tab[this.state.count]}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={() => this.handleClick('-')}> - </Button>
          <p></p>
          <Button onClick={() => this.handleClick('+')}> + </Button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return{
    monthsArray: state.monthsArray,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSelectedMonth },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsPN);
