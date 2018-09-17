import React, { Component } from 'react';
import './App.css';
import Home from './Page/home'
import Brand from './Page/brand'
import Loginpage from './Page/Loginpage';
import Registerpage from './Page/Registerpage'
import Shoppingcart from './Page/Shoppingcart'

import { Link, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'C:/Users/Dell/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
import reducer from './reducer';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux'
import Invoice from './komponen/invoice';
import Admin from './komponen/admin';
import Categories from './komponen/Categories';
import adminDetails from './komponen/adminDetails'
import adminProd from './komponen/adminProd';
import adminCategory from './komponen/adminCategory';
import adminInvoice from './komponen/adminInvoice';


// import product1 from './komponen/product1';



class App extends Component {
  render() {
    const store = createStore(reducer,{},applyMiddleware(ReduxThunk))
    return(
      <Provider store = {store}>
      <div>
          <Route exact path="/" component={Home}/> 
          <Route path="/brands" component={Brand}/> 
          <Route path="/Loginpage" component={Loginpage}/>
          <Route path="/Registerpage" component={Registerpage}/>
          <Route path="/Shoppingcart" component={Shoppingcart}/>
          <Route path="/invoice" component={Invoice}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/Categories" component={Categories}/>
          <Route path="/adminDetails" component={adminDetails}/>
          <Route path="/adminProduct" component={adminProd}/>
          <Route path="/adminCategory" component={adminCategory}/>
          <Route path="/adminInvoice" component={adminInvoice}/>


      </div>
      </Provider>
    );
  }
}

export default App;
  