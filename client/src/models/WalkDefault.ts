export interface WalkDefault {
  communityId: number;
  name: string;
  dateInfo: string;
  dayInfo: (string | null)[];
  place: string;
  imgUrls: [string];
  capacity: number;
  participant: number;
}

export interface WalkDetail extends WalkDefault {
  name: string;
  body: string;
  time: string;
  memberPetList: [
    {
      petName: string;
    }
  ];
  member: {
    id: number;
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
  notices: {
    noticeId: number;
    title: string;
    body: string;
  };
  communityPetList: Array<CommunityPetList>;
}

interface WalkDetailPets {
  petName: string;
  petGender: string;
  imgUrl: string;
  username: string;
}

interface WalkDetailComment {
  commentId: number;
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

export interface CommentPost {
  communityId: number;
  body: string;
}

export interface WalkPostNotice {
  id: number;
  title?: string;
  body?: string;
}

export interface NoticePost {
  id: number;
  title: string;
  body: string;
}
