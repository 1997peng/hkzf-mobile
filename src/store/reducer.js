import {combineReducers} from 'redux';
import HomeReuder from './home/index.js'
import CityReuder from './city/index.js'
const defaultState=combineReducers({
	Home:HomeReuder,
	City:CityReuder
})
export default defaultState