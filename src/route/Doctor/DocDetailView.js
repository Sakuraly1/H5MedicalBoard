import React from 'react';
import './DocDetailView.css'
import { get } from '../utils.js'
import  Title  from '../../component/Title/Title'

export default class DocDetailView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doctorDetail:[]
        }
    }
    
    componentWillMount(){
        let id = 9;
        if( this.props.location.id ){
            id = this.props.location.id;
        }
        get("doctor/detail","id="+id)
        .then( data =>{
            this.setState({
                doctorDetail:data.message
            })
        })
    }

    _handleRoute(){
        let path= {
            pathname:'./app',
        }
        this.props.history.push(path)
    }

    _goToDoctor(){
        let path= {
            pathname:'./doctor',
            buildData: this.props.location.buildData
        }
        this.props.history.push(path)
    }
    

    render(){
        let docDetail = this.state.doctorDetail[0] || "";
        return(
            <div className="container">
                 <Title titleName="医生介绍" 
                    nameen={ (this.props.location.buildData)? this.props.location.buildData.nameen: ""}
                    _handleRoute = { () =>this._handleRoute()} 
                />
                <div className="docDetail-title">
                    <img style={{ width:"2rem", height:"2rem",marginLeft:"0.5rem"}}  alt=""
                        src={ require("../../image/ic_back.png")} 
                        onClick= { ()=>this._goToDoctor()}
                    />
                    <span>医生风采</span>
                </div>
                <div className="docDetail-content">
                    <div className="docDetail-content-title">
                        <img src={ docDetail.image || "" } style={{ width:"6rem", height:"8.4rem"}}  alt=""/>
                        <div className="docDetail-content-title-right">
                        <div>
                            <span style={{fontSize:"1.2rem",fontWeight:600}}>{ docDetail.name ||""}</span>
                        </div>
                        <div>
                            <span >{ docDetail.jobTitle || ""}</span>
                        </div>
                        <div>
                            <span style={{fontWeight:600,color:"#000"}}>科室:&nbsp;&nbsp;&nbsp;</span>
                            <span>{ docDetail.hisDepartment ||""}</span>
                        </div>
                        <div>
                            <span style={{fontWeight:600,color:"#000"}}>专业特长:</span>
                        </div>
                        <div>
                            <span>{ docDetail.professional || ""}</span>
                        </div>
                    </div>
                    </div>
                    <div className="docDetail-content-body">
                        { docDetail.content}
                    </div>
                </div>
            </div>
        )
    }
}