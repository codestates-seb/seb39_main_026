export interface MyPets {
  id: number;
  petName: string;
  imgUrl: string;
  petAges: {
    years: number;
    months: number;
    days: number;
  };
  petGender: '여' | '남';
  personality: string;
  neuter: 'O' | 'X';
  breed: string;
  about: string;
}
