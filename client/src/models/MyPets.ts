export interface MyPets {
  id: number;
  petName: string;
  imgUrl: string;
  petAges: {
    years: number;
    months: number;
    days: number;
    birthDay: string;
  };
  petGender: string;
  personality: string;
  neuter: string;
  breed: string;
  about: string;
  member?: {
    username: string;
    id: string;
  };
}

export interface MyPetsPost {
  petName: string;
  petGender: string;
  breed: string;
  neuter: string;
  personality: string;
  about: string;
  birthDay: string;
  imgUrl?: string;
}
