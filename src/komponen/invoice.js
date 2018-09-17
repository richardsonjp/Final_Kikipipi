import React, { Component } from 'react';
import '../../src/App.css';
import { connect } from 'react-redux';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Header from './navbar'

class Invoice extends Component{
state=
    {   
        mappingdata:[],
        mappingdetail:[],
        mapTime:[]
    
    }

    componentDidMount(){
        axios.get('http://localhost:3210/invoice-data/'+this.props.invoice)
        .then((x)=>{
            console.log(this.props.invoice)
            this.setState({mappingdata: x.data})
            console.log(x)
        })
        
        axios.get('http://localhost:3210/invoice-detail/'+this.props.invoice)
        .then((x)=>{
            this.setState({mappingdetail: x.data})
            this.setState({date: x.data})
            console.log(x.data)
        })
        axios.get('http://localhost:3210/invoice-tgl/'+this.props.invoice)
        .then((x)=>{
            this.setState({mapTime: x.data})
            console.log({time: x.data})
        })
    }
    // getInvoice(){
    //     axios.get('http//localhost:3210/allinvoice/'+this.props.invoice)
    //     .then((x)=>{
    //         console.log(x.data);
    //         this.setState({mappingInvoice: x.data})
    //     })
    // }


    render(){
        const invoice_data = this.state.mappingdata.map((x,index)=>{
            var nama_pembeli = x.nama_pembeli
            var ids = x.ids_user
            var telp = x.no_telp
            return(
                <div className="col-xl-12 col-lg-12">
                    <div className="card  height">
                        <div className="card-header"><h3>Billing Details</h3></div>
                        <div className="card-block">
                            <strong>Buyer: {nama_pembeli}</strong><br/>
                            <strong>Phone: {telp}</strong><br/>
                        </div>
                    </div>
                </div>
            )
        })
        const invoice_detail = this.state.mappingdetail.map((x,index)=>{
            var item_name = x.product_name
            var quantity = x.quantity
            var price_item = x.total_price
            var item = x.total_price/x.quantity
        
            return(
            <tr>
                <td>{item_name}</td>
                <td className="text-xs-center">{item}</td>
                <td className="text-xs-center">{quantity}</td>
                <td className="text-xs-right">{price_item}</td>
            </tr>
                )
            })
            var totalbill = 0
            for(var i=0;i<this.state.mappingdetail.length;i++){
                totalbill=this.state.mappingdetail[i].total_price + totalbill
            }
        
        const invoice_time = this.state.mapTime.map((x,index)=>{
            var tanggal = x.time.slice(0,10)
            var waktu = x.time.slice(11,19)
            
            
            return(
            <div className="row">
                <div className="col-xl-3">
                    <div className="text-xs-center">
                        <i className="fa fa-search-plus float-xs-left icon"></i>
                        <h2>#{this.props.invoice}</h2>
                        <p><strong>Date of purchase: <br/> </strong> <small>(yyyy-mm-dd)</small> <br/> {tanggal} <br/> <strong> Time: <br/> <small>(hh:mm:ss)</small> </strong> <br/> {waktu} </p>
                    </div>
                    <hr/>
                    <div className="row">
                    {invoice_data}
                    </div>
                </div>
            </div>
            )
            })

        return(
            <div>
            <Header/>
             
             <div className="container">
    {invoice_time}
    <div className="row">
        <div className="col-md-12">
            <div className="card ">
                <div className="card-header">
                    <h3 className="text-xs-center"><strong>Order summary</strong></h3>
                </div>
                <div className="card-block">
                    <div className="table-responsive">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <td><strong>Item Name</strong></td>
                                    <td className="text-xs-center"><strong>Item Price</strong></td>
                                    <td className="text-xs-center"><strong>Item Quantity</strong></td>
                                    <td className="text-xs-right"><strong>Total</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice_detail}
                                <tr>
                                    <td className="highrow"></td>
                                    <td className="highrow"></td>
                                    <td className="highrow text-xs-center"><strong>Total</strong></td>
                                    <td className="highrow text-xs-right">${totalbill}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    const invoice = state.invoice
    const id_user = state.iduser
    return{
        invoice,
        id_user
    }
  }
  

export default connect (mapStateToProps) (Invoice)