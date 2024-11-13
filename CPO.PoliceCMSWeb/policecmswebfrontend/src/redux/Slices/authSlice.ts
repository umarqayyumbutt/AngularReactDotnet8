import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store/store';
// import { RootState } from '../../app/store';

interface User {
    // id: string;
    // username: string;
    // email: string;
    // roles: string[];
    resource_Name:string
    cellNo:string
    shiftId:number
    provinceId:number
    regionId:number
    districtId:number
    divisionId:number
    circleId:number
    beatId:number
    isDeleted:boolean
    createdBy:number
    createdOn:Date
    modifiedBy:number
    modifiedOn:Date
    id:number
    userName:string
    normalizedUserName:string
    email:string
    normalizedEmail:string
    emailConfirmed:boolean
    passwordHash:string
    securityStamp:string
    concurrencyStamp:string
    phoneNumber:string
    phoneNumberConfirmed:boolean
    twoFactorEnabled:boolean
    lockoutEnd:string
    lockoutEnabled:boolean
    accessFailedCount:number
  }

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  roles:string[];
  loginTime:number|null,
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user:null,
  roles:['0'],
  loginTime:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{token:string,user:User,roles:string[],loginTime:number}>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      //console.log(action.payload.user);
      state.user=action.payload.user;
      state.roles=action.payload.roles;
      state.loginTime = action.payload.loginTime;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user=null;
      state.loginTime=null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const loginTime = (state: RootState) => state.auth;
export default authSlice.reducer;