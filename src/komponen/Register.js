import React, { Component } from 'react';
import { Link, Route , Redirect} from 'react-router-dom';
import '../../src/App.css';
import axios from 'axios'

import Headshake from 'react-reveal/HeadShake'

class Register extends Component{

    state = [
        {redirect_login: false,
        
        noticewrong: ""}
    ]
    submit(x){
        
        axios.post('http://localhost:3210/register',
        {
            name: x.name.value,
            username: x.users.value,
            password: x.pass.value,
            telp: x.telp.value,
        })

        .then((x)=>{
            
            if(x.data.statusregister === true){
                this.setState({redirect_login: true})
                alert("SUCCESS, LOGIN NOW")
            }
            // if (x.data.statusregister === false )
            else{
                this.setState({noticewrong:<Headshake><p className="noticement"><b>Username has been taken, please use another username.</b></p></Headshake>})
                console.log({status: x.data.statusregister})
            }
        })
    }
    render(){
        const {redirect_login} = this.state
        if(redirect_login){
            this.setState({redirect_login: false});
            return(
                <Redirect to='/Loginpage'/>
            )
        }
        return (

            <div className="loginregister">    
                
                <h2 id="login">Register to Kikipipi here!</h2>
                <input className="username" type="text" placeholder="input here..." name="name" ref="name" required/>
                <span>    </span>
                <label for="name"><b>Nama Lengkap</b></label>
                

                <br/>

                <input className="username" type="text" placeholder="input here..." name="uname" ref="users" required/>
                <span>    </span>
                <label for="uname"><b>Username</b></label>
                

                <input className="password" type="password" placeholder="input here..." name="psw" ref="pass" required/>
                <span>     </span>
                <label for="psw"><b>Password</b></label>

                <input className="password" type="number" placeholder="input here..." name="telpon" ref="telp" required/>
                <span>     </span>
                <label for="telpon"><b>Phone number</b></label>

                <br/>

                <button className="submitlogin" type="submit" onClick={()=>{this.submit(this.refs)}}>Register</button>

                <p>{this.state.noticewrong}</p>

                <br/>
                <br/>
                <br/>

            </div>
        )
    }
}



export default Register