import React from "react";
import Carousel from "react-bootstrap/Carousel";
import SlideShow1 from "../../../assets/slide1.jpg";
import SlideShow2 from "../../../assets/slide2.jpg";
import SlideShow3 from "../../../assets/slide3.jpg";
import SlideShow4 from "../../../assets/slide4.jpg";

const SlideShow = () => {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          height="600px"
          className="d-block w-100"
          src={SlideShow1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>"The Power of Solar: Sustainable, Renewable, and Plentiful"</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          height="600px"
          className="d-block w-100"
          src={SlideShow3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>"Pros and Cons of Solar Panels: Making an Informed Decision"</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height="600px"
          className="d-block w-100"
          src={SlideShow2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>"Solar Energy and the Environment: A Win-Win Solution"</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height="600px"
          className="d-block w-100"
          src={SlideShow4}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>"Going Solar: Financial Savings and Local Jobs"</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default SlideShow;
