import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./ProfileModal.css";

import { user } from '../serviceEndPoints.js';

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

  return(
    <>
     <div
     onClick={(e) => handleOverlay()}
     className="overLay">
     </div>
      <div className="profileModal">
          <div className="top__container__modal">
            <div className="profile__image__container">
              <img className="profile__image__inner" src={events.userContent && events.userContent[0] ? events.userContent[0].flag:null} alt="" />
            </div>
            <div className="user__info__modal">
              <div className="profile__name">{events.userContent && events.userContent[0] ? events.userContent[0].name:""}</div>
              <div className="email__name">{events.userContent && events.userContent[0] ? events.userContent[0].subregion:""}</div>
            </div>
          </div>

        <div onClick={() => {handleOverlay(); setView("genome")}} className="button__genome">Information</div>
      </div>
    </>
  )
}

export default ProfileModal;
