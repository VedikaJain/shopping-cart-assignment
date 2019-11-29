import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import Category from '../Common/Widgets/Category/Category';
import Carousel from '../Common/Widgets/Carousel/Carousel';
import Hr from '../Common/Widgets/HorizontalRow/Hr';
import { fetchData } from '../Common/Actions/index';

export class Home extends Component {

  componentDidMount() {
    console.log("inside component did mount")
    this.props.fetchData('categories');
  }

  render() {
    console.log('Categories Data: ', this.props.categories);
    const categories = ['one', 'two', 'three'];
    return (
      <div className="Home">
        <Carousel />
        <Hr type="grey" />
        {categories.map((category, i) =>
          <div key={i}>
            <Category cat={category} imgAlign={(i % 2) ? 'right' : 'left'} />
            <Hr type="grey" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, { fetchData })(Home);
