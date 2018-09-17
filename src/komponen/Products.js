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
    axios.get('http://localhost:3210/product')
    .then((x)=>{
      this.setState({mappings: x.data})
      console.log(this.state.mappings)
    })
  }

  buynow(index){
    if(this.props.id_user!==0){
    axios.post('http://localhost:3210/cart',
    { 
      nama_product: this.refs["namaprod"+index].value,
      quantity: this.refs["quantity"+index].value,
      total_harga: this.refs["price"+index].value*this.refs["quantity"+index].value,
      user_id: this.props.id_user,
      status: '@cart',
      product_id: this.refs["idprods"+index].value
    },
  )
      .then((y)=>{
      alert("added to cart")
      this.refs["quantity"+index].value = ''
    })}
    else{
      alert('please login first to buy')
    }
  }
    render(){
      const produks = this.state.mappings.map((y,index)=>{
          var namaproduk = y.nama_product
          var descriptions = y.description
          var stocks = y.stock
          var price = y.harga
          var imggbr = y.img_src
          var id = y.id_product
          return(
            <div className="col-lg-3" key={index}>
              <figure className="card card-product">
                <div className="img-wrap"><img src={imggbr}/></div>
                <figcaption className="info-wrap">
                    <h4 className="title">{namaproduk}</h4>
                    {/* <p className="desc">{descriptions}</p> */}
                    <div className="rating-wrap">
                      <div className="label-rating">only <strong>{stocks}</strong> items left</div>
                      <input className="quantity pull-right" type="number" placeholder="0" ref={"quantity"+index} min="0" max={stocks} required/>

                      
                      <input className="text" ref={"idprods"+index} type="hidden" value={id}/>
                      <input className="text" ref={"namaprod"+index} type="hidden" value={namaproduk}/>
                      <input className="text" ref={"price"+index} type="hidden" value={price}/>

            
                    </div>
                </figcaption>
                <div className="bottom-wrap">
                <button type="button" class="btn btn-sm btn-primary float-right" data-toggle="modal" data-target={"#exampleModal"+index}>
  details
</button>
                  <i className="btn btn-sm btn-primary float-right" onClick={()=>{this.buynow(index)}}>Order Now</i>

<div class="modal fade" id={"exampleModal"+index} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{namaproduk}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="img-wrap"><img src={imggbr} alt={namaproduk}/></div>
      <br/>
      <p className="desc">"{descriptions}"</p>
      <div className="label-rating">only <strong>{stocks}</strong> items left</div>
      <span className="price-new float-right">${price}</span>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>



                  <div className="price-wrap h5">
                    <span className="price-new">${price}</span>
                  </div>
                </div>
              </figure>
            </div>
          )
      })
        return(
          <div>
          <div className="ProductFolio">
          <center><h2>
                  Featured Products
                </h2></center>
            </div>
          <div className="row">
          
          {produks}
          </div>
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
