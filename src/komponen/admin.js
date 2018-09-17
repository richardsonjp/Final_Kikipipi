import React, { Component } from 'react';
import { Link, Route , Redirect} from 'react-router-dom';
import '../../src/App.css';
import axios from 'axios'

import HeaderAdmin from './adminNavbar'

import {connect} from 'react-redux'
import {adminId} from '../action'

import Headshake from 'react-reveal/HeadShake'


class Admin extends Component{

    state = [
        {username:[],
        password:[],
        noticewrong: "",
        id: 0,
        redirect_adminEdit:false
        }    
    ]

    admins = (x) =>{
        this.props.adminId(x)
    }

    submitadmin(x){
        axios.post('http://localhost:3210/loginAdmin',
        {
            username: x.users.value,
            password: x.pass.value
        })
        .then((x)=>{
            if (x.data.loginstatus === true){
                console.log(x.data)
                var adminId = x.data.result[0].no
                {this.admins(adminId)}
                this.setState({redirect_adminEdit: true})
            }
            else{
                this.setState({noticewrong:<Headshake><p className="noticement"><b>Username or Password not registered!</b></p></Headshake>})
            }
        })
    }
    render(){
        const {redirect_adminEdit} = this.state

        if(redirect_adminEdit){
            this.setState({redirect_adminEdit: false});
            return(
                <Redirect to='/adminDetails'/>
            )
        }
        return (
            
            <div className="loginregister">
                <HeaderAdmin/>
                
                <h2 id="login">ADMIN LOGIN</h2>
                <input className="username" type="text" placeholder="input here..." name="uname" ref="users" required/>
                <span>    </span>
                <label for="uname"><b>Username</b></label>

                <br/>

                <input className="password" type="password" placeholder="input here..." name="psw" ref="pass" required/>
                <span>     </span>
                <label for="psw"><b>Password</b></label>

                <br/>
                <button className="submitlogin"  onClick={()=>{this.submitadmin(this.refs)}}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    const admin = state.admin;
    return{
        admin
    }
  }


export default connect (mapStateToProps,{adminId}) (Admin)