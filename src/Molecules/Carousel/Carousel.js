import React from 'react';
import './Carousel.scss';
import Dots from '../../Atoms/Buttons/Dots/Dots';
import GreyButton from '../../Atoms/Buttons/GreyButton/GreyButton';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import * as Constants from '../../global-constants';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.items.length | 0;
  const handleNext = () => {
    setActiveStep(prevActiveStep => (prevActiveStep === maxSteps - 1) ? 0 : (prevActiveStep + 1));
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => (prevActiveStep === 0) ? (maxSteps - 1) : (prevActiveStep - 1));
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    (maxSteps > 0) &&
    <div className='carousel' role='region' aria-label={Constants.Ongoing + Constants.Offers}>
      <AutoPlaySwipeableViews axis='x' index={activeStep}
        onChangeIndex={handleStepChange} enableMouseEvents
        aria-live='off' id='carousel__slides'>
        {props.items.map((step, index) => (
          <div key={step.id} role='group'>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className='carousel__slide' src={step.bannerImageUrl} alt={step.bannerImageAlt} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      {(props.screenSize === Constants.ScreenTablet
        || props.screenSize === Constants.ScreenLaptop) &&
        <div className='carousel__buttons'>
          <GreyButton ariaLabel={Constants.GoTo + Constants.PreviousSlide} ariaControls='carousel__slides'
            handleClick={handleBack} text={Constants.Previous} />
          <GreyButton ariaLabel={Constants.GoTo + Constants.NextSlide} ariaControls='carousel__slides'
            handleClick={handleNext} text={Constants.Next} />
        </div>}
      <Dots activeDot={activeStep} totalDots={maxSteps} selectDot={handleStepChange} altText={Constants.Offers} />
    </div>
  );
}

export default Carousel;
