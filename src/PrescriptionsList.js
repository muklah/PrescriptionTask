import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import ReactModal from 'react-modal'
import Context from './Context';
import { Button } from "evergreen-ui";

let MainContainer = styled.main`
background-color: rgba(245, 246, 250, 0.8);
  padding: 20px 10%;
`

let PrescriptionsContainer = styled.div`
background-color: rgba(245, 246, 250, 0.8);
  padding: 20px 10%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`

let PrescriptionItem = styled.div`
  background-color: #fff;
  border: 2px solid #E5E9F2;
  min-height: 150px;
  margin: 20px 20px;
  border-radius: 4px;
  display: flex;
  min-width: 350px;
  padding: 10px;
`

let Buttons = styled.button`
background-color: #466AB3;
padding: 10px;
border-radius: 8px;
border: none;
color: white;
font-weight: bold;
min-width: 100px;
margin: 20px;
`

class PrescriptionsList extends React.Component {
  constructor() {
    super()
    this.state = {
      prescription: ''
    }
  }

  render() {
    return (
      <Context.Consumer>
        {(ctx) => {

          return (
            <MainContainer>
              <ReactModal isOpen={ctx.state.printModalState}>
                <div>
                  {
                    this.state.prescription != '' ?
                      <div>
                        <p>Name: {this.state.prescription.name} </p>
                        <p>Age: {this.state.prescription.age} </p>
                        <ul>Drugs: {this.state.prescription.drugs.map((item, i) => {
                          return <li key={i}>{item}</li>
                        })} </ul>
                        <p>Date: {this.state.prescription.date} </p>
                      </div>
                      : ''
                  }
                </div>

                <Buttons onClick={() => {
                  window.print()
                }}>Print</Buttons>

                <Buttons onClick={() => {
                  ctx.actions.printToggle()
                }}>Cancel</Buttons>

              </ReactModal>

              <h2>Prescriptions List</h2>
              <PrescriptionsContainer>
                {
                  ctx.state.prescriptions.map((item, i) => {
                    return (
                      <PrescriptionItem>
                        <div key={i} >
                          <p>Name: {item.name}</p>
                          <p>Date: {item.date}</p>
                          <div>
                            <Button onClick={() => {
                              this.setState({ prescription: item })
                              ctx.actions.printToggle()
                            }}>View</Button>
                          </div>
                        </div>
                      </PrescriptionItem>
                    )
                  })
                }
              </PrescriptionsContainer>
            </MainContainer>
          )

        }}

      </Context.Consumer>
    )
  }
}

export default PrescriptionsList