
import axios from "axios";

let backendURL = "https://torrebackend.herokuapp.com";

export async function user(user) {
  try {
    const req = await axios.post(`${backendURL}/user`, {user: user});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}

export async function connection(user) {
  try {
    const req = await axios.post(`${backendURL}/connection`, {user: user});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}


export async function searchPeople(user) {
  try {
    const req = await axios.post(`${backendURL}/search/people`, {"name":{"term":user}});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}

export async function searchPeopleFull(user) {
  try {
    const req = await axios.post(`${backendURL}/search/people/full`, {"name":{"term":user}});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}

export async function searchJobs(job) {
  try {
    const req = await axios.post(`${backendURL}/search/job`, {"skill/role":{"text":job,"experience":"potential-to-develop"}});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}


export async function searchJobsFull(job) {
  try {
    const req = await axios.post(`${backendURL}/search/job/full`, {"skill/role":{"text":job,"experience":"potential-to-develop"}});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}

export async function searchJobId(id) {
  try {
    const req = await axios.post(`${backendURL}/search/job/id`, {id: id});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}
