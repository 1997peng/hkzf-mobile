import React from 'react'
import {connect} from 'react-redux'  //引入连接器
function App(props) {
  return (
    <div className="App">
      <header className="App-header">
	    {props.inputValue}
      </header>
    </div>
  );
}
// 建立映射关系
const stateToProps = (state)=>{
    return {
        inputValue : state.inputValue
    }
}
export default connect(stateToProps,null)( App);
