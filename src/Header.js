import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
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
  margin: 20px;
`

let TextInputsContainer = styled.div`
min-height: 150px;
margin: 20px 0px;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 10px;
`

let ButtonsContainer = styled.div`
margin: 50px 0px;
display: flex;
padding: 10px;
`

let Navigation = styled.header`
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
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
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        let { drugsList } = this.state

        return (
            <Context.Consumer>
                {
                    (ctx) => {
                        return (
                            <Navigation>
                                <ReactModal isOpen={ctx.state.createModalState}>
                                    <h1>
                                        New Prescription
                    </h1>
                                    <TextInputsContainer>
                                        <TextInput
                                            onChange={(event) => { this.setState({ name: event.target.value }) }}
                                            value={this.state.name}
                                            placeholder="Name"
                                            type="text" />

                                        <TextInput
                                            onChange={(event) => { this.setState({ age: event.target.value }) }}
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
                                                        placeholder="Drugs"
                                                        value={this.state.drugs}
                                                        onKeyUp={(event) => {
                                                            if (event.key == "Enter") {

                                                                let selectedDrugs = this.state.selectedDrugs
                                                                selectedDrugs.push(inputValue)
                                                                this.setState({ selectedDrugs })
                                                                props.clearSelection()
                                                            }
                                                        }}
                                                        innerRef={getRef}
                                                        {...getInputProps()}
                                                    />
                                                )
                                            }}
                                        </Autocomplete>
                                    </TextInputsContainer>
                                    <div>
                                        Drugs List:
                                        {
                                            this.state.selectedDrugs.map((item, i) => {
                                                return <span key={i}> {item}, </span>
                                            })
                                        }
                                    </div>

                                    <ButtonsContainer>
                                        <Button onClick={() => {
                                            ctx.actions.addPrescription(this.state.name, this.state.age, this.state.selectedDrugs, new Date())
                                            ctx.actions.CreateToggle()
                                        }}>Save</Button>

                                        <Button onClick={() => {
                                            ctx.actions.CreateToggle()
                                        }}>Cancel</Button>
                                    </ButtonsContainer>

                                </ReactModal>
                                <Button onClick={() => {
                                    ctx.actions.CreateToggle()
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