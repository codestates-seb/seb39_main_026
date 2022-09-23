const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API = {
  WALKS: `${BASE_URL}/community`,
  PICKPET: `${BASE_URL}/members/pets`,
  COMMUNITYDETAIL: `${BASE_URL}/community`,
  USERS: `${BASE_URL}/members`,
  PETS: `${BASE_URL}/pets`,
  Login: `${BASE_URL}/members/login`,
};
