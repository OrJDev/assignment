import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';

export interface IVariablesState {
    value: Array<IUser>;
}

export const initialState: IVariablesState = {
    value: []
};


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Array<IUser>>) => {
            state.value = action.payload
        },
        add: (state, action: PayloadAction<IVariablesState['value'][number]>) => {
            state.value.push(action.payload);
        },
        remove: (state, action: PayloadAction<IUser>) => {
            state.value = state.value.filter(user =>
                user.user.toLowerCase() !== action.payload.user.toLowerCase());
        }
    },
});

export const { update, add, remove } = userSlice.actions;
export default userSlice.reducer;