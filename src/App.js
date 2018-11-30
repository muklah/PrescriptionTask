import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'

import Context from './Context';

import Header from './Header'
import PrescriptionsList from './PrescriptionsList'

var config = {
  apiKey: "AIzaSyC4X6dHh0oI2eR-2Q_XrpNPrdGn83A8M_g",
  authDomain: "fikracamps-d4b4d.firebaseapp.com",
  databaseURL: "https://fikracamps-d4b4d.firebaseio.com",
  projectId: "fikracamps-d4b4d",
  storageBucket: "fikracamps-d4b4d.appspot.com",
  messagingSenderId: "832956564243"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      prescriptions: [{}],
      age: '',
      name: '',
      drugs: [],
      modalState: false,
      printModalState: false,
    }

    firebase.firestore().collection('prescriptions').orderBy('date', 'asc').onSnapshot((snapshot) => {
      let prescriptions = []

      snapshot.forEach((doc) => {
        prescriptions.push(doc.data())
        this.setState({
          prescriptions: prescriptions
        })
      })
    })

  }

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        actions: {

          getPrescription: (id) => {
            var docRef = firebase.collection("prescriptions").doc(id);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },

          addPrescription: (name, age, drugs) => {
            firebase.firestore().collection('prescriptions').add({
              age: age,
              name: name,
              drugs: drugs,
              date: Date.now()
          })

          },

         


          toggle: () => {
            this.setState({
              modalState: !this.state.modalState
            })
          },
          printToggle: () => {
            this.setState({
              printModalState: !this.state.printModalState
            })
          },
          onChangeName: (value) => {
            this.setState({
              name: value
            })
          },
          onChangeAge: (value) => {
            this.setState({
              age: value
            })
          },
          onChangeDrugs: (value) => {
            let drugsList = this.state.drugs
            drugsList.push(value)
            this.setState({
              drugs: drugsList
            })
            console.log(value);
            
          }
        }
      }}>
        <Header />
        <PrescriptionsList />
      </Context.Provider>
    )
  }
}

export default App;
