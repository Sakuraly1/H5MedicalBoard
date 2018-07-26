import React from 'react';
import './SituationView.css'


import  Title  from '../../component/Title/Title'
export default class Situation extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            buildData:{},
            time:{
                time:"",
                date:"",
                week:"", 
            },
        }
    }
  

    _handleRoute(){
        let path= {
            pathname:'./app',
        }
        this.props.history.push(path)
    }
   

    render(){
      
        return(
            <div className= 'body'>
           <div className="container">
               <Title titleName="医院概况" 
                    nameen={(this.props.location.buildData)?  this.props.location.buildData.nameen :""}
                    _handleRoute = { () =>this._handleRoute()} 
                />
               <div className="hos-title">
                   <div className="hos-title-list1"><span >{(this.props.location.buildData)? (this.props.location.buildData.namecn):""}</span></div>
                   <div className="hos-title-list2"><span className="hos-title-list2">{(this.props.location.buildData)? (this.props.location.buildData.hospitalLevel):""}</span></div>
               </div>
               <div className="hos-body">
                    <div className="hos-body-title">
                        <span style={{ fontWeight:"400"}}>|</span>
                        <span style={{ marginLeft:"0.4rem"}}>医院概况</span>
                    </div>
                    <div className="hos-body-content"><span>{(this.props.location.buildData)? (this.props.location.buildData.profile.content) :""}</span></div>
               </div>
           </div> 
           </div>
        )
    }
}
