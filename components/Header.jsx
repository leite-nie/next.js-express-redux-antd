import Link from 'next/link'
import Router from 'next/router'
const Hearder = (props) =>{
    return(
        <div className="hearder">
            <Link href="/">首页</Link>
            
            <Link href="/test1?type=query">test</Link>
            <button>{props.children}</button>
            <button  onClick={()=>{Router.push(
                {
                    pathname:'/test1',
                    query:{
                        type:'井空'
                    }
                }
            )}}>test1</button>
            <Link href={{pathname:'/test1',query:{type:'结衣222'}}}>test1</Link>
        </div>
    )
}

export default Hearder