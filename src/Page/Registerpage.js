import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Header from '../komponen/navbar'

import Footer from '../komponen/footer';
import Register from '../komponen/Register';

class Registerpage extends Component{

    render(){
        
        return(

            <div>
                <Header/>
                <Register/>
                <Footer/>

            </div>
        )
    }
}

export default Registerpage