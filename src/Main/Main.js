import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Main.css";
import MainImage from "../assets/images/mapa.png"

function Main(){

  return(

    <div className="main">
      <img className="main__image__cover" src={MainImage} alt="" />

      <div className="main__title">
      let's make work something worthy
      </div>

      <div className="button__to__find">
        FIND A JOB
      </div>

      <div className="powered__message">
        Powered by Farith Comas using Coffe, React and Nodejs
      </div>

    </div>
  )
}

export default Main;
