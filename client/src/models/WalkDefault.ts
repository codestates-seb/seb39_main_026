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
  dayInfo: (string | null)[];
  memberPetList: [
    {
      petName: string;
    }
  ];
  member: {
    imgUrl: string;
    username: string;
    petList: [
      {
        id: number;
        imgUrl: string;
        petName: string;
        member: {
          username: string;
        };
      }
    ];
  };
  pets: Array<WalkDetailPets>;
  comments: Array<WalkDetailComment>;
  notices: Array<WalkNotice>;
  createdAt: string;
  viewed: number;
  liked: number;
  communityPetList: Array<CommunityPetList>;
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
    id: number;
    username: string;
    address: string | null;
    email: string;
    imgUrl: string;
    memberCommunityList: [];
    petList: [];
  };
  createdAt: string;
}

interface WalkNotice {
  title: string;
  body: string;
}

interface CommunityPetList {
  id: number;
  imgUrl: string;
  member: WalkDetailMember;
  petAges: {
    years: number;
    months: number;
  };
  petGender: string;
  petName: string;
}

interface WalkDetailMember {
  address: string;
  email: string;
  id: number;
  imgUrl: string;
  memberCommunityList: [];
  petList: [];
  username: string;
}
