import Link from 'next/link'
import Router from 'next/router'
import {Button} from 'antd'

const Hearder = (props) =>{
    return(
        <div className="hearder">
            <div className="nav-box">
                <Link href="/"><a >首页</a></Link>
                <Link href="/list"><a >list</a></Link>
                <Link href="/test1?type=query"><a >test/redux/redux-persist</a></Link>
            </div>
            <div>
                获取props的children:
                <Button>{props.children}</Button>
            </div>
            <div>
                点击跳转，并传参：
                <Button  onClick={()=>{Router.push(
                    {
                        pathname:'/test1',
                        query:{
                            type:'井空'
                        }
                    }
                )}}>test1</Button>
            </div>
            <div>
                <Link href={{pathname:'/test1',query:{type:'结衣222'}}}><a >test1</a></Link>
            </div>
            <style jsx>
                {`
                    .hearder{
                        width:100%; 
                    }
                    .nav-box{
                        background:#ccc;
                        padding:10px 0;
                        text-align:center;
                        
                    }
                    .nav-box a {margin:0 20px;color:red}
                `}
            </style>
        </div>
    )
}

export default Hearder