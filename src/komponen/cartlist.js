import React, { Component } from 'react';
import '../../src/App.css';
import { connect } from 'react-redux';
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import {inv} from '../action'

class Cartlist extends Component{
state={ mapping: [],
        invmap:[],
        namaProduk:'',
        quantity:'',
        hargaProd:0,
        status:'',
        idprod:'',
        show_bill:'',
        redirect_invoice:false,
        redirect_cart:false,
        redirect_login:false
    }
    
    securityLogin(){
        if(this.props.id_user === 0){
            this.setState({redirect_login: true})
            return(
                alert('please login first to access this page')
            )
        }
    }
    componentDidMount(){
    this.cartshop()
    this.getHistory()
    }
    cartshop = () => {
        axios.get('http://localhost:3210/cart/'+this.props.id_user)
        .then((x)=>{
            console.log("masuk then cartshop")
        this.setState({mapping: x.data})
            })
        }
    parseInv = (x) =>{
        this.props.inv(x)
    }

    checkout(){
        axios.post('http://localhost:3210/checkout',
    {
        id_user: this.props.id_user
    })
    .then((x)=>{
        if(x.data.length>0){
        alert('Dear customer, you will be directed to the invoice page, please check carefully if there\'s some wrong calculation')
        alert('Please do not press back to your previous page, and press our home button in the navbar')
        console.log(x.data)
        var inv = x.data
        {this.parseInv(inv)}
        this.setState({redirect_invoice:true})
            }}
        )
    }

    getHistory(){
        axios.get('http://localhost:3210/invoicehistory/'+this.props.id_user)
        .then((x)=>{
            this.setState({invmap: x.data})
        })
    }

    cancel = (x) =>{
    axios.post('http://localhost:3210/cart/cancel',
    {
        id_user: this.props.id_user,
        id_cart: x
    })
    .then((x)=>{
        console.log("masuk then");
        this.cartshop()
        })
    }

    toInv(inv){
    this.parseInv(inv)
    this.setState({redirect_invoice:true})        
    }

    render(){
        const cartcard = this.state.mapping.map((y,index)=>{
        var nama = y.nama2_product
        var qty = y.quantity
        var harga = y.total_harga
        var itemprice = y.total_harga/y.quantity
        var status = y.status
        var idcart = y.id_cart
            return(
                <tr key={index}>
                    <td data-th="Product">
                        <div className="row">
                            <div className="col-sm-2 hidden-xs"><img src="/" alt="..." className="img-responsive"/></div>
                            <div className="col-sm-10">
                                <h4 className="nomargin">{nama}</h4>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">${itemprice}</td>
                    <td data-th="Quantity">
                        <input type="number" className="form-control text-center" value={qty}/>
                    </td>
                    <td data-th="Subtotal" className="text-center">${harga}</td>
                    <td className="actions" data-th="">
                        {/* <button className="btn btn-info btn-sm" onClick={()=>{this.update(idcart,index)}} ><i className="fa fa-refresh"></i></button> */}
                        <button className="btn btn-danger btn-sm" onClick={()=>{this.cancel(idcart)}} ><i className="fa fa-trash-o"></i></button>								
                    </td>
                </tr>
                )
            })
{/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
        const invoicehistory = this.state.invmap.map((y,index)=>{
            var inv = y.inv_id
            var prod = y.product_name
            var price = y.total_price
            var time = y.time
            return(
                    <tr key={index}>
                    <th scope="row"><button className="linkto" data-dismiss="modal" onClick={()=>{this.toInv(inv)}}>{inv}</button></th>
                    <td>{prod}</td>
                    <td>{price}</td>
                    <td>{time}</td>
                    </tr>
            )
        })
            
            var totalbill=0
            for (var i=0;i<this.state.mapping.length;i++){
                totalbill=this.state.mapping[i].total_harga + totalbill
            }
            var show_bill=''
            if(totalbill>0){
                show_bill='Your total cost is $'
            }
            
            const {redirect_login} = this.state
            if(redirect_login){
                this.setState({redirect_login: false});
                return(
                    <Redirect to='/Loginpage' />
                )
            }
            const {redirect_invoice} = this.state
            if(redirect_invoice){
                this.setState({redirect_invoice: false});
                return(
                    <Redirect to='/invoice' />
                )
            }
            const {redirect_cart} = this.state
            if(redirect_cart){
                this.setState({redirect_cart: false});
                return(
                    <Redirect to='/Shoppingcart' />
                )
            }
           
        return(
            <div>
                {this.securityLogin()}
                <center>
                <h1>
                {this.props.display}'s Cart list: 
                </h1>
                </center>

                <button className="invhistory btn btn-primary btn-sm pull-right" data-toggle="modal" data-target=".bd-example-modal-lg">History Transaction ></button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-content modal-dialog modal-lg">
                
                <center><h3>History Transactions</h3></center>
                    <div class="modal-content">
                    <table class="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">Invoice</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {invoicehistory}
                </tbody>
                </table>
                    </div>
                </div>
                </div>


                <div className="container">
	<table id="cart" className="table table-hover table-condensed">
    				<thead>
						<tr>
							<th className="table1">Product</th>
							<th className="table1">Price</th>
							<th className="table1">Quantity</th>
							<th className="table1" className="text-center">Subtotal</th>
							<th className="table1"></th>
						</tr>
					</thead>
					<tbody>
                    {cartcard}

					</tbody>
					<tfoot>
						<tr className="visible-xs">
							<td className="text-center"><strong>{show_bill}{totalbill}</strong></td>
						</tr>
						<tr>
							<td><Link to="/categories"><a href="#" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</a></Link></td>
							<td colspan="2" className="hidden-xs"></td>
							<td className="hidden-xs text-center"><strong>Total ${totalbill}</strong></td>
							<td><a href="#" className="btn btn-success btn-block" onClick={()=>{this.checkout()}}>Checkout <i className="fa fa-angle-right"></i></a></td>
						</tr>
					</tfoot>
				</table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    const display = state.displaylogin;
    const id_user = state.iduser
    return{
        display,
        id_user
    }
  }
  

export default connect (mapStateToProps,{inv}) (Cartlist)