import React from 'react';


import { formatDate, get} from '../utils';
// import Swiper from 'swiper'
import './swiper.css'
import './AppView.css'

const Swiper = window.Swiper;
const Native = window.Native;
export default class AppView extends React.Component{
    constructor( props ){
        super( props );
        this.state ={
            time:{
                time:"",
                date:"",
                week:"", 
            },
            imageUrl:{
                infoImage:[],
                middleImage:'',
                bottomImage:''
            },
            buildData:{}
        }
    }
    
    componentWillMount(){
        this.time = setInterval( ()=>{
            this.setState({
                time: formatDate()
            })
        },1000);
        get("info/list","type=sp")
            .then( data =>{
                if( data ){
                    this.setState({
                        imageUrl:{
                            infoImage: data.infoImage,
                            middleImage:data.profileImage,
                            bottomImage:data.qrcode
                        },
                        buildData:data
                    })
                } 
            })
    }

    componentDidUpdate(){
        if( !this.swiper ){
            this.swiper = new Swiper('.swiper-container', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }
    }

    _getImageList(){
        if( this.state.imageUrl.infoImage === "")return;
        let imageList = [];
        this.state.imageUrl.infoImage.forEach( (value,key) =>{
            imageList.push(
                <div key={ key }className="swiper-slide" style={{height:'9rem',width: '100%'}}>
                    <img  src={ value.newsImage } 
                        onClick = {() => this._handleRoute('/information', value.newsUrl)}
                        style={{height:'9rem'}} alt=""/>
                </div>           
            )
        })     
        return imageList;
    }
    _handleRoute( pathname="/app", newsUrl=''){
        if (pathname === '/navigation'){
            Native.intentToMap();
        }else{
            let path= {
                pathname:pathname,
                buildData: this.state.buildData,
                newsUrl: newsUrl
            }
            this.props.history.push(path)
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.time);
    }

    render(){
        let imageList= this._getImageList();
        return(
            <div className='body'>
            <div className="container">
                <div className="shuffling" >
                    <div className="shuffling-title">
                        <img src={require('../../image/ic_zixun.png')} style={{height:"1rem",width:"0.886rem",marginLeft:"0.55rem",}} alt=""/>
                        <span className="shuffling-word" >医院资讯</span>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper" >
                            { imageList }
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
                <div className="block-left" >
                    <div className="block-introduce" onClick={ ()=>this._handleRoute("/department")}>
                        <div style={{height:"1.2rem",width:"100%",marginTop:"0.4rem"}}><span >科室介绍</span></div> 
                        <img src={require('../../image/pic_.png')} alt=""/>
                    </div>
                    <div className="block-fengcai">
                        <div className="block-fengcai-middle" onClick={ ()=>this._handleRoute("/doctor")} >
                            <img src={require('../../image/ic_doctor.png')} style={{height:"1.5rem",width:"1.172rem"}} alt=""/>
                            <span>名医风采</span>
                        </div>
                    </div>
                </div>
                <div className="block-right">
                    <div className="block-fengcai guide">
                        <div className="block-fengcai-middle">
                            <img src={require('../../image/ic_zhinan.png')} style={{height:"1.5rem",width:"1.172rem"}} alt=""/>
                            <span>就医指南</span>
                        </div>
                    </div>   
                    <div className="block-introduce navigation" onClick={ ()=>this._handleRoute("/navigation")}>
                        <div style={{height:"1.2rem",width:"100%",marginTop:"0.4rem"}}><span >医院导航</span></div> 
                            <img  src={require('../../image/ic_daohang.png')} alt="" />
                        </div>
                    </div>
               <div className="block-middle" onClick={ ()=>this._handleRoute("/situation")}>
                    <img  className="block-middle-img" src={ this.state.imageUrl.middleImage } alt=""/>
                    <div className="block-introduce5" >
                        <img src={require('../../image/ic_gaikuang.png')} alt="" />
                        <span >医院概况</span>
                    </div>
               </div>
               <div className="block-bottom">
                    <div className="block-bottom-left">
                        <div className="left-span1">
                            <span>{ (this.state.time.time === "")? formatDate().time: this.state.time.time}</span>
                        </div>
                        <div className="left-span2">
                            <span>{ (this.state.time.date === "")? formatDate().date: this.state.time.date}</span>
                            <span style={{marginLeft:"0.4rem"}}>{ (this.state.time.week === "")? formatDate().week: this.state.time.week}</span>
                        </div>
                    </div >   
                    <div className="block-bottom-right">
                        <div className="right-span1"><span>社区医院</span></div>
                        <div className="right-span2"><span>{this.state.buildData.namecn || ""}</span></div>
                        <div className="right-span3">
                            <span>扫描二维码<br/>关注公众号</span>
                            <div className="sanjiao_right"></div>
                            <img  style={{height:"3.75rem", width:"3.75rem"}}
                                className="block-middle-img" src={ this.state.imageUrl.bottomImage } alt=""/>
                        </div>       
                    </div>
                </div>      
            </div>
            </div> 
        )
    }
}