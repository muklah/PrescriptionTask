import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import print from 'print-js'

import firebase from 'firebase';
import ReactModal from 'react-modal'

import Context from './Context';
import { Button, Icon, Dialog, Pane } from 'evergreen-ui'

let Container = styled.main`
  background-color: white;
  min-height: 500px;
  padding: 10px 10%;
`

// let Button = styled.button`
//   background-color: #466AB3;
//   padding: 10px;
//   border-radius: 8px;
//   border: none;
//   color: white;
//   font-weight: bold;
//   min-width: 100px;
// `

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
    this.state = {
      prescription: ''
    }
  }

  render() {
    return (
      <Context.Consumer>
        {(ctx) => {

          return (
            <main className="container">
              <ReactModal isOpen={ctx.state.printModalState}>
                <div>
                  {
                    this.state.prescription != '' ?
                      <div>
                        <p>{this.state.prescription.name} </p>
                        <p>{this.state.prescription.age} </p>
                        <ul>{this.state.prescription.drugs.map((item,i)=>{
                              return <li key={i}>{item}</li>
                        })} </ul>
                      </div>
                      : ''                   
                  }
                </div>

                <Button onClick={() => {
                  ctx.actions.printToggle()
                }}>Print</Button>
              </ReactModal>

              <p>Prescriptions List</p>

              {
                ctx.state.prescriptions.map((item, i) => {
                  return (
                    <div key={i} >
                      <p># {item.name}</p>
                      <div>
                        <Button onClick={() => {

                          this.setState({ prescription: item })
                          ctx.actions.printToggle()
                        }}>View</Button>
                      </div>
                    </div>
                  )
                })
              }

            </main>
          )

        }}
        {/* {(ctx) => {
          return <Container>
            {
              ctx.state.prescriptions.map((item, i) => {
                return <Prescription key={i}>{item.name} {item.age}</Prescription>
              })
              
            }
            <Button >Remove</Button>
          </Container>
        }} */}
      </Context.Consumer>
    )
  }
}

export default PrescriptionsList