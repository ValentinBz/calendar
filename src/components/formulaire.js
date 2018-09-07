import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getDate } from '../actions';

class Formulaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: null,
      dateStop: null,
      flash: '',
      types: '',
      count: 0,
    };
  };

  handleChangeStart = (event) => {
    if(event.target.value) {
      const format = new Date(event.target.value);
      this.setState({dateStart: format})
    } else {
      this.setState({dateStart: null})
    }
  }

  handleChangeStop = (event) => {
    if(event.target.value) {
      const format = new Date(event.target.value);
      this.setState({dateStop: format})
    } else {
      console.log('event null ', event.target.value);
      this.setState({dateStop: null})
    }
  };

  handleClick = (e) => {
    e.preventDefault();
      let goodDate = this.state.dateStop - this.state.dateStart
      if(goodDate < 1) {
        this.setState({flash: 'error date : stop can be earlier than start'},
        () => setTimeout(() => this.setState({
          flash: ''
        }), 3000))
      } else if (this.state.types === "") {
        this.setState({flash: 'error types : no type has been chosen'},
        () => setTimeout(() => this.setState({
          flash: ''
        }), 3000))
      } else {
        if(this.state.dateStart !== null && this.state.dateStop !== null) {
          let count = this.state.count
          count += 1;
          this.setState({count:count}, () => {
            this.props.getDate(this.state);
            // this.setState({
            //   count: 0,
            // })
          })
        }
      }
  };

  handleClickRadio = (type) => {
    this.setState({types: type})
  }

  render() {
    // console.log('state : ', this.state);
    return (
      <div>
        <p>{this.state.flash}</p>
        <Form style={{display: 'flex', justifyContent: 'center'}} onSubmit={this.handleClick}>
          <div style={{display: 'flex', flexDirection:'column', width:'550px'}}>
            <p>START</p>
            <FormGroup>
              <Label>Date Start</Label>
              <Input type='date' onChange={this.handleChangeStart}/>
            </FormGroup>
            <FormGroup>
              <Label>Date Stop</Label>
              <Input type='date' onChange={this.handleChangeStop}/>
            </FormGroup>
            <FormGroup check>
           <Label check>
             <Input type="radio" name="radio1"  onClick={() => this.handleClickRadio('projets')}/>
             Projets
           </Label>
         </FormGroup>
         <FormGroup check>
           <Label check>
             <Input type="radio" name="radio1" onClick={() => this.handleClickRadio('missions')}/>
             Missions
           </Label>
         </FormGroup>
          </div>
          <Button style={{height:'50px'}} color='primary' type='submit'>SUBMIT</Button>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getDate },dispatch)
}

export default connect(null, mapDispatchToProps)(Formulaire)
