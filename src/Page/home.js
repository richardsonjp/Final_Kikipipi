import React, { Component } from 'react';
import Hero from '../komponen/hero'
import Header from '../komponen/navbar'
import Article from '../komponen/Article'
import VideoYT from '../komponen/videoiframe'
// import BrandsCard from '../komponen/brandscard'
import Contacts from '../komponen/contacts'
import Footer from '../komponen/footer'
import Products from '../komponen/Products';


class home extends Component {
    render() {
      return (
        <div>
      
            <Hero/>
            <Header/>
            <Article/>
            <VideoYT/>
            <Products/>
            <Contacts/>
            <Footer/>
  
        </div>
      );
    }
  }
  
  export default home;

