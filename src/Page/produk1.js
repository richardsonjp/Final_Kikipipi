import React, { Component } from 'react';
import '../../src/App.css';

import Header from '../komponen/navbar'
// import Produknmd from '../komponen/produknmd'
import Footer from '../komponen/footer'


class produk1 extends Component{
    render(){
        return(
            <div>

            <Header/>
            {/* <Produknmd/> */}
            <Footer/>

            </div>
        )
    }
}

export default produk1