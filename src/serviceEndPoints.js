
import axios from "axios";

let backendURL = "http://localhost:3030";

export async function user(user) {
  try {
    const req = await axios.post(`${backendURL}/countries`, {name: user});
    //console.log(req.data);
    return req.data;
  } catch (e) {
    //window.location.reload();
  }
}

