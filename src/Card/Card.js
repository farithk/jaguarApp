import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Card.css";

function Card({
  handleNewUser,
  setOverProfileImg,
  overProfileImg,
  element,
  keyy,
  searchType,
  picture,
  name,
  role,
  companyName
}){


  useEffect(() => {

  }, [])

  return(

      <div key={keyy}
       className="genome__connections"
       onClick={()=> {
         //console.log(element.name);
         handleNewUser(element.name);
       }}
       >
       {picture &&
         <div className="genome__image__connection">
           <img
            className="profile__image__inner_C"
            src={picture} alt=""
            onMouseOver={()=> setOverProfileImg(true)}
            onMouseLeave={()=> setOverProfileImg(false)}
            style={overProfileImg ? {border:"0px solid #ffffff"}:{border:"0px solid #ffffff"}}
           />
         </div>
       }

        <div>
          <div className="genome__connection__name">{name && name.split(" ").length > 3 ? name.split(" ")[0]+" "+name.split(" ")[2]:name}</div>
          <div className="genome__connection_info">{role}</div>
          {companyName &&
              <div className="genome__connection_info">{companyName}</div>
          }
        </div>
      </div>

  )
}

export default Card;
