import {GET_BANNER,GET_GROUPS,GET_NEWSLIST,CITY_NAME} from '../actionType.js'
const defaultdata={
	Swiper:[],
	Groups:[],
	Newslist:[],
	cityName:''
}
const fnc=(state=defaultdata,action)=>{
	// 设置轮播图数据
	if(action.type==GET_BANNER){//eslint-disable-line
		const newState=JSON.parse(JSON.stringify(state))
        newState.Swiper=action.data
		return newState
	}
	// 设置租房小组数据
	if(action.type==GET_GROUPS){//eslint-disable-line
		const newState=JSON.parse(JSON.stringify(state))
		newState.Groups=action.data
		return newState
	}
	// 设置最新资讯
	if(action.type==GET_NEWSLIST){//eslint-disable-line
		const newState=JSON.parse(JSON.stringify(state))
		newState.Newslist=action.data
		return newState
	}
	// 设置定位城市名字
	if(action.type==CITY_NAME){//eslint-disable-line
		const newState=JSON.parse(JSON.stringify(state))
		newState.cityName=action.data
		return newState
	}
	return state
}
export default fnc