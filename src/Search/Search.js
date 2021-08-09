import React, { useEffect, useState } from 'react';
import BackgroundIcon from "../assets/images/Icons.js";
import "./Search.css";
import Card from "../Card/Card.js";

import { user } from '../serviceEndPoints.js';

//Redux
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

function Search({ view, setView, searchType, setSearchType, fullPeople, setFullPeople}){

  let events = useSelector(state => state);
  let dispatch = useDispatch();

  const [filter, setFilter] = useState("");

  const [peopleSuggested, setPeopleSuggested] = useState();

  const [overProfileImg, setOverProfileImg] = useState(false);

  const [focusInput, setFocusInput] = useState(false);

  const handleSearch = (value) => {
    setPeopleSuggested();
    setSearchType(value);
    setFilter("");
  }

  async function handleNewUser(value){

    if(searchType === "people"){

      //user information
      //console.log("test");
      let getUser = await user(value);

      dispatch({
        type: 'USER_CONTENT',
        payload: getUser
      });

      dispatch({
        type: 'USER_ID',
        payload: value
      });
      setView("genome");
    }

  }

  useEffect(async () => {

  }, [filter])

  const handleEnter = async (e) => {
    if(e.key === 'Enter'){
      async function fetchData() {
        let getUser = await user(filter);
        setPeopleSuggested(getUser)
        //console.log(getUser);
      }
      fetchData();
     }
  }

  const handleButton = async (value) => {
    async function fetchData() {
      let getUser = await user(filter);
      setPeopleSuggested(getUser)
      //console.log(getUser);

    }
    fetchData();
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
          COUNTRY BY NAME
        </div>
      </div>
    }

    </div>

    {!fullPeople &&
      <div className="header_container_search"
      style={focusInput ? {border:"2px solid #cddc39"}:{border:"2px solid #ffffff"}}
      onClick={()=> {setFullPeople(false)}}
      >
        <input
          className={fullPeople ? "header_search__full":"header_search"}
          placeholder={'Search'}
          value={filter}
          onChange={(e) => {setFilter(e.target.value)}}
          type="text"
          onKeyPress={(e)=> {handleEnter(e)}}
          onFocus={(e) => setFocusInput(true)}
          onBlur={(e) => setFocusInput(false)}

        />
        <div className="search__icon__inner"
        onClick={()=> handleButton(filter)}
        >
          <BackgroundIcon
              name='Search'
          />
        </div>

      </div>
    }
    {peopleSuggested && peopleSuggested.length > 0 &&
      <div className={fullPeople ? "search__suggested__people__full":"search__suggested__people"}>
        <div className="search__suggested__people__inner">
          {peopleSuggested.map((element, index) => (
            <Card
              keyy={index}
              handleNewUser={handleNewUser}
              setOverProfileImg={setOverProfileImg}
              overProfileImg={overProfileImg}
              element={element}
              searchType={searchType}
              name={searchType === "people" ? element.name:element.objective}
              role={searchType === "people" ? element.subregion:""}
              picture={searchType === "people" ? element.flag:null}
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
