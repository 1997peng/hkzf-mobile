import React from 'react'
import { Carousel,Flex,Grid,Icon} from 'antd-mobile'
import {GetBanner,GetGroups,GetNavlist,GetCity,CityName} from '../../store/actionCreators.js'
import {connect} from 'react-redux'  //引入连接器
import nav1 from '../../assets/image/navlist-01.png'
import nav2 from '../../assets/image/navlist-02.png'
import nav3 from '../../assets/image/navlist-03.png'
import nav4 from '../../assets/image/navlist-04.png'
import '../../css/home/index.scss'
//导航数据
const navdata=[
	{id:1,url:nav1,title:'整租',path:'/home/list'},
	{id:2,url:nav2,title:'合租',path:'/home/list'},
	{id:3,url:nav3,title:'我要找房',path:''},
	{id:4,url:nav4,title:'出租',path:''}
]
class Index extends React.PureComponent{
  componentDidMount() {
	// 请求轮播图数据
	this.props.GetBannerData()
	// 创建ip定位实例
	window.AMap.plugin('AMap.CitySearch',()=> {
	  const citySearch = new window.AMap.CitySearch()
	  citySearch.getLocalCity((status, result)=>{
	    if (status === 'complete' && result.info === 'OK') {
		   GetCity(result.city).then(res=>{
			   // 租房小组
			   this.props.getGroups(res)
			   // 最新资讯
			   this.props.getNewslist(res)
			   // 将定位存储到本地
			   if(!localStorage['city']){
				   localStorage.setItem('city',JSON.stringify({label:result.city,value:res}))
			   }
		   })
           this.props.setCityName(result.city)
	    }
	  })
	})

  }
  // 轮播图函数
  RendeSwiper(){
	  return this.props.Swiper.map(item => (
	           <a
			      href="https://www.baidu.com"
	              key={item.id}
	              style={{ display: 'inline-block', width: '100%', height:'212px' }}
	            >
	              <img
				    alt={item.alt}
	                src={`http://localhost:8080${item.imgSrc}`}
	                style={{ width: '100%', verticalAlign: 'top' }}
	                onLoad={() => {
	                  // fire window resize event to change height
	                  window.dispatchEvent(new Event('resize'));
	                }}
	              />
	    </a>
	))        
  }
  // 导航
  Rendernavs(){
	 return	navdata.map(item=>
	<Flex.Item key={item.id} onClick={()=>this.props.history.push(item.path)}>
		<img src={item.url} alt={item.alt}/>
	    <h2>{item.title}</h2>
		</Flex.Item>			  
	) 

  }
  // 租房小组
  RenderGroups(){
	  return <Grid  className="Grid"  hasLine={false} square={false} data={this.props.Gropus} columnNum={2}
	         renderItem={dataItem => (
			       <Flex className="Gridlist" key={dataItem.id}>
			         <Flex.Item style={{flex:'2'}}>
					 <p>{dataItem.title}</p>
					 <p>{dataItem.desc}</p>
					 </Flex.Item>
			         <Flex.Item>
					 <img src={`http://localhost:8080${dataItem.imgSrc}`} alt={dataItem.alt}/>
					 </Flex.Item>
			       </Flex>
	         )}
	  	
	/>
  }
  render() {
    return (
      <div>
	      {/*轮播图*/}
		  <div className="Swiper">
		    <Flex className="search-box">
			  <Flex className="search">
			    <Flex className="address" onClick={()=>{this.props.history.push('/citylist')}}>
				 <span>{this.props.cityName}</span>
				 <Icon type='down' />
				</Flex>
				<Flex className="search-input">
				   <i className="iconfont icon-magnifier" onClick={()=>{this.props.history.push('/search')}}></i>
				   <input placeholder="请输入小区或地址"></input>
				</Flex>
			  </Flex>
			  <div className="icon">
			   <i className="iconfont icon-dizhi" onClick={()=>{this.props.history.push('/map')}} ></i>
			  </div>
			</Flex>
	        <Carousel autoplay={true} infinite={true}  autoplayInterval={1000}>
	         {this.RendeSwiper()}
	        </Carousel>
	      </div>
		  {/*导航菜单*/}
		  <Flex className="nav">
             {this.Rendernavs()}
		  </Flex>
		  {/*租房小组*/}
		  <h2 className="groups">租房小组  <span className="more">更多</span> </h2>
		  {this.RenderGroups()}
		  {/*最新资讯*/}
		  <div className="newslist">
		    <h2 className="newstitle">最新资讯</h2>
			{
			  this.props.Newslist.map(item=>{
				 return  <Flex className="news-one" key={item.id}>
				  <Flex.Item style={{flex:'1'}}>
				  <img src={`http://localhost:8080${item.imgSrc}`} alt={item.alt}/>
				  </Flex.Item>
				  <Flex.Item style={{flex:'2',padding:'0 10px'}} className="navinfo">
				   <p>{item.title}</p>
				   <p><span>{item.from}</span><span>{item.date}</span></p>
				  </Flex.Item>
				  </Flex>
			  })	
				
			}
		  </div>
      </div>
    );
  }
}
// 建立映射关系
const stateToProps = (state)=>{
    return {
		// 轮播图数据
        Swiper:state.Home.Swiper,
		// 租房小组数据
		Gropus:state.Home.Groups,
		// 最新资讯
		Newslist:state.Home.Newslist,
		// 定位城市
		cityName:localStorage['city']?JSON.parse(localStorage['city']).label:state.Home.cityName
    }
}
// 函数
const dispatchToProps = (dispatch) =>{
	return{
	   // 请求轮播图数据
       GetBannerData(){
		  const action=GetBanner()
		  dispatch(action)
	   },
	   // 点击跳转
	   handleClick(){
	   	  console.log("111")
	   },
	   // 请求租房小组数据
	   getGroups(data){
		   console.log(data)
		   const action=GetGroups(data)
		   dispatch(action)
	   },
	   // 最新资讯
	   getNewslist(){
		   const action=GetNavlist()
		   dispatch(action)
	   },
	   // 设置定位城市名字
	   setCityName(data){
		   const action=CityName(data)
		   dispatch(action)
	   }
	   
	   }
}

export default connect(stateToProps,dispatchToProps)(Index);