import React, {useState, useEffect} from 'react';
import Applications from './../main_applications/Applications'
import Companies from './../main_companies/Companies'
import {connect} from 'react-redux'
import {setApps} from './../redux/progress-reducer/progressAction'
import {setSelectedCategories} from './../redux/addApp-reducer/addAppAction'
import {updateFilteredProgress} from './../redux/filteredProgress-reducer/filteredProgressAction'
import { HubConnectionBuilder } from '@microsoft/signalr';
import './MainPage.scss';
import './../components/radio/RadioButtons.css'
import {getApplication} from './../lib/api'
import { io } from "socket.io-client";

import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      pending: state.progress.isPending,
      categories: state.categories.categories
  }
}

const mapDispatchToProps= dispatch =>{
  return {
      setApps: (applications) => dispatch(setApps(applications)),
      setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories)),
      updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
  }
}

const socket = io("https://saveyourappdevelopment.azurewebsites.net", {
  transports: ["/chathub/OnConnected"]
});

function MainPage(props){
    const [radioValue, setRadioValue] = useState('0');
    const radios =  
    [ 
    { name: 'Applications', value: '0' },
    { name: 'Companies', value: '1' },
    { name: 'Templates', value: '2' },
    ]


    useEffect(() => {
      if(localStorage.getItem('jwt-token')){
        getApplication(JSON.parse(localStorage.getItem('user')).uID).then(applications => props.setApps(applications))
        // console.log(applications)
      }
      socket.on()
    },[])

    useEffect(() => {
      const connection = new HubConnectionBuilder()
          .withUrl('https://saveyourappdevelopment.azurewebsites.net/chathub/')
          .withAutomaticReconnect()
          .build();

      connection.start()
          .then(result => {
              console.log('Connected!');
              console.log(connection.connection.connectionId);
              console.log(JSON.parse(localStorage.getItem('user')).uID)
              connection.on('OnConnected', {
                uID : JSON.parse(localStorage.getItem('user')).uID,
                connectionID: connection.connection.connectionId
              }).then(res => {
                console.log(res)
              });
          })
          .catch(e => console.log('Connection failed: ', e));
  }, []);



    const radioChange = (e) => {
    setRadioValue(e.target.value)
    }

    const display = () =>{
        if(radioValue === '0'){
            return (
                <div>
                    <Applications/>
                </div>
            )
        }else if(radioValue === '1'){
          return(
              <div>
                <Companies />
              </div>
          )
        }     
        else {
            return(
                <div>more to go</div>
            )
        }
    }

    return (
      <div>
        <div className = "sypp-main-button-container">
          <ButtonGroup toggle className = {props.classContainerProps}>
          {radios.map((radio, idx) => (
            <div className="sypp-button-container">
                <ToggleButton
                className={"sypp-mainButtonGroups sypp-activeChange sypp-hoverChange sypp-text"}
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                >
                  <div className = "sypp-radio-button-container" name = {radio.name} value = {radio.value}>
                    {radio.name}
                  </div>
                </ToggleButton>
                </div>
          ))}
            </ButtonGroup>
            </div>
            {display()}

      </div>
    );  
}

export default connect(mapStatetoProps,mapDispatchToProps)(MainPage);
