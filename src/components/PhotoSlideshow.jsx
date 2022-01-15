import React from 'react';
import { Slide } from 'react-slideshow-image';
import PhotoSlide from './PhotoSlide';
import 'react-slideshow-image/dist/styles.css';
import '../static/css/PhotoSlideshow.css';

export default function PhotoSlideshow(images) {
    return (
        <div className="slideshow-container">
          <Slide easing="ease" transitionDuration={600} autoplay={false}>
            {
                images.images.map(image => {
                    return <PhotoSlide key={image} image={image}/>;
                })
            }
          </Slide>
        </div>
      )
}