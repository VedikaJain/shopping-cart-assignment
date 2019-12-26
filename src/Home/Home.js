import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import Showcase from '../Common/Templates/Showcase/Showcase';
import Carousel from '../Common/Widgets/Carousel/Carousel';
import Hr from '../Common/Widgets/HorizontalRow/Hr';
import { fetchData } from '../Common/Actions/index';

export class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      banners: []
    }
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.categories !== state.categories) {
      return {
        categories: props.categories
      };
    }
    if (props.banners !== state.banners) {
      return {
        banners: props.banners
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchData('categories');
    this.props.fetchData('banners');
  }

  render() {
    return (
      <main className="Home" aria-label='Home'>
        <Carousel items={this.state.banners} />
        <Hr type="hr-grey" />
        {this.state.categories.map((category, i) =>
          <div key={i}>
            <Showcase cat={category} imgAlign={(i % 2) ? 'right' : 'left'} />
            <Hr type="hr-grey" />
          </div>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.setData.categories,
    banners: state.setData.banners
  }
}

export default connect(mapStateToProps, { fetchData })(Home);
