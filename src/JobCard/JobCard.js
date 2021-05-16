import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./JobCard.css";
import Modal from "../Modal/Modal.js";
import Card from "../Card/Card.js";

import { user, connection } from '../serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function Genome({
  view,
  setView,
  searchType, setSearchType
}){

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [overProfileImg, setOverProfileImg] = useState(false);

  const [userName, setUserName] = useState("");
  const [basicInfo, setBasicInfo] = useState({
    id:"",
    name: "",
    role: "",
    location: "",
    picture: "",
    summary: "",
    social: [],
    skills: [],
    connections: []
  });


  const handleOpenModal = () => {
    setOpenModalProfile(!openModalProfile);
  }

  useEffect(() => {

    if(searchType === "jobs"){
      console.log(events, events.jobCard.place);
      setBasicInfo({
        id: events.jobCard && events.jobCard.id ? events.jobCard.id:"",
        name: events.jobCard && events.jobCard.organizations.length > 0 ? events.jobCard.organizations[0].name:"",
        role: events.jobCard && events.jobCard.objective ? events.jobCard.objective:"",
        location: events.jobCard && events.jobCard.place.location.length > 0 ? events.jobCard.place.location[0].id:"",
        picture: events.jobCard && events.jobCard.organizations.length > 0 ? events.jobCard.organizations[0].picture:"",
        skills: events.jobCard && events.jobCard.strengths ? events.jobCard.strengths.slice(0, 4):"",
        skillsLong: events.jobCard && events.jobCard.strengths ? events.jobCard.strengths:"",
      })
    }

  },[events.userId, events.userContent, events.userConnections])

  return(
    <>
    <div className="genome"
    style={openModalProfile ? {opacity:"0.8"}:null}
    >
      <div className="genome__left__container__job__card">
       {basicInfo && basicInfo.picture != "" &&

         <div className="genome__profile__image">
           <img
            className="profile__image__inner"
            src={basicInfo && basicInfo.picture != "" ?
              basicInfo.picture:""
            } alt=""

            onMouseOver={()=> setOverProfileImg(true)}
            onMouseLeave={()=> setOverProfileImg(false)}

            style={overProfileImg ? {border:"2px solid #ffffff"}:{border:"2px solid #ffffff"}}
           />
         </div>

       }

        <div className="genome__profile__name">
          {basicInfo && basicInfo.name ?
            basicInfo.name:""
          }
        </div>
        <div className="genome__profile__role">
          {basicInfo && basicInfo.role ?
            basicInfo.role:""
          }
        </div>
        <div className="genome__profile__city">
          {basicInfo && basicInfo.location ?
            basicInfo.location:""
          }
        </div>

        <div className="genome__skills__container">

        {basicInfo && basicInfo.social && basicInfo.social.filter(item => item.name === "instagram" || item.name === "linkedin" || item.name === "github").map((item, index) => (
            <div key={index} className="genome__icon__cotainer">
              <BackgroundIcon
                  name={item.name}
              />
            </div>
        ))}


        </div>


        <div className="genome__profile__who">
        Skills
        </div>

        <div className="genome__skills">

            {basicInfo && basicInfo.skills && basicInfo.skills.map((item, index) => (
              <span key={index} className="genome__skills__tags">{item.name}</span>
            ))}


            {basicInfo && basicInfo.skillsLong && basicInfo.skillsLong.length > 4 &&
              <span onClick={(e) => handleOpenModal()} className="genome__more__skills">{basicInfo.skillsLong.length - 4} more skills</span>
            }

            {openModalProfile && basicInfo && basicInfo.skillsLong &&
              <Modal
                view={view}
                setView={setView}
                openModalProfile={openModalProfile}
                setOpenModalProfile={setOpenModalProfile}
                skillsLong={basicInfo.skillsLong.slice(4, basicInfo.skillsLong.length)}
              />
            }


        </div>



      </div>
      {/*<div className="genome__right__container"></div>*/}
    </div>
    </>
  )
}

export default Genome;
