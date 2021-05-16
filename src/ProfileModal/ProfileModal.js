import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./ProfileModal.css";

import { user, connection, searchPeopleFull } from '../serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function ProfileModal(
  {
   setOpenModalProfile,
   openModalProfile,
   view,
   setView,
   setSearchType,
   searchType
  }){

  const handleOverlay = () => {
    setOpenModalProfile();
  }

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  async function handleOpenGenome(value){
    setSearchType("people")
    console.log("farithcomas");
    //user information
    let getUser = await user("farithcomas");
    //user conenctions
    let connections = await connection("farithcomas");

    //save the user information inside the redux variables
    dispatch({
      type: 'USER_CONNECTIONS',
      payload: connections
    });
    dispatch({
      type: 'USER_CONTENT',
      payload: getUser
    });

    dispatch({
      type: 'USER_ID',
      payload: "farithcomas"
    });
    setView("genome");
  }

  return(
    <>
     <div
     onClick={(e) => handleOverlay()}
     className="overLay">
     </div>
      <div className="profileModal">
          <div className="top__container__modal">
            <div className="profile__image__container">
              <img className="profile__image__inner" src="https://starrgate.s3.amazonaws.com:443/CACHE/images/users/4ae2e38a4935a9b46d6f43e72f77a01397a4abe7/profile_RUDDNRM/0cc4274b42a6848481a4939c51e5d732.jpg" alt="" />
            </div>
            <div className="user__info__modal">
              <div className="profile__name">Farit Comas</div>
              <div className="email__name">farith.comas@gmail.com</div>
            </div>
          </div>

        <div onClick={() => {handleOpenGenome("genome"); handleOverlay()}} className="button__genome">YOUR GENOME</div>
      </div>
    </>
  )
}

export default ProfileModal;
