import React, { Component } from 'react';
import { Link, Route , Redirect} from 'react-router-dom';
import '../../src/App.css';
import axios from 'axios'

import HeaderAdmin from './adminNavbar'

import {connect} from 'react-redux'



class adminInvoice extends Component{
    state = {
        redirect_admin: false,
        mappings:[],
        categoryTypes:[],
        test: 'test',
        invoiceDetail:[],
        invoiceBy:[],
        radioBy:[]
        
    }

    componentDidMount(){
        this.showBy()
    }

    showBy(){
        axios.get('http://localhost:3210/forRadioInv')
        .then((x)=>{
            this.setState({radioBy: x.data})
        })
    }

    securityAdmin(){
        if(this.props.admin === 0){
            this.setState({redirect_admin: true})
            return(
                alert('this is the admin page, please login if you are the admin')
            )
        }
    }


    submitDates(){

        if(this.refs.monthPick.value === "0" && this.refs.yearPick.value === "0"){
            axios.post('http://localhost:3210/invoice/dates/day',
        {
            day: this.refs.dayPick.value
        })
        .then((x)=>{
            this.setState({invoiceDetail: x.data})
            })
        }

        else if(this.refs.dayPick.value === "0" && this.refs.yearPick.value ==="0"){
            axios.post('http://localhost:3210/invoice/dates/month',
        {
            month: this.refs.monthPick.value,
        })
        .then((x)=>{
            this.setState({invoiceDetail: x.data})
            })
        }

        else if(this.refs.monthPick.value === "0" && this.refs.dayPick.value ==="0"){
            axios.post('http://localhost:3210/invoice/dates/year',
        {
            year: this.refs.yearPick.value,
        })
        .then((x)=>{
            this.setState({invoiceDetail: x.data})
            })
        }

        else if(this.refs.yearPick.value === "0"){
            axios.post('http://localhost:3210/invoice/dates/daymonth',
        {
            day: this.refs.dayPick.value,
            month: this.refs.monthPick.value
        })
        .then((x)=>{
            this.setState({invoiceDetail: x.data})
            })
        }

        else if(this.refs.monthPick.value === "0"){
            axios.post('http://localhost:3210/invoice/dates/dayyear',
        {
            day: this.refs.dayPick.value,
            year: this.refs.yearPick.value
        })
        .then((x)=>{
            this.setState({invoiceDetail: x.data})
            })
        }

        else if(this.refs.dayPick.value === "0"){
            axios.post('http://localhost:3210/invoice/dates/monthyear',
        {
            month: this.refs.monthPick.value,
            year: this.refs.yearPick.value
        })
        .then((x)=>{
            this.setState({invoiceDetail: x.data})
            })
        }
        else{
        axios.post('http://localhost:3210/invoice/dates',
    {
        day: this.refs.dayPick.value,
        month: this.refs.monthPick.value,
        year: this.refs.yearPick.value
    })
    .then((x)=>{
        this.setState({invoiceDetail: x.data})
        })
    }
}
    
    By=(e)=>{
        const rad = e.target.value
        this.setState({radInput: rad})
    }

    searchBy(){
        console.log(this.state.radInput)
        axios.post('http://localhost:3210/invoice/searchby',
    {
        search: this.refs.searchByInv.value,
        by: this.state.radInput
    })
    .then((x)=>{
        this.setState({invoiceDetail: x.data})
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

            const invoiceBy = this.state.invoiceDetail.map((y,index)=>{
                var inv = y.id_inv
                var prod = y.product_name
                var qty = y.quantity
                var tprice = y.total_price
                var tm = y.time
                var telp = y.no_telp
                var pembeli = y.nama_pembeli
                return(
                            <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{inv}</td>
                            <td>{prod}</td>
                            <td>{qty}</td>
                            <td>{tprice}</td>
                            <td>{tm}</td>
                            <td>{telp}</td>
                            <td>{pembeli}</td>
                            </tr>
                )
            })
     
        return (
            <div>
            {this.securityAdmin()}
            <HeaderAdmin/>

                <div class="form-group">
                <label for="day">Date</label>
                <select ref="dayPick" className="datepick" id="day">
                <option value="0">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                </select>

                <label for="month">Month</label>
                <select ref="monthPick" className="datepick" id="day">
                <option value="0">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                </select>

                <label for="year">Year</label>
                <select ref="yearPick" className="datepick" id="day">
                <option value="0">-</option>
                <option value="2018">2018</option>
                <option value="2018">2019</option>
                </select>

                <button onClick={()=>{this.submitDates(this.refs)}} >submit</button>

                </div>

                <div class="form-group">
                <input type="text" ref="searchByInv" /> 
                <button onClick={()=>{this.searchBy()}}>search by:</button>


                <td><div className="pull-right">
                <div className="custom-control custom-radio">
                <input type="radio" className="form-check-input" onChange={this.By} value="dtl.inv_id" id="type" name="type" />
                <label className="form-check-label" for="type">Invoice</label>
                <br/>
                </div>
                </div></td>

                <td><div className="pull-right">
                <div className="custom-control custom-radio">
                <input type="radio" className="form-check-input" onChange={this.By} value="dtl.product_name" id="type" name="type" />
                <label className="form-check-label" for="type">Nama Product</label>
                <br/>
                </div>
                </div></td>

                <td><div className="pull-right">
                <div className="custom-control custom-radio">
                <input type="radio" className="form-check-input" onChange={this.By} value="dt.nama_pembeli" id="type" name="type" />
                <label className="form-check-label" for="type">Nama Pembeli</label>
                <br/>
                </div>
                </div></td>

                <td><div className="pull-right">
                <div className="custom-control custom-radio">
                <input type="radio" className="form-check-input" onChange={this.By} value="dt.no_telp" id="type" name="type" />
                <label className="form-check-label" for="type">No Telp</label>
                <br/>
                </div>
                </div></td>

                </div>

                <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Date, Time</th>
                    <th scope="col">No telp</th>
                    <th scope="col">Nama Pembeli</th>

                    </tr>
                </thead>
                <tbody>
                    {invoiceBy}
                </tbody>
                </table>

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


export default connect (mapStateToProps) (adminInvoice)