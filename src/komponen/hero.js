import React, { Component } from 'react';
import '../../src/App.css';
import Link from 'react-router-dom/Link';


import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';

class Hero extends Component{
  state={
    messages:''
  }
    render() {
      var namesDisplay = this.props.display
      const messages = message()
      const hilang = hapus()
      function message(){
      if(namesDisplay===''){
        return(
          <p></p>
        )
      }
      else{
        return(
          <h1>Welcome to Kikipipi</h1>
        )
      }}

      function hapus(){
        if(namesDisplay===''){
          return(
            <h1>Personalise your streets</h1>
          )
        }
        else{
          return(
            <h1></h1>
          )
        }}
        return (
    <div className="hero">
    <div className="container">
      <div className="row"  >
      <Fade>
        <div className="col-md-12">
          <a className="hero-brand" title="kikipipi"><Link to="/"><img alt="Kikipipi Logo" src="img/kipilogo.png" width="10%" height="10%"/></Link></a>
        </div>
      </Fade>
      </div>

      <div className="texthome">
        <Fade><h1>
            {messages} {this.props.display}
            <br/>
            {hilang}
          </h1></Fade>
        
        <Fade>
        <p className="tagline">
          Order now!
        </p>
        </Fade>
      </div>
    </div>
  </div>
        )
    }
}

const mapStateToProps = (state) =>{
  const display = state.displaylogin;
  return{
      display
  }
}


export default connect (mapStateToProps) (Hero)

// export default Hero