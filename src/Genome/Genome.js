import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Genome.css";
import Modal from "../Modal/Modal.js";

import { user, connection } from '../serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function Genome({
  view,
  setView,
}){

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [openModalProfile, setOpenModalProfile] = useState(false);

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

  async function handleNewUser(value){
    console.log(value);
    let getUser = await user(value);
    dispatch({
      type: 'USER_CONTENT',
      payload: getUser
    });
  }


  useEffect(() => {

      console.log(events);
      setBasicInfo({
        id: events.userContent ? events.userContent.person.id:"",
        name: events.userContent ? events.userContent.person.name:"",
        role: events.userContent ? events.userContent.person.professionalHeadline:"",
        location: events.userContent ? events.userContent.person.location.shortName:"",
        picture: events.userContent ? events.userContent.person.picture:"",
        summary: events.userContent ? events.userContent.person.summaryOfBio:"",
        social: events.userContent ? events.userContent.person.links:"",
        skills: events.userContent ? events.userContent.strengths.slice(0, 4):"",
        skillsLong: events.userContent ? events.userContent.strengths:"",
        connections: events.userConnections ? events.userConnections.people:"",
      })

  },[events.userId, events.userContent, events.userConnections])

  const [overProfileImg, setOverProfileImg] = useState(false);

  return(
    <>
    <div className="genome"
    style={openModalProfile ? {opacity:"0.8"}:null}
    >
      <div className="genome__left__container">
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
          {basicInfo && basicInfo.name != "" ?
            basicInfo.name:""
          }
        </div>
        <div className="genome__profile__role">
          {basicInfo && basicInfo.role != "" ?
            basicInfo.role:""
          }
        </div>
        <div className="genome__profile__city">
          {basicInfo && basicInfo.location != "" ?
            basicInfo.location:""
          }
        </div>

        <div className="genome__profile__who">
        Who am I ?
        </div>
        <div className="genome__profile__resume">
          {basicInfo && basicInfo.summary != "" ?
            basicInfo.summary.split("\n").join(", "):""
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

        <div className="genome__profile__who">
        Connections
        </div>

        {basicInfo && basicInfo.connections && basicInfo.connections.filter(item => item.id !== basicInfo.id).map((element, index) => (
          <div key={index}
           className="genome__connections"
           onClick={()=> {
             handleNewUser(element.publicId);
           }}
           >
            <div className="genome__image__connection">
              <img
               className="profile__image__inner"
               src={basicInfo && basicInfo.picture != "" ?
                 element.picture:""
               } alt=""

               onMouseOver={()=> setOverProfileImg(true)}
               onMouseLeave={()=> setOverProfileImg(false)}

               style={overProfileImg ? {border:"0px solid #ffffff"}:{border:"0px solid #ffffff"}}
              />
            </div>

            <div>
              <div className="genome__connection__name">{element.name}</div>
              <div className="genome__connection_info">{element.professionalHeadline}</div>
            </div>

          </div>
        ))}

      </div>
      {/*<div className="genome__right__container"></div>*/}
    </div>
    </>
  )
}

export default Genome;
