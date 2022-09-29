export interface UserDogInfo {
  id: number;
  petName: string;
  member: Array<petOwner>;
  petGender: string;
  neuter: string;
  petAge: string;
  personality: string;
  breed: string;
  imgUrl: string;
  about: string;
}

interface petOwner {
  memberName: string;
  address: string;
}
