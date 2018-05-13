import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { 
	BrowserRouter, 
	Route, 
	Redirect,
	Switch
} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'
import reducers from './reducer'
import './config'
import Login from "./container/login/login";
import Register from "./container/register/register";
//import MaleInfo from './container/register/maleinfo'
import AuthRoute from "./component/authroute/authroute";
import MaleInfo from "./container/maleinfo/maleinfo"
import FemaleInfo from "./container/femaleinfo/femaleinfo"
import Dashboard from "./component/dashboard/dashboard"
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
/*function Boss(){
	return <h2>Boss</h2>
}
function Dashboard(){
    return <h2>Dashboard</h2>
}*/
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/maleinfo' component={MaleInfo}></Route>
					<Route path='/femaleinfo' component={FemaleInfo}></Route>
                    {/*<Route path='/maleinfo' component={MaleInfo}></Route>*/}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
