import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import Category from '../Common/Widgets/Category/Category';
import Carousel from '../Common/Widgets/Carousel/Carousel';
import Hr from '../Common/Widgets/HorizontalRow/Hr';
import { fetchData } from '../Common/Actions/index';

export class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: []
    }
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.categories !== state.categories) {
      return {
        categories: props.categories
      };
    }
  }

  componentDidMount() {
    this.props.fetchData('categories');
  }

  render() {
    return (
      <div className="Home">
        <Carousel />
        <Hr type="grey" />
        {this.state.categories.map((category, i) =>
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
    categories: state.setData.categories
  }
}

export default connect(mapStateToProps, { fetchData })(Home);
