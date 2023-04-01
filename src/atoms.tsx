import {atom} from 'recoil';

export const authToken = atom({
  key: 'authToken',
  default: '',
});

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  phoneNo: number;
  rollNo: number;
  password: string;
}

export const user = atom({
  key: 'user',
  default: {} as User,
});

// Create a variable for state of role ("driver" or "customer")
export const role = atom({
  key: 'role',
  default: 'customer',
});
