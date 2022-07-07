import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGender, INation } from '../types';

export interface IVariablesState {
    value: Array<{
        user: string;
        nation: INation | null;
        gender: IGender | null;
    }>;
}

export const initialState: IVariablesState = {
    value: []
};

type IAction = PayloadAction<{
    key: keyof IVariablesState['value'],
    value: any
}>;
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        update: (state, action: IAction) => {
            state.value[action.payload.key] = action.payload.value as never;
        },
        add: (state, action: PayloadAction<IVariablesState['value'][number]>) => {
            state.value.push(action.payload);
        }
    },
});

export const { update, add } = userSlice.actions;
export default userSlice.reducer;