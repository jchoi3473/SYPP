import React, {useState} from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr';
import {setConnection} from '../redux/connection-reducer/connectionAction'

const mapStatetoProps = state => {
    return{
        connection: state.connection.connection,
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        setConnection: (connection) => dispatch(setConnection(connection)),
    }
}

export const createConnection = (props) => {
    const newConnection = new HubConnectionBuilder()
        .withUrl('https://saveyourappdevelopment.azurewebsites.net/chathub/')
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
}
export const socketOnConnected = () => {
    if (connection) {
        connection.start()
            .then(result => {
                // setSocketConnected(true)
                const connectionType = connection.on('OnConnected', {
                    uID : JSON.parse(localStorage.getItem('user')).uID,
                    connectionID: connection.connection.connectionId
                    })
            })
            .catch(e => console.log('Connection failed: ', e));
    }
}

