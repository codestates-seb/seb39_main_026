export interface MyPets {
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
