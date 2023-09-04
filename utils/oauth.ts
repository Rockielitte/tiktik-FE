import { log } from "console";
import axios from "axios";
import jwt_decode from "jwt-decode";
require("dotenv").config();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  const user1: { name: "string"; picture: "string"; sub: "string" } =
    jwt_decode(response);
  const { name, picture, sub } = user1;
  const user = {
    _id: sub,
    _type: "user",
    name: name,
    image: picture,
  };
  console.log(`${BASE_URL}/api/auth`);

  const res = await axios.post(`/api/auth`, {
    user,
  });
  addUser(user);
};
