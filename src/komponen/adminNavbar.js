import React, { Component } from 'react';
import '../../src/App.css';

import Home from '../Page/home'
import Brand from '../Page/brand'
import { Link, Route, Redirect } from 'react-router-dom';

import Popup from "reactjs-popup";

import Fade from 'react-reveal/Fade';
import {connect} from 'react-redux'
// import {id_user} from '../action'



class HeaderAdmin extends Component{
    state={
        loginstate:<a id="sign-inadmin"><Link to="/admin"><i className="fa fa-sign-in"></i></Link></a>
    }
    componentWillMount(){
        if(this.props.admin > 0){
            this.setState({loginstate:<a id="sign-inadmin" href="/admin" ><i className="fa fa-sign-out" ></i></a>})
        }
    }
    
    render() {
        const {redirect_home} = this.state

        if(redirect_home){
            this.setState({redirect_home: false});
            return(
                <Redirect to='/'/>
            )
        }
    return (
    <div>
        <Fade>
        <header id="header">
        <div className="container">

        <a href="/"><div id="logo" className="pull-left">
            <img src="img/kipilogo.png" alt="" title="home" />
            <h1><a href="/"></a></h1>
        </div></a>

        <nav id="nav-menu-container">
            <ul className="nav-menu">
            <li><Link to="/adminProduct">Product Details</Link></li>
            <li className="dropdown"><Link to="/adminCategory">Category Details</Link></li>
            <li><Link to="/adminInvoice">Invoices</Link></li>
            <nav className="nav social-nav pull-right d-none d-lg-inline">

                    {this.state.loginstate}
                </nav>
            </ul>
        </nav>
        
        </div>
        </header>
        </Fade>

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

  

export default connect (mapStateToProps) (HeaderAdmin)