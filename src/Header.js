import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'
import Context from './Context';
import { Autocomplete } from "evergreen-ui";

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
                                        onChange={(event) => { ctx.actions.onChangeName(event.target.value) }}
                                        value={ctx.state.name}
                                        placeholder="Name"
                                        type="text" />

                                    <TextInput
                                        onChange={(event) => { ctx.actions.onChangeAge(event.target.value) }}
                                        value={ctx.state.age}
                                        placeholder="Age"
                                        type="text" />

                                    <TextInput
                                        onChange={(event) => { ctx.actions.onChangeDrugs(event.target.value) }}
                                        value={ctx.state.drugs}
                                        placeholder="Drugs"
                                        type="text" />

                                    {/* <Autocomplete
                                        title="Fruits"
                                        onChange={(changedItem) => console.log(changedItem)}
                                        items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
                                    >
                                        {(props) => {
                                            const { getInputProps, getRef, inputValue } = props
                                            return (
                                                <TextInput
                                                    placeholder="Fruits"
                                                    value={inputValue}
                                                    innerRef={getRef}
                                                    {...getInputProps()}
                                                />
                                            )
                                        }}
                                    </Autocomplete> */}

                                    <Button onClick={() => {

                                        firebase.firestore().collection('prescriptions').add({
                                            age: ctx.state.age,
                                            name: ctx.state.name,
                                            drugs: ctx.state.drugs,
                                            date: Date.now()
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

export default Header