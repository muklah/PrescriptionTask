import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'
import Context from './Context';
import { Autocomplete, TextInput } from "evergreen-ui";

let Button = styled.button`
  background-color: #466AB3;
  padding: 10px;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: bold;
  min-width: 100px;
`

let TextInput2 = styled.input`
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
            drugsList: [],
            selectedDrugs: [],
            name: '',
            age: '',
        }

        fetch('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=1000').then((response) => {
            return response.json()
        }).then((result) => {
            let drugs = result.results
            let drugsList = [];
            drugs.map((item, i) => {
                drugsList.push(item.term)
            })
            this.setState({ drugsList })
            // console.log(this.state.drugsList)
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        let { drugsList } = this.state
        // console.log(drugsList);
        
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
                                        onChange={(event) => { this.setState({name: event.target.value}) }}
                                        value={this.state.name}
                                        placeholder="Name"
                                        type="text" />

                                    <TextInput
                                        onChange={(event) => { this.setState({age: event.target.value}) }}
                                        value={this.state.age}
                                        placeholder="Age"
                                        type="text" />

                                    <Autocomplete
                                        title="Fruits"
                                        items={drugsList}
                                    >
                                        {(props) => {
                                            const { getInputProps, getRef, inputValue } = props
                                            return (
                                                <TextInput
                                                    placeholder="Fruits"
                                                    value={this.state.drugs}
                                                    onKeyUp={(event) => {
                                                        if (event.key == "Enter") {
                                                                  
                                                                let selectedDrugs = this.state.selectedDrugs
                                                                selectedDrugs.push(inputValue)
                                                                this.setState({selectedDrugs})
                                                            props.clearSelection()
                                                        }
                                                    }}
                                                    innerRef={getRef}
                                                    {...getInputProps()}
                                                />
                                            )
                                        }}
                                    </Autocomplete>
                                     {
                                         this.state.selectedDrugs.map((item, i) => {
                                             return <span key={i}> {item}</span>
                                         })
                                     }
                                    <Button onClick={() => {
                                        ctx.actions.addPrescription(this.state.name, this.state.age, this.state.selectedDrugs)
                                        ctx.actions.toggle()
                                    }}>Save</Button>

                                </ReactModal>
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