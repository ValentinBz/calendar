import React, { Component } from 'react';
import Days from './Days';
import {Col} from 'reactstrap';
import { getMiddleDate } from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const months = [
	'janvier',
  'fevrier',
	'mars',
	'avril',
	'mai',
	'juin',
	'juillet',
	'aout',
	'september',
	'octobre',
	'novembre',
	'decembre'
]

class Block extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      displayMonths: []
    };
    this.block = React.createRef();
  }

  componentDidMount() {
    this.props.getOffset(this.refs.block.offsetWidth, this.refs.block.offsetHeight)
  };

  componentWillMount() {
    this.CountMonths();
  }

  componentWillReceiveProps(nextProps) {
    this.CountMonths(nextProps.selectedMonth)
  }

  CountMonths = (num) => {
    let currentMonth = new Date().getMonth();
    if(!isNaN(num)) currentMonth = num;
    this.setState({currentMonth:currentMonth}, () => {
      let start = currentMonth;
      let count = 0;
      let tab = [];

      if (start < 0) {
        start = 2 + start;
      }
      while(count<3) {
        tab.push({month: months[start], id: start})
        if(start === 11) {
          start = 0
        } else {
          start++;
        }
        count++;
      }
      this.setState({displayMonths:tab}, () => this.props.getMiddleDate(months, tab))
    })
  }

  render() {
    const length = this.state.displayMonths.length - 1;
    const currentMonth = this.state.currentMonth
    return (
      <div style={{display: 'flex', justifyContent:'space-evenly'}} ref='block'>
        {
          this.state.displayMonths.map((month,i) => {
            return (
              <Col xs={'4'} style={{padding:0, borderTop: '0.5px solid #DCDCDC', borderBottom: '0.5px solid #DCDCDC', borderRight: '0.5px solid #DCDCDC', borderRadius: ((length) === i)?'0 10px 0 0':'0'}} key={i}>
                <Col xs='12' style={{background:'rgba(155,155,155,0.10)', padding:0, borderBottom: '0.5px solid #DCDCDC'}} >
                  <div style={{fontSize: '1.2em'}} >{month.month}</div>
                </Col>
                <Col xs='12' style={{padding:0}}>
                  <Days />
                </Col>
              </Col>
            )
          })
        }
      </div>
    );

  }
}

function mapStateToProps(state) {
  return{
    selectedMonth: state.selectedMonth,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getMiddleDate},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);
