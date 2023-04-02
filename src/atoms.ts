import {atom} from 'recoil';

export const authToken = atom({
  key: 'authToken',
  default: '',
});

export interface userDetails {
  name: string;
  roll_no: Number;
  phone_number: string;
  phone_verified: boolean;
  email_verified: boolean;
  driver_disabled?: boolean;
  customer_disabled?: boolean;
}

export const userDetails = atom({
  key: 'userDetails',
  default: {
    name: '',
    roll_no: 0,
    phone_number: '',
    phone_verified: false,
    email_verified: false,
  } as userDetails,
});

// Create a variable for state of role ("driver" or "customer")
export const role = atom({
  key: 'role',
  default: 'customer',
});

