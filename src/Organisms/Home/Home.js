import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import Showcase from '../../Molecules/Showcase/Showcase';
import Carousel from '../../Molecules/Carousel/Carousel';
import Hr from '../../Atoms/HorizontalRow/Hr';
import { fetchData } from '../../Actions/index';
import * as Constants from '../../global-constants';

export class Home extends Component {
  constructor(props) {
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
    this.props.fetchData(Constants.UrlCategoriesApi);
    this.props.fetchData(Constants.UrlBannersApi);
  }

  render() {
    return (
      <main className='home' aria-label={Constants.Home}>
        <Carousel items={this.state.banners} screenSize={this.props.screenSize}/>
        <div className='home__container'>
          {this.state.categories.map((category, i) =>
            <div key={i}>
              <Hr type='hr--grey' />
              <Showcase cat={category} imgAlign={(i % 2) ? Constants.Right : Constants.Left} />
            </div>
          )}
        </div>
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
