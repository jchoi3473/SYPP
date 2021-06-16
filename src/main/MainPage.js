import React, {useState, useEffect} from 'react';
import Applications from './../main_applications/Applications'
import Companies from './../main_companies/Companies'
import {connect} from 'react-redux'
import {setApps} from './../redux/progress-reducer/progressAction'
import {setCompany} from './../redux/company-reducer/companyAction'
import {setSelectedCategories} from './../redux/addApp-reducer/addAppAction'
import {updateFilteredProgress} from './../redux/filteredProgress-reducer/filteredProgressAction'
import { HubConnectionBuilder } from '@microsoft/signalr';
import './MainPage.scss';
import './../components/radio/RadioButtons.css'
import {getApplication, getCompany} from './../lib/api'

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
      setCompany: (companies) => dispatch(setCompany(companies)),
      setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories)),
      updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
  }
}


function MainPage(props){
    const [radioValue, setRadioValue] = useState('0');
    const radios =  
    [ 
    { name: 'Applications', value: '0' },
    { name: 'Companies', value: '1' },
    { name: 'Templates', value: '2' },
    ]
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
      if(localStorage.getItem('jwt-token')){
        getApplication(JSON.parse(localStorage.getItem('user')).uID).then(applications => props.setApps(applications))
        getCompany(JSON.parse(localStorage.getItem('user')).uID).then(companies => props.setCompany(companies))
      }else{
        props.history.push('/');
      }
    },[])

    useEffect(() => {
      const connection = new HubConnectionBuilder()
          .withUrl('https://saveyourappdevelopment.azurewebsites.net/chathub/')
          .withAutomaticReconnect()
          .build();

      connection.start()
          .then(result => {
              console.log('Connected!');
              setSocketConnected(true)
              console.log("loaded?")
              console.log(connection.connection.connectionId);
              console.log(JSON.parse(localStorage.getItem('user')).uID)
              const connectionType = connection.on('OnConnected', {
                uID : JSON.parse(localStorage.getItem('user')).uID,
                connectionID: connection.connection.connectionId
              })
              console.log(connectionType)
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
        {
          //Import Loading Screen in the beginning
          !socketConnected? <div>Loading Screen</div>:
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
        }
      </div>
    );  
}

export default connect(mapStatetoProps,mapDispatchToProps)(MainPage);
