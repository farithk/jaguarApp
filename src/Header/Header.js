import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Header.css";
import ProfileModal from "../ProfileModal/ProfileModal.js";

import { user } from '../serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function Header({
  setView,
  view,
  setSearchType,
  searchType,
  setFullPeople,
}){

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [overProfileImg, setOverProfileImg] = useState(false);

  const handleOpenModal = () => {
    setOpenModalProfile(!openModalProfile);
  }

  useEffect(() => {

    async function fetchData() {

      let getUser = await user("colombia");
      //console.log(getUser[0].name);

      dispatch({
        type: 'USER_CONTENT',
        payload: getUser
      });

      dispatch({
        type: 'USER_ID',
        payload: "colombia"
      });

    }
    if(!events.userContent){
      fetchData();
    }

  },[])

  return(

    <div className="header">

      <div
      className="logo__container"
      onClick={() => setView("main")}
      >
        Countries
      </div>
      <div className="left_header_container">
          <div
            className="logo__left__side__secondary__container__search"
            onClick={() => {setView("search"); setFullPeople(false)}}>
              <BackgroundIcon
                  name='Search'
              />
              <p className="icon__subtitles__header">Search</p>
          </div>

          <div className="profile__image__container">
            <img onClick={(e) => handleOpenModal()}
             className="profile__image__inner"
             src={events.userContent && events.userContent[0] ? events.userContent[0].flag:null} alt=""

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
