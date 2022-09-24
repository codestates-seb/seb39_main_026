export interface UserDefault {
  id: number;
  username: string;
  // NOTE: UserDefault 인터페이스가 useGetUsersQuery 응답 타입으로 쓰이는데,
  // password는 응답값으로 내려오지 않으니까 지우는게 맞지 않을까요?
  password: string;
  imgUrl: string;
  dong: string;
  gu: string;
  si: string;
}
