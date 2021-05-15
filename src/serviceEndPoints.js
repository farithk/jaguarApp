
import axios from "axios";


export async function user(user) {
  try {
    const req = await axios.post(`http://localhost:3030/user`, {user: user});
    //console.log(req.data.person);
    return req.data.person;
  } catch (e) {
    return e.response || e;
  }
}
