import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { remove, update } from '../redux/users';
import { IUser } from '../types';

interface IProps { }

const RenderUsers: React.FC<IProps> = ({ }) => {
    const users = useAppSelector(state => state.users.value)
    const dispatch = useAppDispatch();
    const onDelete = React.useCallback((user: IUser) => {
        dispatch(remove(user))
    }, [])
    return (
        <>
            {users.map((item, index) => {
                return (
                    <div
                        key={index}
                        className='relative p-5 m-3 rounded-xl items-center flex flex-col w-2/5 bg-[#cfd4db] h-32'>
                        <button onClick={() => onDelete(item)} className='p-3 w-20 bg-red-600 rounded-lg absolute right-3 top-3'>
                            <h1 className='text-white font-bold text-md'>Delete</h1>
                        </button>
                        <h1 className='text text-3xl font-semibold capitalize'>{item.user}</h1>
                        <div className='flex flex-row gap-14'>
                            <RenderCol
                                name='Country'
                                value={item.nation.country.country_id}
                                prob={item.nation.country.probability}
                            />
                            <RenderCol
                                name='Gender'
                                value={item.gender.gender}
                                prob={item.gender.probability}
                            />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default RenderUsers;

interface IRenderColProps {
    name: string;
    value: string;
    prob: number;
}

const RenderCol: React.FC<IRenderColProps> = ({ name, value, prob }) => {
    return (
        <div>
            <div className='flex flex-row items-center'>
                <h1 className='font-semibold text-lg'>{name}: </h1>
                <h1 className='font-bold text-lg text-gray-500 ml-2 capitalize'>
                    {value}
                </h1>
            </div>
            <div className='flex flex-row items-center'>
                <h1 className='font-semibold text-lg'>Probabilty: </h1>
                <h1 className='font-bold text-lg text-gray-500 ml-2'>
                    {prob}
                </h1>
            </div>
        </div>
    )
}