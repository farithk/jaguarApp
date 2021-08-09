import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Main.css";
import MainImage from "../assets/images/mapa.png"

function Main({
  view,
  setView,
  searchType,
  setSearchType
 }){

  const handleFindJob = () => {
    setView("search");
    setSearchType("people");
  }

  return(

    <div className="main">
      <img className="main__image__cover" src={MainImage} alt="" />

      <div className="main__title">
      A really cool countries library
      </div>

      <div className="button__to__find" onClick={()=> handleFindJob()}>
        Find A Country
      </div>

      <div className="powered__message">
        Powered by Farith Comas using Coffe, React and Nodejs
      </div>

    </div>
  )
}

export default Main;
