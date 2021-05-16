import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Modal.css";

function Modal(
  {
    setOpenModalProfile,
    openModalProfile,
    skillsLong,
  }){

  const handleOverlay = () => {
    setOpenModalProfile();
  }

  return(
    <>
       <div
       onClick={(e) => handleOverlay()}
       className="overLayModal">
       </div>
       <div className="modal__container">
         <div className="modal">
           {skillsLong && skillsLong.map((item, index) => (
             <span key={index} className="genome__skills__tags">{item.name}</span>
           ))}
         </div>
       </div>

    </>
  )
}

export default Modal;
