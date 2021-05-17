import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Genome.css";
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
  const [openModalProfileSummary, setOpenModalProfileSummary] = useState(false);
  const [overProfileImg, setOverProfileImg] = useState(false);

  const [userName, setUserName] = useState("");
  const [basicInfo, setBasicInfo] = useState({
    id:"",
    name: "",
    role: "",
    location: "",
    picture: "",
    summary: "",
    summaryLong:"",
    social: [],
    skills: [],
    connections: []
  });


  const handleOpenModal = () => {
    setOpenModalProfile(!openModalProfile);
  }

  const handleOpenModalSummary = () => {
    setOpenModalProfileSummary(!openModalProfileSummary);
  }

  async function handleNewUser(value){
  console.log(value);
    if(searchType === "people"){

      //user information
      let getUser = await user(value);
      //user conenctions
      let connections = await connection(value);

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
        payload: value
      });
    }
  }


  useEffect(() => {
      console.log(events, searchType);
      setBasicInfo({
        id: events.userContent && events.userContent.person ? events.userContent.person.id:"",
        name: events.userContent && events.userContent.person.name ? events.userContent.person.name:"",
        role: events.userContent && events.userContent.person.professionalHeadline ? events.userContent.person.professionalHeadline:"",
        location: events.userContent && events.userContent.person.location.shortName ? events.userContent.person.location.shortName:"",
        picture: events.userContent && events.userContent.person.picture ? events.userContent.person.picture:"",
        summary: events.userContent && events.userContent.person.summaryOfBio ? events.userContent.person.summaryOfBio.slice(0, 50):"",
        summaryLong: events.userContent && events.userContent.person.summaryOfBio ? events.userContent.person.summaryOfBio:"",
        social: events.userContent && events.userContent.person.links ? events.userContent.person.links:"",
        skills: events.userContent && events.userContent.strengths ? events.userContent.strengths.slice(0, 4):"",
        skillsLong: events.userContent && events.userContent.strengths ? events.userContent.strengths:"",
        connections: events.userConnections && events.userConnections.people ? events.userConnections.people:"",
      })

  },[events.userId, events.userContent, events.userConnections])

  return(
    <>
    <div className="genome"
    style={openModalProfile ||openModalProfileSummary ? {opacity:"0.8"}:null}
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
          {basicInfo && basicInfo.name ?
            (basicInfo.name.split(" ").length > 3 ? basicInfo.name.split(" ")[0]+" "+basicInfo.name.split(" ")[2]:basicInfo.name):""
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

        {basicInfo && basicInfo.summaryLong && basicInfo.summaryLong.length > 0 &&
          <div className="genome__profile__who">
          Who am I ?
          </div>
         }


        <div className="genome__profile__resume">
          {basicInfo && basicInfo.summary ?
            basicInfo.summary.split("\n").join(", "):""
          }
          {basicInfo && basicInfo.summaryLong && basicInfo.summaryLong.length > 4 &&
            <span className="genome__profile__resume__more" onClick={(e) => handleOpenModalSummary()} > more </span>
          }
          {openModalProfileSummary && basicInfo && basicInfo.skillsLong &&
            <Modal
              view={view}
              setView={setView}
              openModalProfile={openModalProfileSummary}
              setOpenModalProfile={setOpenModalProfileSummary}
              skillsLong={basicInfo.summaryLong}
            />
          }
        </div>

        <div className="genome__skills__container">

        {basicInfo && basicInfo.social && basicInfo.social.filter(item => item.name === "instagram" || item.name === "linkedin" || item.name === "github").map((item, index) => (
            <div key={index} className="genome__icon__cotainer">
              <a href={item.address} target="_blank">
                <BackgroundIcon
                    name={item.name}
                />
              </a>
            </div>
        ))}


        </div>

          {basicInfo && basicInfo.skills.length > 0 &&
            <div className="genome__profile__who">
            Skills
            </div>
          }

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
        {basicInfo && basicInfo.connections.length > 1 &&
          <div className="genome__profile__who">
          Connections
          </div>
        }

        <div className="connection__container">
          <div className="connection__container__inner">
            {basicInfo && basicInfo.connections && basicInfo.connections.filter(item => item.id !== basicInfo.id).map((element, index) => (
              <Card
                keyy={index}
                handleNewUser={handleNewUser}
                setOverProfileImg={setOverProfileImg}
                setOverProfileImg={setOverProfileImg}
                basicInfo={basicInfo}
                overProfileImg={overProfileImg}
                element={element}
                name={element.name}
                role={element.professionalHeadline}
                picture={element.picture}
              />
            ))}
          </div>
        </div>
      </div>
      {/*<div className="genome__right__container"></div>*/}
    </div>
    </>
  )
}

export default Genome;
