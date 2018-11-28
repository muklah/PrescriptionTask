import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'

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

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        modalState: false,
    }
  }

  onChangeName(event){
    this.setState({
        name: event.target.value
      })
  }

  onChangeAge(event){
    this.setState({
        age: event.target.value
      })
  }

  onChangeDrugs(event){
    this.setState({
        drugs: event.target.value
      })
  }

  onClickCreate = () => {
        this.setState({
          modalState: !this.state.modalState
        })
  }

  onClickSave = () => {
    firebase.firestore().collection('prescriptions').add({
        age: this.state.age,
        name: this.state.name,
        drugs: this.state.drugs
      })
      this.onClickCreate(this.state.modalState)
  }

  render() {
    return (
      <React.Fragment>
        {
              <Navigation>
                <ReactModal isOpen={this.state.modalState}>
                  <h1>
                    FikraCamps
                  </h1>
                  <TextInput 
                  onChange={this.onChangeName.bind(this)}
                  value={this.props.name}
                  placeholder="Name"
                  type="text"/>

                  <TextInput 
                  onChange={this.onChangeAge.bind(this)}
                  value={this.props.age}
                  placeholder="Age"
                  type="text"/>

                  <TextInput 
                  onChange={this.onChangeDrugs.bind(this)}
                  value={this.props.drugs}
                  placeholder="Drugs"
                  type="text"/>
                 
                  <Button onClick={this.onClickSave}>
                  Save
                  </Button>
                </ReactModal>

                <Button onClick={this.onClickCreate}>
                Create New Prescription
                </Button>

              </Navigation>
        }
      </React.Fragment>
    )
  }
}

export default Header;