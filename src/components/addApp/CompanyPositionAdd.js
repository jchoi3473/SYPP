import React, {Component} from 'react';
import { setCompanyName, setPositionName } from '../../redux/addApp-reducer/addAppAction';
import {connect} from 'react-redux'
import './Modalbox.css';


export class CompanyPositionAdd extends Component{

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render(){
        return(
            <div>
                    <div className="sypp-modal-text">What company are you applying for?</div>
                    <input
                        className ="sypp-modal-input company"
                        placeholder="Company Name"
                        onChange={this.props.onCompanyChange}
                        value={this.props.companyName}
                    />

                    <br/>
                    <div className="sypp-modal-text">What position are you applying for?</div>
                    <input
                        className ="sypp-modal-input sypp-position"
                        placeholder="Position Name"
                        onChange={this.props.onPositionChange}
                        value={this.props.positionName}
                    />
                    <br/>

                    <div className="sypp-next-button-container">
                     <button className ="button-next" onClick = {this.continue} disabled ={this.props.positionName === "" && this.props.companyName === ""?true:false}>
                         Next
                    </button>
                    </div>
            </div>
           
        );
    }
}

const mapStatetoProps = state => {
    return{
        companyName: state.addApp.applicationDetail.companyName,
        positionName: state.addApp.applicationDetail.positionName,
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        onCompanyChange: (event) => dispatch(setCompanyName(event.target.value)),   
        onPositionChange: (event) => dispatch(setPositionName(event.target.value)),    
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CompanyPositionAdd)
