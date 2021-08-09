import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Genome.css";
import Modal from "../Modal/Modal.js";
import Card from "../Card/Card.js";

import { user } from '../serviceEndPoints.js';

//Redux
import { useSelector, useDispatch } from "react-redux";

function Genome({
  view,
  setView,
}){

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalProfileSummary, setOpenModalProfileSummary] = useState(false);
  const [overProfileImg, setOverProfileImg] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    id:"",
    name: "",
    role: "",
    location: "",
    picture: "",
    summary: "",
    summaryLong:"",
    population:"",
    social: [],
    skills: [],
    connections: [],
    currencies:[]
  });


  const handleOpenModal = () => {
    setOpenModalProfile(!openModalProfile);
  }

  const handleOpenModalSummary = () => {
    setOpenModalProfileSummary(!openModalProfileSummary);
  }

  async function handleNewUser(value){
    //console.log(value);

    //user information
    let getUser = await user(value);

    dispatch({
      type: 'USER_CONTENT',
      payload: getUser
    });

    dispatch({
      type: 'USER_ID',
      payload: value
    });

  }

  useEffect(() => {
      setBasicInfo({
        id: events.userContent ? events.userContent.userId:"",
        name: events.userContent && events.userContent[0] ? events.userContent[0].name:"",
        role: events.userContent && events.userContent[0] ? events.userContent[0].subregion:"",
        picture: events.userContent && events.userContent[0] ? events.userContent[0].flag:null,
        summary: events.userContent && events.userContent[0] ? events.userContent[0].capital:"",
        summaryLong: "",
        population: events.userContent && events.userContent[0]  ? events.userContent[0].population:"",
        currencies: events.userContent && events.userContent[0]  ? events.userContent[0].currencies:"",
        social: "",
        skills: events.userContent && events.userContent[0]  ? events.userContent[0].languages:"",
        skillsLong: "",
        connections: "",
      })

  },[])

  return(
    <>
    <div className="genome"
    style={openModalProfile ||openModalProfileSummary ? {opacity:"0.8"}:null}
    >
      <div className="genome__left__container">
       {basicInfo && basicInfo.picture != "" &&

         <div className="genome__profile__image">
           <img
            className="profile__image__inner_G"
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

        {basicInfo && basicInfo.summary && basicInfo.summary.length > 0 &&
          <div className="genome__profile__who">
          Capital:
          </div>
         }

        <div className="genome__profile__resume">
          {basicInfo && basicInfo.summary ?
            basicInfo.summary.split("\n").join(", "):""
          }
        </div>

        {basicInfo && basicInfo.summary && basicInfo.summary.length > 0 &&
          <div className="genome__profile__who">
          Population:
          </div>
         }

        <div className="genome__profile__resume">
          {basicInfo && basicInfo.population ?
            basicInfo.population:""
          }
        </div>

        {basicInfo && basicInfo.skills.length > 0 &&
            <div className="genome__profile__who">
            Currencies
            </div>
          }

        <div className="genome__skills">
            {basicInfo && basicInfo.currencies && basicInfo.currencies.map((item, index) => (
              <span key={index} className="genome__skills__tags">{item.name}</span>
            ))}
        </div>

          {basicInfo && basicInfo.skills.length > 0 &&
            <div className="genome__profile__who">
            Languages
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
