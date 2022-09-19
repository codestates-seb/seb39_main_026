export interface WalkDefault {
  communityId: number;
  title: string;
  time: string;
  address: string;
  imgUrl: string;
  capacity: number;
  participant: number;
}

export interface WalkDetail extends WalkDefault {
  communityName: string;
  body: string;
  representMember: string;
  pets: Array<WalkDetailPets>;
  comments: Array<WalkDetailCommnet>;
  createdAt: string;
  viewed: number;
  liked: number;
}

interface WalkDetailPets {
  petName: string;
  petGender: string;
  imgUrl: string;
  'user.name': string;
}

interface WalkDetailCommnet {
  comment: string;
  'user.name': string;
  createdAt: string;
}
