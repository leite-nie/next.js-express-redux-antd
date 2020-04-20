import React, {Component} from 'react';
import axios from 'axios'
import Link from 'next/link'



class List extends Component{
     
    static async getInitialProps() {
        let pageProps = {}
        let data =  await axios.get("/api/server_search/goods/goods_search/?page=1&size=30&text__starts=&order_by=-weight_num&_time=1586847173935");
        pageProps = {...data}
        console.log(pageProps)
        return {pageProps}
    }
    
   
    constructor(props) {
        super(props);
        this.state = {
            data : [1,2,3,4]
        }
       
    }
    
    render(){
        
        return (
            <div>
                <h2></h2>
                <div>
                    {this.props.pageProps}
                    <ul>
                        {this.state.data.map((item,index)=>{
                            return <li key={"list"+index}>
                                <Link href={`/list/${item.spu_id}`}>{item}</Link>
                            </li>
                        })}
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default List