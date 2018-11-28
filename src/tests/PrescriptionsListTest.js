import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'

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

class PrescriptionsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.getPrescriptions()

  }

  getPrescriptions() {
    firebase.firestore().collection('prescriptions').onSnapshot((snapshot) => {
      let prescriptions = []

      snapshot.forEach((doc) => {
        this.props.prescriptions.push(doc.data())
        this.setState({
          prescriptions: prescriptions
        })
      })
    })
  }

  // addPrescription(){
  //     firebase.firestore().collection('prescriptions').add({
  //         name: 'Muklah',
  //         age: '26',
  //         drugs: 'Drugs'
  //       })
  // }

  // onChangeName(value){
  //     this.setState({
  //         name: value
  //       })
  // }

  render() {
    return (
      <React.Fragment>
        {
          this.props.prescriptions.map((item, i) => {
            return <Prescription key={i}>{item.name} {item.age} {item.drugs}</Prescription>
          })
        }
      </React.Fragment>
    )
  }
}

export default PrescriptionsList;