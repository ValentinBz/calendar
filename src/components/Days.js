import React, { Component } from 'react'
import {Col} from 'reactstrap';

const days = [
    '4','9','15','19','22', '26'
  ]

export default class Days extends Component {


  render() {
    return (
        <div style={{display: 'flex', justifyContent:'space-evenly', fontSize: '0.75em'}} id={'blockk'}>
          {
            days.map((x,i) => {
              return(
                <Col key={i} style={{padding: 0}} xs='2'>{x}</Col>
              )
            })
          }
      </div>
    )
  }
}
