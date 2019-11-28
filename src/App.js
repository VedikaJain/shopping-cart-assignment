import React from 'react';
import './App.scss';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Hr from './Common/Widgets/HorizontalRow/Hr';

function App() {
  let items=0;
  return (
    <div className="App">
      <Nav cartItems={items}></Nav>
      <Hr type="blue"/>
      <Home/>
    </div>
  );
}

export default App;
