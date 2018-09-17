import React, { Component } from 'react';
import { Link, Route , Redirect} from 'react-router-dom';
import '../../src/App.css';
import axios from 'axios'

import HeaderAdmin from './adminNavbar'


import {connect} from 'react-redux'



class adminProd extends Component{
    state = {
        redirect_admin: false,
        mappings:[],
        categoryTypes:[],
        test: 'test',
        invoiceDetail:[],
        invoiceBy:[]
        
    }
    securityAdmin(){
        if(this.props.admin === 0){
            this.setState({redirect_admin: true})
            return(
                alert('this is the admin page, please login if you are the admin')
            )
        }
    }

    componentDidMount(){
        this.getProductforAdmin()
    }
    getProductforAdmin(){
    axios.get('http://localhost:3210/product')
    .then((x)=>{
      this.setState({mappings: x.data})
    //   console.log(this.state.mappings)
    })
    }

    edit(index){
        // console.log(this.refs["id"+index].value)
        axios.post('http://localhost:3210/adminProduct/'+this.refs["id"+index].value,
    {
        namaprod: this.refs["namaprod"+index].value,
        description: this.refs["desc"+index].value,
        stock: this.refs["stock"+index].value,
        harga: this.refs["harga"+index].value,
        img_src: this.refs["img"+index].value,
        category: this.refs["category"+index].value

    })
    .then((x)=>{
        console.log(x)
        if(x.data === true){
            alert('edited')
            this.getProductforAdmin()
        }
    })
    }

    addProd(x){
        // console.log(this.refs["id"+index].value)
        axios.post('http://localhost:3210/addProduct',
    {
        namaprod: x.namaprod.value,
        description: x.description.value,
        stock: x.stock.value,
        harga: x.harga.value,
        img_src: x.img.value,
        category: x.category.value
    })
    .then((x)=>{
        console.log(x)
        if(x.data === true){
            alert('added')
            this.getProductforAdmin()
            this.refs.namaprod.value = ''
            this.refs.description.value = ''    
            this.refs.stock.value = ''    
            this.refs.harga.value = ''
            this.refs.img.value = ''    
            this.refs.category.value = ''    

        }
        })
    }


    deleteProd(index){
        axios.post('http://localhost:3210/delete-product/'+this.refs["id"+index].value)
    .then((x)=>{
        alert('deleted');
        this.getProductforAdmin()
    })
    }

     render(){
        const {redirect_admin} = this.state
            if(redirect_admin){
                this.setState({redirect_admin: false});
                return(
                    <Redirect to='/admin' />
                )
            }
            
            const productDetails = this.state.mappings.map((y,index)=>{
                var idprod = y.id_product
                var namaprod = y.nama_product
                var desc = y.description
                var stock = y.stock
                var price = y.harga
                var imggbr = y.img_src
                var category = y.category
                return(
                            <tr key={index}>
                            <th scope="row"> {idprod}</th>
                            <td><textarea ref={"namaprod"+index}>{namaprod}</textarea>  </td>
                            <td><textarea ref={"desc"+index}>{desc}</textarea></td>
                            <td><textarea ref={"stock"+index} >{stock}</textarea></td>
                            <td><textarea ref={"harga"+index} >{price}</textarea></td>
                            <td><textarea ref={"img"+index}>{imggbr}</textarea></td>
                            <td><textarea ref={"category"+index}>{category}</textarea></td>

                            <td><button onClick={()=>{this.edit(index)}} >Edit</button></td>
                            <td><button onClick={()=>{this.deleteProd(index)}} >Delete</button></td>
                            
                            <input type="hidden" ref={"id"+index} value={idprod}/>
                            </tr>
                )
            })

        return (
            <div>
            {this.securityAdmin()}
            <HeaderAdmin/>
                <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama Produk</th>
                    <th scope="col">Description</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Harga</th>
                    <th scope="col">IMG</th>
                    <th scope="col">Category</th>

                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {productDetails}
                </tbody>
                </table>
     <br/>
     <br/>
     <br/>
                <h3>Add Product:</h3>
                <input type="text" placeholder="nama produk" ref="namaprod" />
                <br/>
                <textarea ref="description">description here....  </textarea>
                <br/>
                <input type="number" placeholder="stock" ref="stock" />
                <br/>
                <input type="number" placeholder="harga" ref="harga" />
                <br/>
                <input type="text" placeholder="path: ??" ref="img" />
                <br/>
                <input type="text" placeholder="category" ref="category" />
                <br/>
                <button type="submit" onClick={()=>{this.addProd(this.refs)}} >submit</button>

               
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    const admin = state.admin;
    return{
        admin
    }
  }


export default connect (mapStateToProps) (adminProd)