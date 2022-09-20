const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API = {
  WALKS: `${BASE_URL}/communities`,
  PICKPET: `${BASE_URL}/members/pets`,
  COMMUNITYDETAIL: `${BASE_URL}/community`,
  USERS: `${BASE_URL}/members`,
};
