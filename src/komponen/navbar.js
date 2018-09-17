import React, { Component } from 'react';
import '../../src/App.css';

import Home from '../Page/home'
import Brand from '../Page/brand'
import { Link, Route, Redirect } from 'react-router-dom';

import Popup from "reactjs-popup";

import Fade from 'react-reveal/Fade';
import {connect} from 'react-redux'
// import {id_user} from '../action'



class Header extends Component{
    state={
        loginstate:<a id="sign-in"><Link to="/Loginpage"><i className="fa fa-sign-in"></i></Link></a>
    }
    componentWillMount(){
        if(this.props.id_user > 0){
            this.setState({loginstate:<a id="sign-in" href="" ><i className="fa fa-sign-out" ></i></a>})
        }
        // if(this.props.id_user > 0){
        //     this.setState({redirect_home: true})
        // }
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

        <div id="logo" className="pull-left"><Link to ="/">
            <img src="img/kipilogo.png" alt="" title="home" /></Link>
            <h1><a href="#hero"></a></h1>
        </div>

        <nav id="nav-menu-container">
            <ul className="nav-menu">
            <li><Link to="/brands">Brands</Link></li>
            <li className="dropdown"><Link to="/categories">Categories</Link></li>
            <li><a href="#contact">Contact Us</a></li>
            <nav className="nav social-nav pull-right d-none d-lg-inline">

                    <a id="cart" title="shopping cart">
                    <Link to="/Shoppingcart">
                    <i className="fa fa-shopping-cart"></i>
                    </Link>
                    </a>
                    <Link to="/Shoppingcart">
                    <a id="numcart" title="" ><border id="cartout"><h5> </h5></border></a>
                    </Link>


                    <a id="ig-icon" title="instagram" href="https://www.instagram.com" target="_blank"><i className="fa fa-instagram" ></i></a> 
                    <a id="email-icon" title="email us"><i className="fa fa-envelope" ></i></a> 
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
    const id_user = state.iduser;
    return{
        id_user
    }
  }
  

export default connect (mapStateToProps) (Header)

