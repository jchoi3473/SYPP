import React, {useState, useEffect, useRef} from 'react';
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
import {getApplication, getCompany, getEvent, getNote, getContent} from './../lib/api'
import createConnection from './../lib/WebSocket'
import {socketOnConnected} from './../lib/WebSocket'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { io } from 'socket.io-client';

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
    const latestApp = useRef(null);
    const lastesCompany = useRef(null);
    latestApp.current = props.apps;
    lastesCompany.current= props.companies;

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
        //List of Socket Listeners
        connection.on('Application_Add_Update_Received', applicationID => {
          setAppLoaded(false)
          getApplication(applicationID).then(applications => {
            props.setApps(applications)
            setAppLoaded(true)})
        })
        connection.on('Company_Add_Update_Received', companyID => {
          setCompanyLoaded(false)
          getCompany(JSON.parse(localStorage.getItem('user')).uID).then(companies => 
            {props.setCompany(companies)
            setCompanyLoaded(true)
          })
        })
        connection.on("Application_IsFavorite_Update_Received", (applicationID, isFavorite) => {
          const apps = [...latestApp.current];
          for(var i=0; i<apps.length;i++){
            if(apps[i].applicationID === applicationID){
              apps[i].detail.isFavorite = isFavorite
              props.setApps(apps)
              break;
            }
          }
        })
        connection.on("Company_IsFavorite_Update_Received", (companyID, isFavorite) => {
          const companies = [...lastesCompany.current];
          for(var i=0; i<companies.length;i++){
            if(companies[i].companyID === companyID){
              companies[i].detail.isFavorite = isFavorite
              props.setCompany(companies)
              break;
            }
          }
        })
        connection.on('Application_Events_Update_Received', (applicationID, eventID) => {
          const apps = [...latestApp.current];
          getEvent("application", applicationID, eventID).then(event => {
            for(var i=0; i<apps.length;i++){
              if(apps[i].applicationID === applicationID){
                for(var j=0; j<apps[i].events.length;j++){
                  console.log(apps[i].events)
                  if(apps[i].events[j].eventID === eventID){
                    console.log("event update")
                    apps[i].events[j] = event
                    props.setApps(apps)
                    break;
                  }else{
                    console.log("event created")
                    apps[i].events.push(event)
                    props.setApps(apps)
                    break;
                  }
                }
              }
            }
          })
        })
        connection.on('Company_Events_Update_Received', (companyID, eventID) => {
          const companies = [...lastesCompany.current];
          getEvent("company", companyID, eventID).then(event => {
            for(var i=0; i<companies.length;i++){
              if(companies[i].companyID === companyID){
                for(var j=0; j<companies[i].events.length;j++){
                  if(companies[i].events[j].eventID === eventID){
                    console.log("event update")
                    companies[i].events[j] = event
                    props.setCompany(companies)
                    break;
                  }else{
                    console.log("event created")
                    companies[i].events.push(event)
                    props.setCompany(companies)
                    break;
                  }
                }
              }
            }
          })
        })
        connection.on('Application_Events_Delete_Received', (applicationID, eventID) => {
          const apps = [...latestApp.current];
          for(var i=0; i<apps.length;i++){
            if(apps[i].applicationID === applicationID){
              for(var j=0; j<apps[i].events.length;j++){
                console.log(apps[i].events)
                if(apps[i].events[j].eventID === eventID){
                  apps[i].events.splice(j, 1);
                  console.log("event update")
                  props.setApps(apps)
                  break;
                }
              }
            }
          }  
        })
        connection.on('Company_Events_Delete_Received', (companyID, eventID) => {
          const companies = [...latestApp.current];
          for(var i=0; i<companies.length;i++){
            if(companies[i].companyID === companyID){
              for(var j=0; j<companies[i].events.length;j++){
                console.log(companies[i].events)
                if(companies[i].events[j].eventID === eventID){
                  companies[i].events.splice(j, 1);
                  console.log("event update")
                  props.setApps(companies)
                  break;
                }
              }
            }
          }
        })
        connection.on('Application_Notes_Update_Received', (applicationID, noteID) => {
          const apps = [...latestApp.current];
          getNote("application", applicationID, noteID).then(note => {
            for(var i=0; i<apps.length;i++){
              if(apps[i].applicationID === applicationID){
                for(var j=0; j<apps[i].notes.length;j++){
                  console.log(apps[i].notes)
                  if(apps[i].notes[j].noteID === noteID){
                    console.log("note update")
                    apps[i].notes[j] = note
                    props.setApps(apps)
                    break;
                  }else{
                    console.log("note created")
                    apps[i].notes.push(note)
                    props.setApps(apps)
                    break;
                  }
                }
              }
            }
          })
        })
        connection.on('Company_Notes_Update_Received', (companyID, noteID) => {
          const companies = [...lastesCompany.current];
          getNote("company", companyID, noteID).then(note => {
            for(var i=0; i<companies.length;i++){
              if(companies[i].companyID === companyID){
                for(var j=0; j<companies[i].notes.length;j++){
                  if(companies[i].notes[j].noteID === noteID){
                    console.log("note update")
                    companies[i].notes[j] = note
                    props.setCompany(companies)
                    break;
                  }else{
                    console.log("note created")
                    companies[i].notes.push(note)
                    props.setCompany(companies)
                    break;
                  }
                }
              }
            }
          })
        })
        connection.on('Application_Notes_Delete_Received', (applicationID, noteID) => {
          const apps = [...latestApp.current];
          for(var i=0; i<apps.length;i++){
            if(apps[i].applicationID === applicationID){
              for(var j=0; j<apps[i].notes.length;j++){
                console.log(apps[i].notes)
                if(apps[i].notes[j].noteID === noteID){
                  apps[i].notes.splice(j, 1);
                  console.log("note update")
                  props.setApps(apps)
                  break;
                }
              }
            }
          }  
        })
        connection.on('Company_Notes_Delete_Received', (companyID, noteID) => {
          const companies = [...latestApp.current];
          for(var i=0; i<companies.length;i++){
            if(companies[i].companyID === companyID){
              for(var j=0; j<companies[i].notes.length;j++){
                console.log(companies[i].notes)
                if(companies[i].notes[j].noteID === noteID){
                  companies[i].notes.splice(j, 1);
                  console.log("note update")
                  props.setApps(companies)
                  break;
                }
              }
            }
          }
        })
        connection.on('Application_Contacts_Update_Received', (applicationID, contactID) => {
          const apps = [...latestApp.current];
          console.log("socket created")
          getContent("applications", applicationID,'Contact',contactID).then(contact => {
            for(var i=0; i<apps.length;i++){
              if(apps[i].applicationID === applicationID){
                for(var j=0; j<apps[i].contacts.length;j++){
                  console.log(apps[i].contacts)
                  if(apps[i].contacts[j].contactID === contactID){
                    console.log("contact update")
                    apps[i].contacts[j] = contact
                    props.setApps(apps)
                    break;
                  }else{
                    console.log("contact created")
                    apps[i].contacts.push(contact)
                    props.setApps(apps)
                    break;
                  }
                }
              }
            }
          })
        })
        connection.on('Company_Contacts_Update_Received', (companyID, contactID) => {
          const companies = [...lastesCompany.current];
          getNote("company", companyID, 'Contact',contactID).then(contact => {
            for(var i=0; i<companies.length;i++){
              if(companies[i].companyID === companyID){
                for(var j=0; j<companies[i].contacts.length;j++){
                  if(companies[i].contacts[j].contactID === contactID){
                    console.log("contact update")
                    companies[i].contacts[j] = contact
                    props.setCompany(companies)
                    break;
                  }else{
                    console.log("contact created")
                    companies[i].contacts.push(contact)
                    props.setCompany(companies)
                    break;
                  }
                }
              }
            }
          })
        })
        connection.on('Application_Contacts_Delete_Received', (applicationID, contactID) => {
          const apps = [...latestApp.current];
          for(var i=0; i<apps.length;i++){
            if(apps[i].applicationID === applicationID){
              for(var j=0; j<apps[i].contacts.length;j++){
                console.log(apps[i].contacts)
                if(apps[i].contacts[j].contactID === contactID){
                  apps[i].contacts.splice(j, 1);
                  console.log("contact update")
                  props.setApps(apps)
                  break;
                }
              }
            }
          }  
        })
        connection.on('Company_Contacts_Delete_Received', (companyID, contactID) => {
          const companies = [...latestApp.current];
          for(var i=0; i<companies.length;i++){
            if(companies[i].companyID === companyID){
              for(var j=0; j<companies[i].contacts.length;j++){
                console.log(companies[i].contacts)
                if(companies[i].contacts[j].contactID === contactID){
                  companies[i].contacts.splice(j, 1);
                  console.log("contact update")
                  props.setApps(companies)
                  break;
                }
              }
            }
          }
        })



      }).catch(err => console.error('SignalR Connection Error: ', err));
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
  // useEffect(() => {
  //   if(connection){
  //     connection.on("Application_IsFavorite_Update_Received", (data) => {
  //       console.log("application update recieved")
  //     }
  //     // getApplication(applicationID).then(applications => props.setApps(applications))
  //     )
  //   }
  // })

  const radioChange = (e) => {
  setRadioValue(e.target.value)
  }
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
