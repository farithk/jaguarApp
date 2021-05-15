import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";

function Header(){

  const [widthScreen, setWidthScreen] = useState();

  useEffect(()=> {
    setWidthScreen(window.innerWidth);
    console.log(window.innerWidth);
  },[])

  return(

    <div className="header">
    {/*Main page
      HEADER
      logo of torre -> search icon (to go and find people or jobs) -> job my jobs (applied) -> my genome (profile) -> profile image (name and email and the genome)
    */}
      <div className="logo__container">
      <BackgroundIcon
          name='Logo'
      />
      </div>
      <div className="left_header_container">

          <BackgroundIcon
              name='Search'
          />
          
          <BackgroundIcon
              name='Jobs'
          />
          <BackgroundIcon
              name='Genome'
          />

      </div>
      <div className="profile__image__container">
        <img className="profile__image__inner" src="https://starrgate.s3.amazonaws.com:443/CACHE/images/users/4ae2e38a4935a9b46d6f43e72f77a01397a4abe7/profile_RUDDNRM/0cc4274b42a6848481a4939c51e5d732.jpg" alt="" />
      </div>
    </div>
  )
}

export default Header;
