import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Genome from './Genome/Genome.js';
import { user } from './serviceEndPoints.js';

function App() {

  const [basicInfo, setBasicInfo] = useState();
  const [view, setView] = useState("main");

  useEffect(() => {

    async function fetchData() {
      //const req = await axios.get('http://localhost:3030');
      //console.log(req.data.person);
      //setBasicInfo()
      let getUser = await user("farithcomas");
      console.log(getUser);
    }
    fetchData();
  },[])

  return (
    <div className="app">
    {/*Main page

      HEADER
      logo of torre -> search icon (to go and find people or jobs) -> job my jobs (applied) -> my genome (profile) -> profile image (name and email and the genome)

      MAIN
      -> nice picture of a job seeker
      -> Welcome message
      -> Button to got and find a work
      -> information about the developer
    */}
    <Header
      view={view}
      setView={setView}
     />

    {view === "main" &&
        <Main />
    }


    {view === "genome" &&
        <Genome />
    }


    </div>
  );
}

export default App;
