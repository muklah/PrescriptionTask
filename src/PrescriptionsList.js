import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'

import Context from './Context';

let Container = styled.main`
  background-color: red;
  min-height: 500px;
  padding: 10px 10%;
  
`
let Prescription = styled.div`
  height: 80px;
  border: 1px solid;
  background: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: 2rem;
  margin-top: 20px;
`

class PrescriptionsList extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Context.Consumer>
        {(ctx) => {
          return <Container>
            {
              ctx.state.prescriptions.map((item, i) => {
                return <Prescription key={i}>{item.name} {item.age}</Prescription>
              })
            }
          </Container>
        }}
      </Context.Consumer>
    )
  }
}

export default PrescriptionsList