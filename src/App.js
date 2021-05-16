import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Genome from './Genome/Genome.js';
import { user, connection } from './serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function App() {

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [view, setView] = useState("main");

  useEffect(() => {

    async function fetchData() {

      //user information
      let getUser = await user(events.userId);
      //user conenctions
      let connections = await connection(events.userId);

      //save the user information inside the redux variables
      dispatch({
        type: 'USER_CONTENT',
        payload: getUser
      });

      dispatch({
        type: 'USER_CONNECTIONS',
        payload: connections
      });

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
        <Genome
          view={view}
          setView={setView}
        />
    }

    </div>
  );
}

export default App;
