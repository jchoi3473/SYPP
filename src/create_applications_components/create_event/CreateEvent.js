import React, {Component} from 'react';
import EventDetail from './EventDetail'
import EventSelectDate from './EventSelectDate'

export class CreateEvent extends Component {
    state = {
        step: 1,
        eventName : '',
        eventLocation :'',
        eventNote : '',
        eventDate : '',
        eventTime : '',
    }

    // //Send Post request, close modal(save button)
    // onSaveButton = async() => {
    //     // this.props.postNewApp(this.props.addApp)
    //     console.log("Triggered")
    //     const app = await this.props.postNewApp(this.props.addApp)
    //     console.log("Triggered")
    //     const app2 = setTimeout(()=> this.props.onRequestProgress(), 500) 
    //     var newCategory = this.props.addApp.Categories;
    //     for (var i=0;i<this.props.addApp.Categories.length;i++){
    //     console.log(this.props.categories[i])
    //     newCategory[i].SuggestionsOrSeleceted = []
    //     }
    //     this.props.setSelectedCategories(newCategory)
    //     this.props.handleClose()
    // }

    onChangeName = (e) =>{
        this.setState({
            eventName : e.currentTarget.value
        })
        console.log(this.state.eventName)
    }
    onChangeLocation = (e) =>{
        this.setState({
            eventLocation : e.currentTarget.value
        })
    }
    onChangeDate = (date) =>{
        this.setState({
            eventDate : date
        })
        console.log(date)
    }

    nextStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step - 1
        });
    }


    
    render(){
        const{step} = this.state;
        switch(step){
            case 1:
                return(
                    <div>
                        <EventDetail 
                            nextStep = {this.nextStep}
                            eventName = {this.state.eventName}
                            onChangeName = {this.onChangeName}
                            eventLocation = {this.state.eventLocation}
                            onChangeLocation = {this.onChangeLocation}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <EventSelectDate
                        prevStep = {this.prevStep}
                        onChangeDate = {this.onChangeDate}
                        />
                    </div>
                )
        }
    }
}

export default CreateEvent