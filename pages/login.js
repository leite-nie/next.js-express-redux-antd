
import axios from 'axios'
import React, {Component} from 'react';

import {Button,Input} from 'antd'
import '../static/css/login.scss'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            user : "",
            password:""
        }
    }
    change1(e){
        
    }
    change2(e){

    }
    login(){
        console.log("login success")
    }
    render(){
        return(
            <div className="login">
                
                <div>      
                  <label htmlFor="">用户名</label>   <Input type="text" onChange={this.change1.bind(this)}></Input>
                </div>
                <div>      
                  <label htmlFor="">密码</label>   <Input type="password"  onChange={this.change2.bind(this)}></Input>
                </div>
                <div>
                    <Button onClick={this.login.bind(this)}>登录</Button>
                </div>
            </div>
        )
    }
}


export default Login