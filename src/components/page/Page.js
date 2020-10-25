import React, { Component } from 'react'
import './Page.css';

export class Page extends Component{


    render(){
        const pageCount = this.props.pageCount;
        return(
            <div className = "circle-container">
                {  
                    pageCount.map(i =>{
                        if(i === this.props.pageNumber){
                            return <div className="circle"/>
                        }else{
                            return <div className="other-circles"/>
                        }
                    })    
                }
            </div>
        );

    }
}
export default Page;