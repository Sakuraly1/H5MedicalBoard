import React from 'react';
import './DepDetailView.css'
import { get} from '../utils.js'
import  Title  from '../../component/Title/Title'


const Native = window.Native;
export default class DepDetailView extends React.Component{
    constructor(props){
        super(props);
        this.state ={
           depDetail:{},
           depData:null
        }
    }

    componentWillMount(){
        let id = 114;
        if( this.props.location.id ){
            id = this.props.location.id;
        }
        if( this.props.location.departData ){
            this.setState({
                depData: this.props.location.departData
            })
        }
        get("guide/message","id="+id+"&type=sp")
        .then( data =>{
            this.setState({
                depDetail: data
            })
        })
    }

    _handleRoute(){
        let path= {
            pathname:'./app',
        }
        this.props.history.push(path)
    }


    _goToDepartment(){
        let path= {
            pathname:'./department',
            buildData: this.props.location.buildData
        }
        this.props.history.push(path)
    }

    _getDepDetail(){
        if( JSON.stringify( this.state.depDetail ) === "{}") return;
        let content = [];
        let list = this.state.depDetail.message.split("\n");
        list.forEach( (value, key) =>{
            content.push(
                <span key={ key }>{value}</span>
            )
        });
        return content;
    }
    
    _goHere(){
        if(this.state.depData){
            const datax = this.state.depData;
            // console.log(datax);
            Native.intentToMapWithEnd(datax.floorId, datax.content,
                datax.longitude, datax.latitude)
        }else{
            console.log('dep数据为空')
        }
    }
   
    render(){
        let content = this._getDepDetail();
        return(
            <div className= 'body'>
            <div className="container">
                 <Title titleName="科室介绍" 
                    nameen={ (this.props.location.buildData)? this.props.location.buildData.nameen: ""}
                    _handleRoute = { () =>this._handleRoute()} 
                />
                <div className="depDetail-title">
                    <img style={{ width:"2rem", height:"2rem",marginLeft:"0.5rem"}}  alt=""
                        src={ require("../../image/ic_back.png")} 
                        onClick= { ()=>this._goToDepartment() }
                    />
                    <span style={{marginLeft: '4rem'}}>{ this.state.depDetail.name || ""}</span>
                    <img src={require('../../image/ic_here.png')} style={{ width:"4.8rem", height:"2rem", marginRight:'0.5rem'}} 
                        onClick= {() => this._goHere()}
                        alt=''/>
                </div>
               <div className="depDetail-content1">
                    <div className="deDetail-content1-body">
                        <div className="deDetail-content1-body-left">
                            { content }
                        </div>
                        <img src={ this.state.depDetail.image || ""}   alt="" style={{width:"12.25rem", height:"7.05rem"}}/>
                    </div>
               </div>
            </div>
            </div>
        )
    }
}