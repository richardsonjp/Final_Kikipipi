import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Header from '../komponen/navbar'
import Footer from '../komponen/footer';
import Login from '../komponen/Login';

class Loginpage extends Component{

    render(){
        
        return(

            <div>
                <Header/>
                <Login/>
                <Footer/>

            </div>
        )
    }
}

export default Loginpage