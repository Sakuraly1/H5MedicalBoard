import React from 'react';
import './NavigationView.css'


import { get } from '../utils.js'
import  Title  from '../../component/Title/Title'
import backImage from '../../image/ic_path_back.png'
import frontImage from '../../image/ic_path_front.png'
import leftImage from '../../image/ic_path_left.png'
import rightImage from '../../image/ic_path_right.png'

const keyword_Top= ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
const keyword_Bottom = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const Native = window.Native;
let getNaviData = window.getNaviData;

const config = {
    24097000: '楼梯',
    24093000: '扶梯',
    24091000: '电梯',
    24095000: '上行扶梯',
}
export default class NavigationView extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            shortcuts:[],
            searchContent:"",
            isNavigating: false,
            searchList:[],
            naviContent: [],
            chooseNavi: 0,
            posiAngle: 0
        }
    }

    
    
    
    componentWillMount(){
        window.getNaviData = (data, angle) => {
            if(data){
                this.setState({
                    naviContent: data,
                    isNavigating: true,
                    posiAngle: angle
                })
            }
        }
        get("shortcuts/list","type=sp")
        .then( data =>{
            this.setState({
                shortcuts: data
            })
        })
    }

    _hotKeySearch(keyWord){
        get('poi/search', 'keyWord=' + keyWord )
        .then( data => {
            this.setState({
                searchList:data.datas,
                searchContent: keyWord
            })
        })
    }

    _listSearch(id) {
       const data = this.state.searchList[id];
       if (data){
        Native.intentToMapWithEnd(data.flId, data.display,
            data.center.coordinates[0], data.center.coordinates[1])
        }
    }

    _handleRoute(){
       Native.goHome();
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
            this._search();
        })
    }

    _search(){
        if( this.state.searchContent === ''){

        }else{
            get('poi/search/spell', 'keyword=' + this.state.searchContent )
            .then( data => {
                this.setState({
                    searchList:data.datas
                })
            })
        }   
    }

    _offNavigation(){
        Native.resectMap()
        this.setState({
            isNavigating: false ,
            naviContent: []
        })
        
    }
    _chooseFloor(floorId, id) {
        Native.swichFloorId(floorId, id)
        this.setState({
            chooseNavi: id
        })
    }

    _getSearchList(){
        let searchList = [];
        if (this.state.searchList.length === 0 )return 
        this.state.searchList.forEach((value, key) => {
            searchList.push(
                <div key= { key } className= 'searchList' onClick = {() => this._listSearch(key)}>
                    <span style={{marginLeft: '0.4rem'}}>{ value.display}</span>
                    <span style={{marginRight: '0.4rem'}}>{value.floorName}</span>
                </div>
            )
        })
        return searchList;
    }

    _getShortCutsList() {
        let shortcutsList = [];
        if( this.state.shortcuts.length === 0 ) return ;
        let index = 0;
        this.state.shortcuts.forEach((value, key) => {
            shortcutsList.push(
                <div className='img-container' key={'icon' + value.id}>
                    <img src = {value.iconUrl} 
                        onClick= {() => this._hotKeySearch(value.value)}
                        style= {{height:'4.5rem', width: '4.5rem',marginTop:'0.5rem'}}alt=''/>
                </div>
            )
        })
        const lack = this.state.shortcuts.length % 4;
        if( lack !== 0){
            for (let i = 0; i< 4 - lack ; i++){
                shortcutsList.push(
                    <div className='img-container' key={'blank' + i}> </div>
                )
            }
        }
        return shortcutsList;
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

    _getNaviList(){
        let naviList = [];
        if (this.state.naviContent.length === 0)return;
        if (this.state.naviContent.length === 1) {
            let currContent = this.state.naviContent[0]
            naviList.push(
                <div className='naving-list3-line'></div>
            );
            naviList.push(
                <div className='naving-list3-part' onClick= {() => this._chooseFloor(currContent.floorId, 0)} >
                    <div style = {{backgroundColor: (this.state.chooseNavi === 0)? '#9575CD' : 'white', 
                        color: (this.state.chooseNavi === 0)? 'white' : '#9575CD'}}>
                        {currContent.floorName}
                    </div>
                    <span >{currContent.poiName}</span>
                </div>
            )
        } else {
            this.state.naviContent.forEach((value, key) => {
                if( key !== 0 ){
                    naviList.push(
                        <div key= {'line1'+key} className='naving-list3-line'></div>
                    );
                    naviList.push(
                        <img  key= {'img'+key} src={require('../../image/dianti.png')} style={{width:'1.6rem'}}/>
                    );
                    naviList.push(
                        <div key= {'line2'+key} className='naving-list3-line'></div>
                    );
                    naviList.push(
                        <div className='naving-list3-part' key= {key}onClick= {() => this._chooseFloor(value.floorId,key)} >
                            <div style = {{backgroundColor: (this.state.chooseNavi === key)? '#9575CD' : 'white' ,
                                color: (this.state.chooseNavi === key)? 'white' : '#9575CD'}}>
                                {value.floorName}
                            </div>
                            <span >{value.poiName}</span>
                        </div>
                    )
                }
            })
        }
        return naviList;
    }
    _analysisData(data) {
        if (data) {
            if (this.state.chooseNavi === 0) {
                let a='',b='',c='',d='';
                if (data.startCategory=== -1 || data.startCategory=== 0) {
                    a = '出发,'
                } else {
                    a = '下' + config[data.startCategory] + ',' || '';
                }
                if (Math.ceil(data.distance) === 0) b = '';
                else  b = '直行' + Math.ceil(data.distance) + '米,'; 

                c = this._analysisAngle()[0];
                
                if (data.endCategory=== -1 || data.endCategory=== 0) {
                    d = '前往终点'
                } else {
                    d = '前往' + config[data.endCategory] ;
                }
                return c + a + b + d;     
            } else {
                let a='',b='',c='',d='';
                if (data.startCategory=== -1 || data.startCategory=== 0) {
                    a = '出发,'
                } else {
                    a = '下' + config[data.startCategory] + ',' || '';
                }
                if (Math.ceil(data.distance) === 0) b = '';
                else  b = '直行' + Math.ceil(data.distance) + '米,'; 
    
                if (data.nextAngleInfo) c =  c = data.nextAngleInfo + ','
                else c = '' 
                
                if (data.endCategory=== -1 || data.endCategory=== 0) {
                    d = '前往终点'
                } else {
                    d = '前往' + config[data.endCategory] ;
                }
                return  a + b + c + d;     
            }
           
        }
    }

    _analysisAngle() {
        if (this.state.chooseNavi === 0) {
            let angle = this.state.naviContent[0].angle;
            let result = angle - this.state.posiAngle;
            if (result < 0) result = result + 360;
            if (result < 45 || result > 315) return ['', frontImage];
            else if (result < 135) return ['右', rightImage];
            else if (result < 225) return ['向后', backImage];
            else if (result < 315) return ['左转', leftImage]
        } else {
            let angle = this.state.naviContent[this.state.chooseNavi].nextAngleInfo
            switch (angle){
                case '左转': return ['左转',leftImage]; break;
                case '右转': return ['右转',rightImage]; break;
                case '向后': return ['向后',backImage]; break;
                default: return ['',frontImage]; break;
            } 
        }
        
    }

 

    render(){
        let keyboardList1 = this._getKeyBoard(keyword_Top);
        let keyboardList2 = this._getKeyBoard(keyword_Bottom);
        let naviContent = this.state.naviContent;
        let chooseNavi = this.state.chooseNavi;
        let angleData = null;
        if (naviContent.length !== 0) {
            angleData = this._analysisAngle();
        }

        return(
            <div className='body'>
            <div className = 'navi-container'>
                <div className = 'navi-content' style = {{visibility: (this.state.isNavigating)? 'hidden':'visible'}}>
                    <div className='navi-search' >
                        <div className="navi-title">
                            <img style={{height:'2.5rem', width:'2.5rem',marginRight: '0.5rem'}}
                                onClick={() => this._handleRoute()}
                                src= {require('../../image/ic_home.png')} alt=''/>
                            <div className="searchbar">
                                <input type="text"  value={this.state.searchContent}  placeholder="请输入目的地"/>
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
                    </div>
                    { ( this.state.searchContent !== '' ) ? 
                        <div className= 'navi-searching'>
                            { this._getSearchList() }
                        </div>
                            :
                        <div className='navi-hotkey'>
                            <div className = 'title'>
                                <div></div>
                                <span>常用目的地</span>
                            </div>
                            <div className = 'hotkey-body'>
                                { this._getShortCutsList()}                                    
                            </div>
                        </div>
                    }        
                </div>
                <div className = 'navi-content' style = {{visibility: (this.state.isNavigating)? 'visible':'hidden'} }>
                    <div className='naving-list1'>
                        <img style={{height:'2.5rem', width:'2.5rem',marginRight: '0.5rem'}}
                                onClick={() => this._offNavigation()}
                                src= {require('../../image/ic_back.png')} alt=''/>
                        <div className="list1-body">
                            <span style={{marginLeft:'0.8rem'}}>{(naviContent.length !== 0)? naviContent[naviContent.length-1].poiName : ''}</span>
                            <span style={{marginRight:'0.8rem'}}>{(naviContent.length !== 0)? naviContent[naviContent.length-1].floorName : ''}</span>
                        </div>
                    </div>
                    <div className="naving-list2">
                        {
                            (angleData) ?
                             <img src= {angleData[1]} style={{width: '1.7rem', height:'1.7rem'}}/>
                            :
                            null
                        }
                       
                        <span style={{marginLeft:'0.8rem'}}>{(naviContent.length !== 0)? this._analysisData(naviContent[chooseNavi]): ''}</span>
                    </div> 
                    <div className="naving-list3">
                        <div className='naving-list3-part' onClick= {() => this._chooseFloor(naviContent[0].floorId || '',0)} >
                            <div style = {{backgroundColor: (this.state.chooseNavi === 0)? '#9575CD' : 'white' ,
                                color: (this.state.chooseNavi === 0)? 'white' : '#9575CD'}}>
                                {(naviContent.length !== 0)? naviContent[0].floorName: ''}
                            </div>
                            <span >我的位置</span>
                        </div>
                        {this._getNaviList()}    
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
