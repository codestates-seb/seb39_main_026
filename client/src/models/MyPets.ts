export interface MyPets {
  id: number;
  petName: string;
  imgUrl: string;
  petAges: {
    years: number;
    months: number;
    days: number;
  };
  petGender: string;
  personality: string;
  neuter: string;
  breed: string;
  about: string;
  birthday: string;
  member: {
    username: string;
    id: string;
  };
}
