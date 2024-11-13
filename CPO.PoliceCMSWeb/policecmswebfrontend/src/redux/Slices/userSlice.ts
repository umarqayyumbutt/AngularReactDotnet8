import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface UserState{
currentUser:{name:string}|null;
roles: { id: number; name: string }[];
    // id:string;
    // username:string;
    // email:string;
    // token:string;
}
const initialState:UserState={
    currentUser: null,
    roles: []
    
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<{name:string}>)=>{
            state.currentUser=action.payload;
            //state.loggedIn=action.payload.loggedIn;
        }
        ,setRoles:(state,action:PayloadAction<{id:number;name:string}[]>)=>{
            state.roles=action.payload;
        }
        // clearUserInfo:(state)=>{
        //     state.user='';
        //     state.loggedIn=false;
        //     // state.email='';
        //     // state.token='';
        // }
    }
});

export const{setUser,setRoles}=userSlice.actions;
export default userSlice.reducer;