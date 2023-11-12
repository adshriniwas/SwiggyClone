import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        createUser: (state,action)=> {
            return(
                [...state, {...action.payload}]
            )
        },
        resetPassword: (state,action)=> {
            return void(
                state.map((user,i)=> {
                    if(user.email===action.payload.email){
                        user.password = action.payload.password
                        return user
                    }else {
                        return user
                    }
                })
            )  
        }
    }
})

export const {
    createUser,
    resetPassword
} = userSlice.actions
 
export default userSlice.reducer