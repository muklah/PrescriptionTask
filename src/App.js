import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import firebase from 'firebase';
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
      createModalState: false,
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

          addPrescription: (name, age, drugs) => {
            firebase.firestore().collection('prescriptions').add({
              age: age,
              name: name,
              drugs: drugs,
              date: Date.now()
            })

          },

          CreateToggle: () => {
            this.setState({
              createModalState: !this.state.createModalState
            })
          },
          printToggle: () => {
            this.setState({
              printModalState: !this.state.printModalState
            })
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
