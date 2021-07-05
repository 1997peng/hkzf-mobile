import React from 'react'
import { NavBar, Icon ,Toast } from 'antd-mobile'
import {GetCitylist} from '../../store/actionCreators.js'
// 引入连接器
import {connect} from 'react-redux'  //引入连接器
import { List,AutoSizer} from 'react-virtualized';
import './index.scss'
// 封装处理字母索引
const formatcityIndex=(letter)=>{
	switch(letter){
		case '#':
		   return '当前定位'
		case 'hots':
		   return '热门城市'
		default:
		   return letter.toUpperCase()
		break
	}
}
class CityList extends React.PureComponent{
	   constructor(props){
		   super(props)
		   this.state={
		   		   // 右侧字母索引
		   		   activeIndex:0
		   }
		   // 创建ref对象
		   this.cityListComponent=React.createRef()
	   }

	   async componentDidMount(){
		   // 请求城市列表
		   await this.props.GetCityData()
		   // 调用measureAllRows,提交计算List中每一行的高度,实现scrollToRow的精准跳转
		   // BUG
		   // this.cityListComponent.current.measureAllRows()
	   }
	   // 动态计算每一行的高度
	   CityHeight=({index})=>{
		   const {citylist,cityindex}=this.props.Cityinfo
		   const length=citylist[cityindex[index]].length
		   const height=30+50*length
	       return height
	   }
	   // 改变右侧索引
	   changeIndex=(index)=>{
		   this.setState({
			   activeIndex:index
		   })
	   }
	   //用于获取list组件渲染行的信息
	   onRowsRendered=({startIndex})=>{
		   // 判断startIndex和activeindex是否相等
		   if(this.state.activeindex!==startIndex){
			   this.setState({
				   activeIndex:startIndex
			   })
		   }
	   }
	   // 改变当前定位
	   changeCity=(item)=>{
		   const index=this.props.Cityinfo.citylist["hots"].findIndex(res=>{
			   return item.label==res.label
		   })
		   if(index==-1){
			   Toast.fail("该城市暂无房源信息")
		   }else{
			   localStorage.setItem('city',JSON.stringify(item))
			   this.props.history.go(-1)
		   }
	   }
	   ListRender(){
		   const {citylist,cityindex}=this.props.Cityinfo
		   return <AutoSizer>
		        {({width,height})=>{
                 return	<List
				        ref={this.cityListComponent}
                   	    width={width}
                   	    height={height}
                   	    rowCount={cityindex.length}
                   	    rowHeight={this.CityHeight}
						onRowsRendered={this.onRowsRendered}
						scrollToAlignment="start"
                   	    rowRenderer={(obj) => {
                   		 let letter=cityindex[obj.index]
                   	      return (
                   	        <div key={obj.key} style={obj.style} className="citys">
                   					<div className="title">{formatcityIndex(letter)}</div>
                   	             {
                   								citylist[letter].map(item=>{
                   									return <div className="Name" key={item.value} onClick={()=>{this.changeCity(item)}}>{item.label}</div>
                   								})
                   								
                   							}
                   	        </div>
                   	      )
                   	    }}
                   	/>				
				}}	
				</AutoSizer>
	   }
	   // 渲染右侧索引列表
	   renderCityIndex(){
		   return <ul className="cityindex">
		   {
			   this.props.Cityinfo.cityindex.map((item,index)=>{
				   return <li className="index" key={index} onClick={()=>{
					   // this.changeIndex(index)
					   this.cityListComponent.current.scrollToRow(index)
				}}>
				       <span className={this.state.activeIndex===index?'active-index':''}>{item=='hots'?'热':item.toUpperCase()}</span>	
				   </li>
			   })
		   }
		   </ul>
	   }
	   render(){
		
		return(
		  <div className="citylist"> 
		  <NavBar className="NavBar" mode="light" icon={<Icon type="left" onClick={()=>{this.props.history.go(-1)}} />}>城市选择</NavBar> 
		  {/*渲染城市列表*/}
		  {this.ListRender()}
		  {/*渲染右侧索引*/}
		  {this.renderCityIndex()}
		  </div>
		)		   
	   }

}
// 简历映射关系
const StateProps=(state)=>{
	return {
		Cityinfo:state.City.cityinfo,
	}
}
const dispathProps=(dispath)=>{
	return{
		//获取城市列表信息
		GetCityData(){
			const action=GetCitylist()
			dispath(action)
		}
	}
}
export default connect(StateProps,dispathProps)(CityList)
