import React, {useState, useEffect} from 'react';
import Applications from './../main_applications/Applications'
import Companies from './../main_companies/Companies'
import {connect} from 'react-redux'
import {setApps} from './../redux/progress-reducer/progressAction'
import {setCompany} from './../redux/company-reducer/companyAction'
import {setSelectedCategories} from './../redux/addApp-reducer/addAppAction'
import {updateFilteredProgress} from './../redux/filteredProgress-reducer/filteredProgressAction'
import {setConnection} from '../redux/connection-reducer/connectionAction'
import { HubConnectionBuilder } from '@microsoft/signalr';
import './MainPage.scss';
import './../components/radio/RadioButtons.css'
import {getApplication, getCompany} from './../lib/api'
import createConnection from './../lib/WebSocket'
import {socketOnConnected} from './../lib/WebSocket'
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
      setConnection: (connection) => dispatch(setConnection(connection)),
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
    const [appLoaded, setAppLoaded] = useState(false);
    const [companyLoaded, setCompanyLoaded] = useState(false);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
      if(localStorage.getItem('jwt-token')){
        getApplication(JSON.parse(localStorage.getItem('user')).uID).then(applications => 
          {props.setApps(applications)
            setAppLoaded(true)})
        getCompany(JSON.parse(localStorage.getItem('user')).uID).then(companies => 
          {props.setCompany(companies)
          setCompanyLoaded(true)
          })
      }else{
        props.history.push('/');
      }
    },[])

    useEffect(() => {
      const connection = new HubConnectionBuilder()
        .withUrl('https://saveyourappdevelopment.azurewebsites.net/chathub/')
        .withAutomaticReconnect()
        .build();
      props.setConnection(connection);

      connection.start()
      .then(result =>{
        console.info('SignalR Connected')
        connection.on("Application_IsFavorite_Update_Received", (applicationID, isFavorite) => {
          console.log("Is Favorite Listener activated")
          console.log(applicationID)
          console.log(isFavorite)
      }) 
      } )
      .catch(err => console.error('SignalR Connection Error: ', err));
      /*
      connection.start()
      .then(result => {
          // setSocketConnected(true)
          connection.on('OnConnected', {
              uID : JSON.parse(localStorage.getItem('user')).uID,
              connectionID: connection.connection.connectionId
          })
          connection.on('Application_Add_Update_Received', applicationID => {
            console.log("application update recieved")
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_Task_Update_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_IsFavorite_Update_Received', (applicationID, IsFavorite) => {
            console.log("is favortie updated")
            
            // getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_Notes_Update_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_Contacts_Update_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_FollowUps_Update_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_Checklists_Update_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_Events_Delete_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_Notes_Delete_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_FollowUps_Delete_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })
          connection.on('Application_Checklists_Delete_Received', applicationID => {
            getApplication(applicationID).then(applications => props.setApps(applications))
          })

      })
      .catch(e => console.log('Connection failed: ', e));
      */

  },[]);
  useEffect(() => {
    if(connection){
      connection.on("Application_IsFavorite_Update_Received", (data) => {
        console.log("application update recieved")
      }
      // getApplication(applicationID).then(applications => props.setApps(applications))
      )
    }
  })

  const radioChange = (e) => {
  setRadioValue(e.target.value)
  }
    
    // const getInfo = () =>{
    //      if(localStorage.getItem('jwt-token')){
    //     getApplication(JSON.parse(localStorage.getItem('user')).uID).then(applications => props.setApps(applications))
    //     getCompany(JSON.parse(localStorage.getItem('user')).uID).then(companies => props.setCompany(companies))
    //     setSocketConnected(true)
    //   }else{
    //     props.history.push('/');
    //   }
    // }

    const display = () =>{
        if(radioValue === '0'){
          return (
            <>
            {!appLoaded? <div>Loading Screen</div>:
            <div>
                <Applications/>
            </div>
            }
            </>
          )
        }else if(radioValue === '1'){
          return(
            <>
            {!companyLoaded? <div>Loading Screen</div>:
            <div>
              <Companies/>
            </div>
            }
            </>
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
      </div>
    );  
}

export default connect(mapStatetoProps,mapDispatchToProps)(MainPage);
