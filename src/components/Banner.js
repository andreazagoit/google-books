import React, { useState } from "react";
import "./Banner.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useDispatch } from "react-redux";
import { searchBookAsync, setBooks } from "../features/books/booksSlice";
import { gsap } from "gsap";
import { useHistory } from "react-router-dom";

const slideData = [
  {
    term: "Harry Potter",
    image:
      "https://images.wired.it/wp-content/uploads/2016/11/14113937/1479116376_harry.potter.jpg",
    color1: "#01ebb8aa",
    color2: "#d13531aa",
  },
  {
    term: "Shadowhunters",
    image:
      "https://www.optimagazine.com/wp-content/uploads/2018/03/shadowhunters-season-3-e1521545133725.jpg",
    color1: "#d13531aa",
    color2: "#000a",
  },
  {
    term: "Dan Brown",
    image:
      "https://www.corrieredicomo.it/wp-content/uploads/2019/10/dan-brown-1140x600.jpg",
    color1: "#b4ac20aa",
    color2: "#80673eaa",
  },
];

const Banner = () => {
  const dispatch = useDispatch();
  const [slideNumber, setSlideNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const prev = () => {
    if (!isLoading) {
      if (slideNumber > 0) {
        setIsLoading(true);
        setSlideNumber(slideNumber - 1);
        gsap
          .to(".slide", { xPercent: -(slideNumber - 1) * 100, duration: 0.6 })
          .then(setIsLoading(false));
      }
    }
  };

  const next = () => {
    if (!isLoading) {
      if (slideNumber != slideData.length - 1) {
        setIsLoading(true);
        setSlideNumber(slideNumber + 1);
        gsap
          .to(".slide", { xPercent: -((slideNumber + 1) * 100), duration: 0.6 })
          .then(setIsLoading(false));
      }
    }
  };

  return (
    <div className="banner">
      {slideNumber > 0 && (
        <div className="banner__arrow prev" onClick={() => prev()}>
          <ArrowBackIcon />
        </div>
      )}
      {slideNumber < slideData.length - 1 && (
        <div className="banner__arrow next" onClick={() => next()}>
          <ArrowForwardIcon />
        </div>
      )}

      <div className="slides">
        {slideData.map((slide) => (
          <div
            className="slide"
            onClick={() => {
              history.push("/");
              dispatch(setBooks({}));
              dispatch(searchBookAsync(slide.term));
            }}
            style={{
              backgroundImage: `linear-gradient(to left, ${slide.color1}, ${slide.color2}),url(${slide.image})`,
            }}
          >
            <div className="slide__title">{slide.term}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
