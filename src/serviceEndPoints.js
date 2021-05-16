
import axios from "axios";


export async function user(user) {
  try {
    const req = await axios.post(`http://localhost:3030/user`, {user: user});
    console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}

export async function connection(user) {
  try {
    const req = await axios.post(`http://localhost:3030/connection`, {user: user});
    console.log(req.data);
    return req.data;
  } catch (e) {
    return e.response || e;
  }
}
