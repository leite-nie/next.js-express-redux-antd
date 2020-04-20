import axios from 'axios'

import { withRouter} from 'next/router'
import Link from 'next/link'
import {Button} from 'antd'

import { connect } from 'react-redux'




const Test = (props) => {
    console.log(props)
    return (
        <div>
            <h2>这是test、redux持久化页面</h2>
            <div>
                <Link href="/"><a>返回首页</a></Link>
                <div className={"test"}>参数为：{props.router.query.type}</div>
                <div>
                   <Button onClick={()=>{
                      props.setCount({
                        type: 'add',
                       
                    })  
                   }} >点我加1</Button>
                   <h2>
                       store中 count的值为 {props.count}
                   </h2>
                </div>
            </div>
            <style jsx>
                {`
                   
                    div { color:blue;}
                    .test{
                        color:red
                    }
                `}
            </style>
        </div>
    )

}

const mapState = (state) => {
    
	return {
		count: state.counter,
	}
}

const mapDispatch = (dispatch) => {
	return {
		setCount: (state) => dispatch(state),
	}
}



export default withRouter(connect(mapState, mapDispatch)(Test))