import React, { Component } from 'react';
import '../../src/App.css';
import axios from 'axios'
import Header from '../komponen/navbar'

import {connect} from 'react-redux'


class Categories extends Component{
    state={
        mappings:[],
        mappingCategory:[]
    }
    componentDidMount(){
        this.getCategories()
      }

      getList() {
        return [5,7];
      }


      getCategories(){
        axios.get('http://localhost:3210/category')
        .then((x)=>{
          this.setState({mappingCategory: x.data})
        })
      }

      buynow(index){
        if(this.props.id_user!==0)
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
        })
        else{
          alert('please login first to buy')
        }
      }

      getTypes(index){
        axios.post('http://localhost:3210/categories/'+this.refs["type"+index].value,)
        .then((x)=>{
            this.setState({mappings: x.data})
            console.log(x.data)
        })
    }


    render(){
      // console.log(this.state.mappings)
        const produks = this.state.mappings.map((y,index)=>{
            var namaproduk = y.nama_product
            var descriptions = y.description
            var stocks = y.stock
            var price = y.harga
            var imggbr = y.img_src
            var id = y.id_product
            return(
              <div className="col-md-3" key={index}>
                <figure className="card card-product">
                  <div className="img-wrap"><img src={imggbr}/></div>
                  <figcaption className="info-wrap">
                      <h4 className="title">{namaproduk}</h4>
                      <p className="desc">{descriptions}</p>
                      <div className="rating-wrap">
                        <div className="label-rating">only <strong>{stocks}</strong> items left</div>
                        <input className="quantity pull-right" type="number" placeholder="0" ref={"quantity"+index} min="0" max={stocks} required/>
  
                        
                        <input className="text" ref={"idprods"+index} type="hidden" value={id}/>
                        <input className="text" ref={"namaprod"+index} type="hidden" value={namaproduk}/>
                        <input className="text" ref={"price"+index} type="hidden" value={price}/>
  
              
                      </div>
                  </figcaption>
                  <div className="bottom-wrap">
                    <i className="btn btn-sm btn-primary float-right" onClick={()=>{this.buynow(index)}}>Order Now</i>	
                    <div className="price-wrap h5">
                      <span className="price-new">${price}</span>
                    </div>
                  </div>
                </figure>
              </div>
            )
        })

        const categoriesCheck = this.state.mappingCategory.map((y,index)=>{
            var checkCategory = y.id
            var types = y.types
        return(
            <td><div className="pull-right">
            <div className="custom-control custom-radio">
            <input type="radio" onClick={()=>{this.getTypes(index)}} className="form-check-input" ref={"type"+index} value={checkCategory} id="type" name="type" />
            <label className="form-check-label" for="type">{types}</label>
            <br/>
            </div>
            </div></td>
        )
    })
    return(
        <div>
            <Header/>
            <table className="table table-bordered">
            <tbody>
            <tr>
            <div className="row">
            {categoriesCheck}
            </div></tr>
            </tbody></table>


            <div className="row">
            {produks}
            </div>
        </div>
    )}
}

const mapStateToProps = (state) =>{
    const id_user = state.iduser;
    return{
        id_user
    }
  }

export default connect (mapStateToProps) (Categories)
