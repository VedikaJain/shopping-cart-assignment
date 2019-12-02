import React from 'react';
import './App.scss';
import Nav from './Nav/Nav';
import Hr from './Common/Widgets/HorizontalRow/Hr';
import {
  BrowserRouter,
  Switch, Route
} from "react-router-dom";
import Home from './Home/Home';
import Plp from './Plp/Plp';
import Login from './Login/Login';
import Register from './Register/Register';

function App() {
  let items = 0;
  return (
    <BrowserRouter>
      <div className="App">
        <Nav cartItems={items}></Nav>
        <Hr type="blue" />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/plp/:selectedCategory?" component={Plp}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
