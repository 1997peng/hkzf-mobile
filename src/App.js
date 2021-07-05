import React from 'react'
// 
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
// 引入组件
import Home from './pages/Home/index.js'
import CityList from './pages/CityList/index.js'
import Map from './pages/Map/index.js'
import {connect} from 'react-redux'  //引入连接器
function App(props) {
  return (
    <Router>
    <div className="App">
		  {/* 默认路由匹配时M,跳转到/home 实现路由重定向*/}
		  <Route exact path="/" render={()=><Redirect to="/home"/>}  />
		  {/* 配置路由 */}
		  <Route path="/home" component={Home}  />
		  <Route path="/cityList" component={CityList} />
		  <Route path="/map" component={Map}/>
    </div>
	</Router>
  );
}
// 建立映射关系
const stateToProps = (state)=>{
    return {
        inputValue : state.inputValue
    }
}
export default connect(stateToProps,null)( App);
