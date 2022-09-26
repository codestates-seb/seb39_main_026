import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const UserState = atom({
  key: 'UserState',
  // NOTE: user == null 을 통해 현재 로그인 되어있는 지 여부를 판단하려면 기본값이 빈 객체면 안되어 아래처럼 수정합니다.
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default UserState;
