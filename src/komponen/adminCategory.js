import React, { Component } from 'react';
import { Link, Route , Redirect} from 'react-router-dom';
import '../../src/App.css';
import axios from 'axios'

import HeaderAdmin from './adminNavbar'


import {connect} from 'react-redux'



class adminCategory extends Component{
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
        this.getCategoriesforAdmin()
    }

    getCategoriesforAdmin(){
        axios.get('http://localhost:3210/category')
        .then((x)=>{
          this.setState({categoryTypes: x.data})
        //   console.log(this.state.mappings)
        })
        }

    editTypes(index){
        console.log(this.refs["idtype"+index.value])
        axios.post('http://localhost:3210/adminCategory/'+this.refs["idtype"+index].value,
    {
        types: this.refs["types"+index].value
    })
        .then((x)=>{
            alert('edited')
            this.getCategoriesforAdmin()
        })
    }

    addTypes(x){
        axios.post('http://localhost:3210/addType',
    {
        types: x.types.value
    })
    .then((x)=>{
        console.log(x)
        if(x.data === true){
            alert('added')
            this.getCategoriesforAdmin()
            this.refs.types.value = ''    
        }
        })
    }
    deleteTypes(index){
        axios.post('http://localhost:3210/delete-type/'+this.refs["idtype"+index].value)
        .then((x)=>{
            alert('deleted')
            this.getCategoriesforAdmin()
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
            

            const categoryDetails = this.state.categoryTypes.map((y,index)=>{
                var types = y.types
                var idtype = y.id
                return(
                    <tr key={index}>
                            <th scope="row" > {idtype}</th>
                            <td><textarea ref={"types"+index}>{types}</textarea></td>

                            <td><button onClick={()=>{this.editTypes(index)}} >Edit</button></td>
                            <td><button onClick={()=>{this.deleteTypes(index)}} >Delete</button></td>

                            <input type="hidden" ref={"idtype"+index} value={idtype}/>
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
                    <th scope="col">Types of Category</th>

                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {categoryDetails}
                </tbody>
                </table>



                <h3>Add Categories:</h3>
                <input type="text" placeholder="types" ref="types" />
                <br/>
                <button type="submit" onClick={()=>{this.addTypes(this.refs)}} >submit</button>

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


export default connect (mapStateToProps) (adminCategory)