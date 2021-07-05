import React from 'react'
import {Route} from 'react-router-dom'
// 导入antd组件
import { TabBar } from 'antd-mobile'
import Index from './homes.js'
import List from './list.js'
import News from './news.js'
import User from './user.js'
import './index.scss'
// Tabbar数据
const TabbarItem=[
			  {
				  title:'首页',
				  key:'index',
				  icon:'icon-yiliaohangyedeICON-',
				  Tab:'/home'
			  },
			  {
			  				  title:'导航',
			  				  key:'homelist',
			  				  icon:'icon-icon_bangwozhaofang',
			  				  Tab:'/home/list'
			  },
			  {
			  				  title:'咨询',
			  				  key:'news',
			  				  icon:'icon-zixun',
			  				  Tab:'/home/news'
			  },
			  {
			  				  title:'首页',
			  				  key:'user',
			  				  icon:'icon-wode',
			  				  Tab:'/home/user'
			  },
]
export default class Home extends React.PureComponent{
	state = {
	      selectedTab: this.props.location.pathname,
	      hidden: false,
	      fullScreen: true
	}
	componentDidUpdate(prevProps){
		// 判断路由是否发生变化
		if(prevProps.location.pathname!==this.props.location.pathname){
			this.setState({
				selectedTab:this.props.location.pathname
			})
		}
		
	}
	// 渲染Tabbar
	renderTabBarItem(){
		return TabbarItem.map(item=>{
			 return <TabBar.Item
			  title={item.title}
			  key={item.key}
			  icon={
				<i className={`iconfont ${item.icon}`}></i>
			  }
			  selectedIcon={
				<i className={`iconfont ${item.icon}`}></i>
			  }
			  selected={this.state.selectedTab ===item.Tab}
			  onPress={() => {
			    this.setState({
			      selectedTab:item.Tab,
			    });
				this.props.history.push(item.Tab)
			  }}
			>
			</TabBar.Item>			
		}
		)
	}
	render(){
		return(
		 <div className="home">
		 <Route exact path="/home" component={Index}  />
		 <Route path="/home/list" component={List}  />
		 <Route path="/home/news" component={News}  />
		 <Route path="/home/user" component={User}  />
		         <TabBar
		           unselectedTintColor="#949494"
		           tintColor="#33A3F4"
		           barTintColor="white"
		           hidden={this.state.hidden}
				   noRenderContent="true"
		         >
				 {this.renderTabBarItem()}
		         </TabBar>

		 </div>
		)
	}
}
