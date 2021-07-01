import React, {useState} from 'react'
import {connect} from 'react-redux'
import { HubConnectionBuilder } from '@microsoft/signalr';
import {setConnection} from '../redux/connection-reducer/connectionAction'

const mapStatetoProps = state => {
    return{
        connection: state.connection.connection,
    }
}


export const socketOnConnected = (connection) => {
    if (connection) {
        console.log(connection)
        connection.start()
            .then(result => {
                // setSocketConnected(true)
                connection.on('OnConnected', {
                    uID : JSON.parse(localStorage.getItem('user')).uID,
                    connectionID: connection.connection.connectionId
                })
                connection.on('Application_Add_Update_Received', applicationID => {
                    
                    setChat(updatedChat);
                })
            })
            .catch(e => console.log('Connection failed: ', e));
        return true
    }
}
