import React, { Component } from 'react';
import Header from '../komponen/navbar'
import BrandsCard from '../komponen/brandscard';
import Footer from '../komponen/footer'


class Brand extends Component {
    render() {
      return (
        
        <div>

            <Header/>
            <BrandsCard/>
            <Footer/>
  
        </div>
      );
    }
  }
  
  export default Brand;