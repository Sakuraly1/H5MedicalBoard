import React from 'react';
import './Title.css'
import { formatDate} from '../../route/utils';

export default class Title extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time:{
                time:"",
                date:"",
                week:"", 
            },
        }

        // this._handleRoute = this._handleRoute.bind(this);
    }

    componentWillMount(){
        this.time = setInterval( ()=>{
            this.setState({
                time: formatDate()
            })
        },1000);
    }
    componentWillUnmount() {
        this.time && clearInterval(this.time);
    }
    


    render(){
        return(
            <div className="title">
                <div className="title-list1">
                    <div className="title-list1-left"><span>{this.props.titleName}</span></div>
                    <div className="title-list1-right">
                        <img style={{width:"100%",height:"100%"}}src={require('../../image/bg_title.png')} alt=""/>
                    </div>
                </div>
                <div className="title-list2">
                    <div className="title-list2-left"><span>{this.props.nameen||""}</span></div>
                    <div className="title-list2-right"></div>
                </div>
                <div className="title-list3">
                    <div className="title-list3-left">
                        <span style={{marginLeft:"6.4rem"}}>
                        { (this.state.time.date === "")? formatDate().date: this.state.time.date}&nbsp;
                        </span>
                        <span>
                        { (this.state.time.week === "")? formatDate().week: this.state.time.week}&nbsp;
                        </span>
                        <span>
                        { (this.state.time.time === "")? formatDate().time: this.state.time.time}
                        </span>
                    </div>
                    <div className="title-list3-right" onClick ={ ()=>this.props._handleRoute()}>
                        <span>首页</span>
                    </div>
                </div>
            </div>
        )
    }
}
