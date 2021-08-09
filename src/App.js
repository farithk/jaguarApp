import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Genome from './Genome/Genome.js';
import Search from './Search/Search.js';

import { user } from './serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function App() {

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [view, setView] = useState("main");

  const [searchType, setSearchType] = useState("people");

  const [fullPeople, setFullPeople] = useState(false);

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
      searchType={searchType}
      setSearchType={setSearchType}
      setFullPeople={setFullPeople}
      fullPeople={fullPeople}
     />

    {view === "main" &&
        <Main
          view={view}
          setView={setView}
          searchType={searchType}
          setSearchType={setSearchType}
         />
    }

    {view === "genome" &&
        <Genome
          view={view}
          setView={setView}
          searchType={searchType}
          setSearchType={setSearchType}
        />
    }

    {view === "search" &&
        <Search
          view={view}
          setView={setView}
          searchType={searchType}
          setSearchType={setSearchType}
          setFullPeople={setFullPeople}
          fullPeople={fullPeople}
        />
    }

    </div>
  );
}

export default App;
