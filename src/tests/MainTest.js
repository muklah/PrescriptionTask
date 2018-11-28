import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import firebase from 'firebase';
import ReactModal from 'react-modal'

import Header from './HeaderTest'
import PrescriptionsList from './PrescriptionsListTest'

// var config = {
//     apiKey: "AIzaSyC4X6dHh0oI2eR-2Q_XrpNPrdGn83A8M_g",
//     authDomain: "fikracamps-d4b4d.firebaseapp.com",
//     databaseURL: "https://fikracamps-d4b4d.firebaseio.com",
//     projectId: "fikracamps-d4b4d",
//     storageBucket: "fikracamps-d4b4d.appspot.com",
//     messagingSenderId: "832956564243"
// };
// firebase.initializeApp(config);

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prescriptions: [{}],
            name: '',
            age: '',
            drugs: '',
            modalState: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <PrescriptionsList prescriptions={this.state.prescriptions} />
            </React.Fragment>
        )
    }

}

export default Main;