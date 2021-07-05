import {GET_BANNER,GET_GROUPS,GET_NEWSLIST,GET_CITYLIST,CITY_NAME} from './actionType.js'
import axios from 'axios'
export const Banner=(data)=>({
	type:GET_BANNER,
	data
})
export const Groups=(data)=>({
	type:GET_GROUPS,
	data
})
export const Navlist=(data)=>({
	type:GET_NEWSLIST,
	data
})
export const Citylist=(data)=>({
	type:GET_CITYLIST,
	data
})
export const CityName=(data)=>({
	type:CITY_NAME,
	data
})
// 请求轮播图数据
export const GetBanner=()=>{
	return async(dispath)=>{
		const {data:res}=await axios.get("http://localhost:8080/home/swiper")
		if (res.status == 200) {//eslint-disable-line
			const action=Banner(res.body)
			dispath(action)
		}
	}
}
// 请求城市信息
export const GetCity=async(data1)=>{
	const {data:res}=await axios.get("http://localhost:8080/area/info?name="+data1)
	if(res.status==200){//eslint-disable-line
		return res.body.value
	}
}
// 请求租房小组数据
export const GetGroups=(data1)=>{
	 return async(dispath)=>{
	 	const {data:res}=await axios.get("http://localhost:8080/home/groups?area="+data1)
	 	if(res.status==200){//eslint-disable-line
	 		const action=Groups(res.body)
	 		dispath(action)
	 	}
	 }

}
// 请求最新资讯
export const GetNavlist=(data1)=>{
	return async(dispath)=>{
		const {data:res}=await axios.get("http://localhost:8080/home/news?area="+data1)
		if(res.status==200){//eslint-disable-line
			const action=Navlist(res.body)
			dispath(action)
		}
	}
}
// 请求城市列表信息
export const GetCitylist=()=>{
	const city={
		citylist:{},
		cityindex:[]
	}
	return async(dispath)=>{
		// 请求城市列表
		const {data:res}=await axios.get("http://localhost:8080/area/city?level=1")
		// 截取城市开头字母
        res.body.forEach(item=>{
        	const first=item.short.substr(0,1)
        	if(city.citylist[first]){
        		city.citylist[first].push(item)
        	}else{
        		city.citylist[first]=[item]
        	}
        })
		// 排序
        city.cityindex=Object.keys(city.citylist).sort()
		// 获取热门信息
		const {data:res1}=await axios.get("http://localhost:8080/area/hot")
		city.citylist['hots']=res1.body
		city.cityindex.unshift('hots')
		city.citylist['#']=[JSON.parse(localStorage['city'])]
		city.cityindex.unshift('#')
		const action=Citylist(city)
		dispath(action)
	}
}