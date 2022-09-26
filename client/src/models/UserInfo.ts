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
}
