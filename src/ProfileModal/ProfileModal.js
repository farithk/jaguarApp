import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./ProfileModal.css";

function ProfileModal(
  {
   setOpenModalProfile,
   openModalProfile,
  }){

  const handleOverlay = () => {
    setOpenModalProfile();
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

        <div className="button__genome">YOUR GENOME</div>
      </div>
    </>
  )
}

export default ProfileModal;
