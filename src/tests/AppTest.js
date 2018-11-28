import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'

// import Header from './Header.js';

// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyC4X6dHh0oI2eR-2Q_XrpNPrdGn83A8M_g",
//   authDomain: "fikracamps-d4b4d.firebaseapp.com",
//   databaseURL: "https://fikracamps-d4b4d.firebaseio.com",
//   projectId: "fikracamps-d4b4d",
//   storageBucket: "fikracamps-d4b4d.appspot.com",
//   messagingSenderId: "832956564243"
// };
// firebase.initializeApp(config);

let Button = styled.button`
  background-color: #466AB3;
  padding: 10px;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: bold;
  min-width: 100px;
`

let TextInput = styled.input`
  display: block;
  border: 2px solid #000;
  width: 100%;
  margin: 10px 0px;
  height: 40px;
  font-size: 1.4rem;
`
let Navigation = styled.header`
  background-color: #fff;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10%;
`

let Context = React.createContext()

class Header extends React.Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <Context.Consumer>
        {
          (ctx) => {
            return (
              <Navigation>
                <ReactModal isOpen={ctx.state.modalState}>
                  <h1>
                    FikraCamps
                  </h1>
                  <TextInput 
                  onChange={(event)=>{ctx.actions.onChangeName(event.target.value)}}
                  value={ctx.state.name}
                  placeholder="Name"
                  type="text"/>

                  <TextInput 
                  onChange={(event)=>{ctx.actions.onChangeAge(event.target.value)}} 
                  value={ctx.state.age}
                  placeholder="Age"  
                  type="text"/>

                  <TextInput 
                  onChange={(event)=>{ctx.actions.onChangeDrugs(event.target.value)}} 
                  value={ctx.state.drugs}
                  placeholder="Drugs"  
                  type="text"/>
                 
                  <Button onClick={()=>{

                    firebase.firestore().collection('prescriptions').add({
                      age: ctx.state.age,
                      name: ctx.state.name,
                      drugs: ctx.state.drugs
                    })

                    ctx.actions.toggle()
                  }}>Save</Button>
                  
                </ReactModal>
                {/* <img width="120px;" src={require('./assets/logo.png')} /> */}
                <Button onClick={() => {
                  ctx.actions.toggle()
                }}>Create New Prescription</Button>
              </Navigation>
            )
          }
        }
      </Context.Consumer>
    )
  }
}


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
                return <Prescription key={i}>{item.name}</Prescription>
              })
            }
          </Container>
        }}
      </Context.Consumer>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      prescriptions: [{}],
      age: '',
      name: '',
      modalState: false,
    }

    firebase.firestore().collection('prescriptions').onSnapshot((snapshot)=>{
      let prescriptions = []

      snapshot.forEach((doc)=>{
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
          addPrescription: () => {

            firebase.firestore().collection('prescriptions').add({
              name: 'Muklah',
              age: '26',
              drugs: 'Drugs'
            })
         
          },
          toggle: ()=>{
            this.setState({
              modalState: !this.state.modalState
            })
          },
          onChangeName: (value) =>{
            this.setState({
              name: value
            })
          },
          onChangeAge: (value) =>{
            this.setState({
              age: value
            })
          },
          onChangeDrugs: (value) =>{
            this.setState({
              drugs: value
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
