import React, { Component } from 'react';
import '../../src/App.css';
import { Link, Route } from 'react-router-dom';

class Footer extends Component{
    render(){
        return(

        <footer className="site-footer">
            <div className="bottom">
              <div className="container">
                <div className="row">
        
                  <div className="col-lg-6 col-xs-12 text-lg-left text-center">
                    <p className="copyright-text">
                      © Kikipipi.sw // <br/><small id="dev" >dev by:Richardson Jayaputra</small>
                    </p>
                    <div className="credits">
                      <a href=""></a>
                    </div>
                  </div>
        
                  <div className="col-lg-6 col-xs-12 text-lg-right text-center">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link to="/"><a>Home</a></Link>
                      </li>
        
                      <li className="list-inline-item">
                        <a href="#about">Article</a>
                      </li>
        
                      <li className="list-inline-item">
                        <Link to="/brands"><a>Brands</a></Link>
                      </li>
        
                      <li className="list-inline-item">
                        <a href="#contact">Contact Us</a>
                      </li>
                    </ul>
                  </div>
        
                </div>
              </div>
            </div>
          </footer>
        )
    }
}

export default Footer