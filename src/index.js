import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom'
import './index.css';
import AppView from './route/App/AppView'

import Situation from './route/Situation/SituationView'
import Department from './route/Department/DepartmentView'
import DepDetail from './route/Department/DepDetailView'
import Doctor from './route/Doctor/DoctorView'
import DocDetail from './route/Doctor/DocDetailView'
import Information from './route/Information/InformationView'
import Navigation from './route/Navigation/NavigationView'
import registerServiceWorker from './registerServiceWorker';

window.onload = function() {
	let width = window.screen.width;
	let result = 16 * width / 432;
	console.log(result);
	document.getElementsByTagName('html')[0].style.fontSize= result + 'px'
}
ReactDOM.render((
	<HashRouter >
		<div className="route">
			<Route path="/app"  component= { AppView }/> 
			
			<Route path="/situation"  component= { Situation }/> 
			<Route path="/department" component= { Department }/> 
			<Route path="/depDetail" component= { DepDetail }/>
			<Route path="/doctor" component= { Doctor }/>
			<Route path="/docDetail" component= { DocDetail }/>
			
			<Route path="/information" component= { Information }/>
			<Route path="/navigation" component= { Navigation }/>
		</div>
	</HashRouter>
), document.getElementById('root'));
registerServiceWorker();


