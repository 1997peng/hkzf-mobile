import {GET_CITYLIST} from '../actionType.js'
const defaultState={
	// 城市列表
	cityinfo:{
		citylist:{},
		cityindex:[]
	}
}
const fnc=(state=defaultState,action)=>{
	if(action.type==GET_CITYLIST){//eslint-disable-line
		const newState=JSON.parse(JSON.stringify(state))
		newState.cityinfo=action.data
		return newState
	}
	return state
}
export default fnc