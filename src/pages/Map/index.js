import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import './index.css'
export default class Map extends React.PureComponent{
	componentDidMount(){
		// // 初始化地图实例
		// const  map = new window.BMapGL.Map("container");
		// // 设置重新坐标
		// const point = new window.BMapGL.Point(null,null);
		// // 初始化地图
		// map.centerAndZoom(point, 15);
		// var geolocation = new window.BMapGL.Geolocation();
		//         geolocation.getCurrentPosition(function(r){
		//             if(this.getStatus() ==  window.BMAP_STATUS_SUCCESS){
		//                 var mk = new  window.BMapGL.Marker(r.point);
		//                 map.addOverlay(mk);
		//                 map.panTo(r.point);
		//             }       
		// });
		new window.AMap.Map('container');
	}
	render(){
		return(
		  <div className="map">
		    <NavBar
		          mode="light"
		          icon={<Icon type="left" onClick={()=>{this.props.history.go(-1)}} />}
		    >地图</NavBar>
		   {/* 地图容器 */}
		    <div id="container"></div>
		  </div>
		)
	}
}