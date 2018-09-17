import React, { Component } from 'react';
import { Link, Route , Redirect} from 'react-router-dom';
import '../../src/App.css';
import axios from 'axios'

import HeaderAdmin from './adminNavbar'

import {connect} from 'react-redux'



class adminDetails extends Component{
    securityAdmin(){
        if(this.props.admin === 0){
            this.setState({redirect_admin: true})
            return(
                alert('this is the admin page, please login if you are the admin')
            )
        }
    }

    render(){
        return (
            <div>
            {this.securityAdmin()}

                <HeaderAdmin/>
                <br/>
                <br/>

            <center>
                <Link to="/adminProduct"><h3>Product</h3></Link>
                <br/>
                <Link to="/adminCategory"><h3>Category</h3></Link>
                <br/>
                <Link to="/adminInvoice"><h3>Invoice</h3></Link>

            </center>
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


export default connect (mapStateToProps) (adminDetails)