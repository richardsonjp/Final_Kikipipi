import React, { Component } from 'react';
import '../../src/App.css';
import {connect} from 'react-redux'

import { Link, Route } from 'react-router-dom';



import axios from 'axios'


class Products extends Component{
state={
  mappings:[]
}


  componentDidMount(){
    axios.get('http://localhost:3210/product/1')
    .then((x)=>{
      this.setState({mappings: x.data})
      console.log(this.state.mappings)
    })
  }
  buynow(x){

    axios.post('http://localhost:3210/cart',
    { 
      nama_product: x.namaprod.value,
      quantity: x.quantity.value,
      total_harga: x.price.value*x.quantity.value,
      user_id: this.props.id_user,
      status: '@cart',
      product_id: x.idprods.value
    },
  )
      .then((x)=>{
      alert("added to cart")
    })
    
  }
    render(){
        return(
          <div>
          {/* <div className="col-lg-3">
              <figure className="card card-product">
                <Link to='/product/${id}'><div className="img-wrap"><img src="./img/adidascard1"/></div></Link>
                <figcaption className="info-wrap">
                    <h4 className="title">{this.state.mappings.nama_product}</h4>
                    <p className="desc">this.state.mappings.description</p>
                    <div className="rating-wrap">
                      <div className="label-rating">only <strong></strong> kicks left</div>
                      <input className="quantity pull-right" type="number" placeholder="0" ref="quantity" min="0" required/>

                      
                      <input className="text" ref="idprods" type="hidden" value={id}/>
                      <input className="text" ref="namaprod" type="hidden" value={namaproduk}/>
                      <input className="text" ref="price" type="hidden" value={price}/>


                    </div>
                </figcaption>
                <div className="bottom-wrap">
                  <a href="" className="btn btn-sm btn-primary float-right" onClick={()=>{this.buynow(this.refs)}}>Order Now</a>	
                  <div className="price-wrap h5">
                    <span className="price-new">$</span>
                  </div>
                </div>
              </figure>
            </div> */}
            
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

export default connect (mapStateToProps) (Products)
