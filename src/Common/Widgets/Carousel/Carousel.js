import React from 'react';
import './Carousel.scss';
import Dots from '../Buttons/Dots/Dots';
import GreyButton from '../Buttons/GreyButton/GreyButton';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

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
    <div className='carousel' role='region'
      aria-roledescription='carousel' aria-label='Ongoing offers'>
      <AutoPlaySwipeableViews axis='x' index={activeStep}
        onChangeIndex={handleStepChange} enableMouseEvents
        aria-live='off' id='carouselSlides'>
        {props.items.map((step, index) => (
          <div key={step.id} role='group' aria-roledescription='slide'
            aria-label={(index + 1)  + ' of ' + props.items.length + ' offers'}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className='carousel-slide-image' src={step.bannerImageUrl} alt={step.bannerImageAlt} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <div className='carousel-buttons'>
        <GreyButton ariaLabel='Go to previous slide' ariaControls='carouselSlides'
            handleClick={handleBack} text='PREV'/>
        <GreyButton ariaLabel='Go to next slide' ariaControls='carouselSlides'
            handleClick={handleNext} text='NEXT'/>
      </div>
      <Dots activeDot={activeStep} totalDots={maxSteps} selectDot={handleStepChange} altText=' offers'/>
    </div>
  );
}

export default Carousel;
