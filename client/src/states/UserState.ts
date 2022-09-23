import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const UserState = atom({
  key: 'UserState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default UserState;
