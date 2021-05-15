import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Genome.css";

function Genome(){

  const [overProfileImg, setOverProfileImg] = useState(false);

  let skills = [
    {
      skillName: "React",
    },
    {
      skillName: "Redux",
    },
    {
      skillName: "Javascript",
    },
    {
      skillName: "React",
    },
    {
      skillName: "React",
    },
    {
      skillName: "Redux",
    },
    {
      skillName: "Javascript",
    },
    {
      skillName: "React",
    },
    {
      skillName: "React",
    },
    {
      skillName: "React",
    },
    {
      skillName: "Redux",
    },
    {
      skillName: "Javascript",
    },
    {
      skillName: "React",
    },

  ];

  return(
    <>
    <div className="genome">
      <div className="genome__left__container">
        <div className="genome__profile__image">
          <img
           className="profile__image__inner"
           src="https://starrgate.s3.amazonaws.com:443/CACHE/images/users/4ae2e38a4935a9b46d6f43e72f77a01397a4abe7/profile_RUDDNRM/0cc4274b42a6848481a4939c51e5d732.jpg" alt=""

           onMouseOver={()=> setOverProfileImg(true)}
           onMouseLeave={()=> setOverProfileImg(false)}

           style={overProfileImg ? {border:"2px solid #ffffff"}:{border:"2px solid #ffffff"}}
          />
        </div>
        <div className="genome__profile__name">
          Farith Comas
        </div>
        <div className="genome__profile__role">
          Software Developer
        </div>
        <div className="genome__profile__city">
          Bogota - Colombia
        </div>

        <div className="genome__profile__who">
        Who am I ?
        </div>
        <div className="genome__profile__resume">
        Self-taught,
        Solving Problem Lover,
        Coder since 2007,
        Tech Geek
        </div>

        <div className="genome__skills__container">
          <div className="genome__icon__cotainer">
            <BackgroundIcon
                name='GitHub'
            />
          </div>
          <div className="genome__icon__cotainer">
            <BackgroundIcon
                name='LinkedIn'
            />
          </div>
          <div className="genome__icon__cotainer">
            <BackgroundIcon
                name='Instagram'
            />
          </div>


        </div>


        <div className="genome__profile__who">
        Skills
        </div>

        <div className="genome__skills">
          <div>
          {skills.map((item, index) => (
            <span className="genome__skills__tags">{item.skillName}</span>
          ))}
          </div>
        </div>

        <div className="genome__profile__who">
        Connections
        </div>

        <div className="genome__connections">
          <div className="genome__connection__name">Alvaro Andres Restrepo</div>
          <div className="genome__connection_info">Web Developer</div>
          <div className="genome__connection_info">Valle del Cauca</div>
        </div>


      </div>
      {/*<div className="genome__right__container"></div>*/}
    </div>
    </>
  )
}

export default Genome;
