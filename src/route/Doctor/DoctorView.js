import React from 'react';
import './DoctorView.css'
import { get } from '../utils.js'
import  Title  from '../../component/Title/Title'


let keyword_Top= ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
let keyword_Bottom = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
export default class DoctorView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doctorList:[],
            searchContent:""
        }
    }
    
    componentWillMount(){
        get("doctor/list","")
        .then( data =>{
            this.setState({
                doctorList:data.message
            })
        })
    }

    _handleRoute(){
        let path= {
            pathname:'./app',
        }
        this.props.history.push(path)
    }

    _goToDetail( id ){
        let path ={
            pathname:'./docDetail',
            id: id,
            buildData: this.props.location.buildData
            
        }
        this.props.history.push(path)       
    }
    
    _inputWord( value ){
        this.setState({
            searchContent: this.state.searchContent+value
        }, ()=>{
           this._search()
        })
    }

    _clear(){
        this.setState({
            searchContent: ""
        },()=>{
            this._search()
         })
    }

    _backSpace(){
        let searchContent = this.state.searchContent;
        if( searchContent === "")return;
        let length = searchContent.length;
        searchContent = searchContent.slice(0,length-1);
        this.setState({
            searchContent: searchContent
        },()=>{
            this._search()
         })
    }

    _search(){
        get("doctor/list/spell","keyword="+this.state.searchContent)
        .then( data =>{
            this.setState({
                doctorList:data.message
            })
        }) 
    }

    _getDoctorList(){
        if( this.state.doctorList.length === 0) return;
        let doctorList = [];
        this.state.doctorList.forEach( (value, key) =>{
            doctorList.push(
                <div className="doc-content-list" key = { key }  onClick={ ()=> this._goToDetail( value.id )}>
                <img src={ value.image } alt=""/>
                <div className="doc-content-list-detail">
                    <div>
                        <span style={{fontSize:"0.6rem",fontWeight:400,color:"#000"}}>{ value.name }&nbsp;</span>
                        <span>{ value.jobTitle}</span>
                    </div>
                    <div>
                        <span style={{fontWeight:400,color:"#000"}}>科室:&nbsp;&nbsp;&nbsp;</span>
                        <span>{ value.hisDepartMent}</span>
                    </div>
                    <div>
                        <span style={{fontWeight:400,color:"#000"}}>专业特长:</span>
                    </div>
                    <div>
                        <span>{ value.professional }</span>
                    </div>
                </div>
            </div>
            )
        })
        return doctorList;
    }
    _getKeyBoard( keyword){
        let keyboardList = [];
        keyword.forEach( (value, key) =>{
            keyboardList.push(
                <div key={ key } onClick={ () =>this._inputWord(value) }>{ value }</div>
            )
        })
        return keyboardList;
    }

    render(){
        let doctorList = this._getDoctorList();
        let keyboardList1 = this._getKeyBoard(keyword_Top);
        let keyboardList2 = this._getKeyBoard(keyword_Bottom);
        return(
            <div className= 'body'>
            <div className="container">
                 <Title titleName="医生介绍" 
                    nameen={ (this.props.location.buildData)? this.props.location.buildData.nameen: ""}
                    _handleRoute = { () =>this._handleRoute()} 
                />
                <div className="doc-title">
                    <div className="searchbar">
                       <div className="searchbar-select" >医生姓名</div>
        
                       {/* <div style={{marginLeft:'1rem', fontSize:"5rem", fontWeight:"100"}}>|</div> */}
                       <input type="text"  value={this.state.searchContent}  placeholder="请输入搜索内容的拼音首字母"/>
                    </div>
                    <button className="searchbar-button" onClick={ ()=> this._search()}>查询</button>
                </div>
                <div className="doc-keyboard">
                    <div className="doc-keyboardlist">
                       { keyboardList1 }
                        <div style={{width:"3.2rem",fontSize:"0.8rem"}} onClick={ ()=>this._backSpace()}>后退</div>
                    </div>
                    <div className="doc-keyboardlist">
                        { keyboardList2 }
                        <div style={{width:"3.2rem",fontSize:"0.8rem"}} onClick={ ()=>this._clear()}>清空</div>
                    </div>
                    
                </div>
                <div className="doc-content">
                    { doctorList }
                </div>
            </div>
            </div>
        )
    }
}