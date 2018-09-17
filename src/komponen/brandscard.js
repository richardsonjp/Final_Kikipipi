import React, { Component } from 'react';
import '../../src/App.css';

import { Link, Route } from 'react-router-dom';
import Fade from 'react-reveal/Fade';


class BrandsCard extends Component{
    render(){
        return(

            <div className="portfolio" id="portfolio">
            <div className="container">
              <h2>
                  Featured Brands
                </h2>
            </div>
          
          
            <div className="portfolio-grid">
              <div className="row">
              <Fade bottom>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="" className="card" src="img/adidascard1.jpg" height="280px" width="100%"/>
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                           <img className="tile "src="./img/adidas-logo2.png" width="80%"/>
                          </h3>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                </Fade>
        
                <Fade bottom>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="" className="card" src="img/nikeair.jpg" height="280px" width="100%"/>
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                            <img className="tile "src="./img/nike.png" width="80%"/>
                          </h3>
                        </div>
                      </div></a>
                  </div>
                </div>
                </Fade>

                <Fade bottom>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="" className="card" src="img/vanscard.jpg" height="280px" width="100%"/>
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                            <img className="tile "src="./img/vans.png" width="80%"/>
                          </h3>
                        </div>
                      </div></a>
                  </div>
                </div>
                </Fade>


                <Fade bottom>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="" className="card" src="img/jordancard.jpg" height="280px" width="100%"/>
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                            <img className="tile "src="./img/airjordan.png" width="80%"/>
                          </h3>
                        </div>
                      </div></a>
                  </div>
                </div>
                </Fade>
              </div>

        
              <div className="row">
              <Fade top>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="" className="card" src="img/Brand-Off-White.jpg" height="280px" width="100%"/>
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                            <img className="tile "src="./img/offwhite.png" width="70%"/>
                          </h3>
                        </div>
                      </div></a>
                  </div>
                </div>
                </Fade>

                <Fade top>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="" className="card" src="img/bapecard.jpg" height="280px" width="100%" />
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                            <img className="tile "src="./img/bape.png" width="70%"/>
                          </h3>
                        </div>
                      </div></a>
                  </div>
                </div>
                </Fade>


                <Fade top>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="undftd" className="card" src="img/undftdcard.png" height="280px" width="100%"/>
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                            <img className="tile "src="./img/undftd.png" alt="undftd" width="80%"/>
                          </h3>
                        </div>
                      </div></a>
                  </div>
                </div>
                </Fade>

                <Fade top>
                <div className="col-lg-3 col-sm-6 col-xs-12">
                  <div className="card">
                    <a href="#"><img alt="" className="card" src="img/championcard.jpg" height="280px" width="100%"/>
                      <div className="portfolio-over">
                        <div>
                          <h3 className="card-title">
                            <img className="tile "src="./img/champion-logo.png" width="80%"/>
                          </h3>
                        </div>
                      </div></a>
                  </div>
                </div>
                </Fade>
              </div>
            </div>
          </div>
        )
    }
}

export default BrandsCard


