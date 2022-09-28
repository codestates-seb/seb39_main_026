const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API = {
  WALKS: `${BASE_URL}/community`,
  COMMUNITYDETAIL: `${BASE_URL}/community`,
  USERS: `${BASE_URL}/members`,
  PETS: `${BASE_URL}/pets`,
  Login: `${BASE_URL}/members/login`,
  Signup: `${BASE_URL}/members/signup`,
  COMMENT: `${BASE_URL}/comment/post`,
};
