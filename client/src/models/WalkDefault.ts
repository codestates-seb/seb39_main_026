export interface WalkDefault {
  communityId: string;
  name: string;
  dateInfo: string;
  place: string;
  imgUrls: [string];
  capacity: number;
  participant: number;
}

export interface WalkDetail extends WalkDefault {
  name: string;
  body: string;
  time: string;
  dayInfo: [string];
  memberPetList: [
    {
      petName: string;
    }
  ];
  member: {
    username: string;
    petList: [
      {
        id: number;
        petName: string;
        member: {
          username: string;
        };
      }
    ];
  };
  pets: Array<WalkDetailPets>;
  comments: Array<WalkDetailComment>;
  createdAt: string;
  viewed: number;
  liked: number;
}

interface WalkDetailPets {
  petName: string;
  petGender: string;
  imgUrl: string;
  username: string;
}

interface WalkDetailComment {
  body: string;
  member: {
    username: string;
  };
  createdAt: string;
}
