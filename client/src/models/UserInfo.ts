export interface UserInfo {
  id: number;
  email: string;
  username: string;
  imgUrl?: string;
  address: {
    si: string;
    gu: string;
    dong: string;
  };
  petList: Array<Pet>;
}

interface Pet {
  id: number;
  petName: string;
  petGender: string;
  petAges: {
    years: number;
    months: number;
    birthDay: string;
  };
  imgUrl?: string;
}
