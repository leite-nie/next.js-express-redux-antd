
import axios from 'axios'
import React, {Component} from 'react';
import { withRouter} from 'next/router'

const Content = (props)=>{  //不加withRouter 只会返回Url 对象。 加了会返回 router 和 url 对象
    console.log(props)
    return(
        <div>
            <h2>这里是内容</h2>
           
        </div>
    )
}
Content.getInitialProps = async (res) => {
    const id = res.req ? res.query.id : "111"
  
    return { id }
  };
  


//   getInitialProps()入参对象的属性如下：

// pathname - URL 的 path 部分
// query - URL 的 query 部分，并被解析成对象
// asPath - 显示在浏览器中的实际路径（包含查询部分），为String类型
// req - HTTP 请求对象 (只有服务器端有)
// res - HTTP 返回对象 (只有服务器端有)
// jsonPageRes - 获取数据响应对象 (只有客户端有)
// err - 渲染过程中的任何错误

class Content2 extends Component{
    
    static async getInitialProps({query }){
        let spu_id = encodeURI(query.id)
        let res =  await axios.get("/api/application_mainpage/server_goods/stockgoods/?spu_id="+spu_id+"&shop_id=107");
        
        return { data:res.data.data  }
    }
    constructor(props){
        super(props);
        
        this.state = {
            spu_id  : this.props.router.query.content //this.props.url.query.content
        }
    }

    render(){
        if(!this.props.data){
            return <div>404</div>
        }
        console.log(this.props)
        return(
            <div>
                
                <h2>商品名称：{this.props.data.goods_name}</h2>
                <h2>商品id：{this.props.router.query.id}</h2>
            </div>
        )
    }
}
export default withRouter(Content2)