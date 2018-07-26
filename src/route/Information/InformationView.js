import React from 'react';
import './InformationView.css'


import  Title  from '../../component/Title/Title'


export default class InformationView extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            buildData:{},
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
               <Title titleName="医院资讯" 
                    nameen={(this.props.location.buildData)?  this.props.location.buildData.nameen :""}
                    _handleRoute = { () =>this._handleRoute()} 
                />
               <div className="info-content">
                   <iframe csp="child-src source-list" style={{width:'100%', height:'100%'}} src={ this.props.location.newsUrl || '' }/>
                   {/* <iframe style={{width:'100%', height:'100%'}} src={require('../../image/index1.htm')} /> */}
                   {/* <iframe style={{width:'100%', height:'100%'}} src='http://www.baidu.com' /> */}
               </div>
           </div> 
           </div>
        )
    }
}
