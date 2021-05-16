import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Search.css";
import Card from "../Card/Card.js";

import { searchPeople } from '../serviceEndPoints.js';

import { user, connection, searchPeopleFull, searchJobs, searchJobsFull, searchJobId } from '../serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function Search({ view, setView, searchType, setSearchType}){

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [filter, setFilter] = useState("");

  const [peopleSuggested, setPeopleSuggested] = useState();

  const [overProfileImg, setOverProfileImg] = useState(false);

  const [fullPeople, setFullPeople] = useState(false);

  const handleSearch = (value) => {
    setPeopleSuggested();
    setSearchType(value);
    setFilter("");
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
      setView("genome");
    } else {
      let getJob = await searchJobId(value);

      dispatch({
        type: 'JOB_CARD',
        payload: getJob
      });

      console.log(getJob);
      setView("jobCard");
    }

  }

  useEffect(async () => {

    async function fetchData() {

      if(searchType === "people"){
        //const delayDebounceFn = setTimeout(async () => {
          console.log(filter)
          //axios request
          let people = await searchPeople(filter);
          console.log(people.results);
          setPeopleSuggested(people.results)
        //}, 500)

        //return () => clearTimeout(delayDebounceFn)

      } else {

        //const delayDebounceFn = setTimeout(async () => {
          console.log(filter)
          //axios request
          let people = await searchJobs(filter);
          console.log(people.results);
          setPeopleSuggested(people.results)
        //}, 500)

        //return () => clearTimeout(delayDebounceFn)
      }
    }
    fetchData();




  }, [filter])

  const handleEnter = async (e) => {
    if(e.key === 'Enter'){
      if(searchType === "people"){
        //console.log("here");
        let people = await searchPeopleFull(e.target.value);
        console.log(people.results);
        setPeopleSuggested(people.results);
        setFullPeople(true);
      } else {
        //console.log("here");
        let people = await searchJobsFull(e.target.value);
        console.log(people.results);
        setPeopleSuggested(people.results);
        setFullPeople(true);
      }

     }
  }

  return(
<>
    <div className="search"
    onClick={()=> {setFullPeople(false)}}
    >

    {!fullPeople &&
      <div className="search__container__header">
        <div className="search__left__title"
        style={searchType === "people" ? {borderBottom:"2px solid #cddc39", color:"#cddc39"}:{borderBottom:"2px solid #ffffff"}}
        onClick={()=>handleSearch("people")}>
          PEOPLE
        </div>
        <div className="search__right__title"
        style={searchType === "jobs" ? {borderBottom:"2px solid #cddc39",color:"#cddc39"}:{borderBottom:"2px solid #ffffff"}}
        onClick={()=>handleSearch("jobs")}>
          JOBS
        </div>
      </div>
    }

    </div>

    {!fullPeople &&
      <div className="header_container_search"
      onClick={()=> {setFullPeople(false)}}
      >
        <input
          className={fullPeople ? "header_search__full":"header_search"}
          placeholder={'Search'}
          value={filter}
          onChange={(e) => {setFilter(e.target.value)}}
          type="text"
          onKeyPress={(e)=> {handleEnter(e)}}
        />
      </div>
    }
    {console.log(peopleSuggested)}
    {peopleSuggested && peopleSuggested.length > 0 &&
      <div className={fullPeople ? "search__suggested__people__full":"search__suggested__people"}>
        <div className="search__suggested__people__inner">
          {peopleSuggested.map((element, index) => (
            <Card
              keyy={index}
              handleNewUser={handleNewUser}
              setOverProfileImg={setOverProfileImg}
              setOverProfileImg={setOverProfileImg}
              overProfileImg={overProfileImg}
              element={element}
              searchType={searchType}
              name={searchType === "people" ? element.name:element.objective}
              role={searchType === "people" ? element.professionalHeadline:element.type}
              picture={searchType === "people" ? element.picture:(element.organizations.length > 0 ? element.organizations[0].picture:null)}
              companyName={(searchType === "jobs" && element.organizations.length > 0) ? element.organizations[0].name:null}
            />
          ))}
        </div>

      </div>
    }

</>
  )
}

export default Search;
