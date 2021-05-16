import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Header.css";
import ProfileModal from "../ProfileModal/ProfileModal.js";

import { user, connection, searchPeopleFull } from '../serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function Header({
  setView,
  view,
  setSearchType,
  searchType
}){

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [overProfileImg, setOverProfileImg] = useState(false);

  const handleOpenModal = () => {
    setOpenModalProfile(!openModalProfile);
  }

  const handleOpenGenome = async (value) => {
    if(value === "genome"){
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
      setSearchType("people");
    }
    setView(value);
    console.log(value);
  }

  return(

    <div className="header">
    {/*Main page
      HEADER
      logo of torre -> search icon (to go and find people or jobs) -> job my jobs (applied) -> my genome (profile) -> profile image (name and email and the genome) -> profile modal (component)
    */}
      <div
      className="logo__container"
      onClick={() => handleOpenGenome("main")}
      >
      <BackgroundIcon
          name='Logo'
      />
      </div>
      <div className="left_header_container">
          <div
            className="logo__left__side__secondary__container__search"
            onClick={() => handleOpenGenome("search")}>
              <BackgroundIcon
                  name='Search'
              />
              <p className="icon__subtitles__header">Search</p>
          </div>

          <div
            className="logo__left__side__secondary__container"
            onClick={() => console.log("job")}>
              <BackgroundIcon
                  name='Jobs'
              />
              <p className="icon__subtitles__header">Jobs</p>
          </div>

          <div
            className="logo__left__side__secondary__container"
            onClick={() => handleOpenGenome("genome")}>
            <BackgroundIcon
                name='Genome'
            />
            <p className="icon__subtitles__header">Genome</p>
          </div>


          <div className="profile__image__container">
            <img onClick={(e) => handleOpenModal()}
             className="profile__image__inner"
             src="https://starrgate.s3.amazonaws.com:443/CACHE/images/users/4ae2e38a4935a9b46d6f43e72f77a01397a4abe7/profile_RUDDNRM/0cc4274b42a6848481a4939c51e5d732.jpg" alt=""

             onMouseOver={()=> setOverProfileImg(true)}
             onMouseLeave={()=> setOverProfileImg(false)}

             style={openModalProfile || overProfileImg ? {border:"2px solid #cddc39"}:{border:"2px solid #ffffff"}}
            />
            {openModalProfile &&
                <ProfileModal
                  view={view}
                  setView={setView}
                  openModalProfile={openModalProfile}
                  setOpenModalProfile={setOpenModalProfile}
                  setSearchType={setSearchType}
                  searchType={searchType}
                />
            }

          </div>
      </div>


    </div>
  )
}

export default Header;
