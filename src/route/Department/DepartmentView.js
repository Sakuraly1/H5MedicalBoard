import React from 'react';
import './DepartmentView.css'
import { get} from '../utils.js'
import  Title  from '../../component/Title/Title'

export default class DepartmentView extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            departmentList:[]
        }
    }

    componentWillMount(){
        get("guide/list","type=sp")
        .then( data =>{
            this.setState({    
                departmentList: data
            })
        })
    }

    _handleRoute(){
        let path= {
            pathname:'./app',
        }
        this.props.history.push(path)
    }

    _goToDetail( value ){
        let path ={
            pathname:'./depDetail',
            id: value.id,
            bdid:"09K301",
            buildData: this.props.location.buildData,
            departData: value
        }
        this.props.history.push(path)       
    }

    _getContentList(){
        if( this.state.departmentList.length === 0) return;
        let contentList = []
        this.state.departmentList.forEach( (value, key) =>{
            let guide = this._getDepList( value.guideList);
            contentList.push(
                <div key= {key}className="dep-content-list">
                    <div className="dep-content-list-title">
                        <span style={{ fontWeight:900}}>|</span>
                        <span style={{marginLeft:"0.4rem"}}>{ value.category}</span>
                    </div>
                    <div className="dep-content-list-content">
                        { guide }
                    </div>
                </div>
            )
        })
        return contentList;
    }

    _getDepList( guideList ){
        if( guideList.length === 0) return;
        let guide = [];
        guideList.forEach( (value, key) =>{
            guide.push(
                <div key={ value.id } onClick={ () =>this._goToDetail( value )}><span>{ value.value}</span></div>
            )
        })
        return guide;
        
    }

    
    render(){
        let contentList = this._getContentList();

        return(
            <div className= 'body'>
            <div className="container">
                 <Title titleName="科室介绍" 
                    nameen={ (this.props.location.buildData)? this.props.location.buildData.nameen: ""}
                    _handleRoute = { () =>this._handleRoute()} 
                />
                <div className="dep-title">
                    <span>科室介绍</span>
                </div>
               <div className="dep-content">
                   
                   {contentList}

               </div>
            </div>
            </div>
        )
    }
}