const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API = {
  WALKS: `${BASE_URL}/community`,
  PETS: `${BASE_URL}/pets`,
  USERS: `${BASE_URL}/members`,
  LOGIN: `${BASE_URL}/members/login`,
  SINGUP: `${BASE_URL}/members/signup`,
  COMMENT: `${BASE_URL}/comment`,
};
