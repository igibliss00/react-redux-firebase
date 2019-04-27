import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Profile from './components/user/Profile';
import CreateItem from './components/item/CreateItem';
import ItemDetail from './components/item/ItemDetail';
import Navbar from './components/layout/Navbar';
import MarkerMap from './components/map/MarkerMap';
import Checkout from './components/booking/Checkout';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  render() {

    library.add(faStar);

    return (
      <BrowserRouter>
        <div className="App">
        <Navbar />
         <Switch>
           <Route path='/' exact component={Landing} />
           <Route path='/signup' exact component={SignUp} />
           <Route path='/signin' exact component={SignIn} />
           <Route path='/profile' exact component={Profile} />
           <Route path='/item/create' exact component={CreateItem} />
           <Route path='/item/itemdetail/:id' exact component={ItemDetail} />
           <Route path='/map' exact component={MarkerMap} />
           <Route path='/checkout/:id/:type' component={Checkout} />
         </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
