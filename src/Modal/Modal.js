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
  //console.log(typeof(skillsLong))

  return(
    <>
       <div
       onClick={(e) => handleOverlay()}
       className="overLayModal">
       </div>
       <div className="modal__container">
         <div className="modal">
           {skillsLong && typeof(skillsLong) !== "string" && skillsLong.map((item, index) => (
             <span key={index} className="genome__skills__tags__modal">{item.name}</span>
           ))}

           {skillsLong && typeof(skillsLong) === "string" &&
           <>
             <div className="genome__summary__info__long__container">
               {skillsLong && typeof(skillsLong) === "string" &&
                 <span className="genome__summary__info__long">{skillsLong}</span>
               }
             </div>
             <div className="modal__footer">
             </div>
           </>  
            }



         </div>
       </div>

    </>
  )
}

export default Modal;
