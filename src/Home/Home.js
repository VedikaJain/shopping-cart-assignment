import React from 'react';
import './Home.scss';
import Category from '../Common/Widgets/Category/Category';
import Carousel from '../Common/Widgets/Carousel/Carousel';
import Hr from '../Common/Widgets/HorizontalRow/Hr';

function Home() {
  const categories = ['one', 'two', 'three'];
  return (
    <div className="Home">
      <Carousel/>
      <Hr type="grey" />
      { categories.map((category, i)=>{
        return <>
          <Category cat={category} key={i} imgAlign={(i%2)?'right':'left'}/>
          <Hr type="grey"/>
        </>}
      )}
    </div>
  );
}

export default Home;
