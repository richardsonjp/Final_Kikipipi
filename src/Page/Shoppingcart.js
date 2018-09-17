import React, { Component } from 'react';
import '../../src/App.css';

import Header from '../komponen/navbar'
import Cartlist from '../komponen/cartlist'
import Footer from '../komponen/footer'


class produk1 extends Component{
    render(){
        return(
            <div>

            <Header/>
            <Cartlist/>
            <Footer/>

            </div>
        )
    }
}

export default produk1