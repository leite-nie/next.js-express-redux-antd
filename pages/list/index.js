import List from '../../components/List';
import axios from 'axios'
import Link from 'next/link'
import React,{Component} from "react"
// const List2 = () =>{
//     return(
//         <List></List>    
//     )
// }


const timeout = (ms, result) => {
    return new Promise(resolve => setTimeout(() => resolve(result), ms));
}  
class List2 extends Component{
    static async getInitialProps() {
        //await timeout(5000, {userName: 'Morgan'})

        // 可以自己找一个数据源
        let res =  await axios.get("/api/server_search/goods/goods_search/?page=1&size=3&text__starts=&order_by=-weight_num&_time=1586847173935");
        return { data: res.data.data.data }
    }
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props)
        return(
            <div>22222
                {/* <List></List>     */}
                <ul>
                {this.props.data.map((item,index)=>{
                    return <li key={index}>
                         <Link as={`/list/${item.spu_id}`} href={`/list/content`}><a>{item.text}</a></Link>
                         
                    </li>
                })}
                </ul>
            </div>
        )
    }
}



// const List2 = (props) =>{
//     debugger
//     return(
//         <div>
//             {/* <List></List>     */}
//             <ul>
//                {props.data.map((item,index)=>{
//                    return <li key={index}>
//                        {item.text}
//                    </li>
//                })}
//             </ul>
//         </div>
//     )
// }

// const timeout = (ms, result) => {
//     return new Promise(resolve => setTimeout(() => resolve(result), ms));
//   };
  
// List2.getInitialProps = async()=>{
//      let _data = await axios.get("/api/server_search/goods/goods_search/?page=1&size=30&text__starts=&order_by=-weight_num&_time=1586847173935");
//      return  _data.data.data
//     // return await timeout(200, {userName: 'Morgan'});
// }


export default  List2