import React from 'react';
import { useAppDispatch, useAppSelector } from "./redux/app/hooks"
import { add } from './redux/users';
import axios from 'axios';

interface IProps { }

const App: React.FC<IProps> = ({ }) => {
    const users = useAppSelector(state => state.users.value)
    const [name, setName] = React.useState('')
    const dispatch = useAppDispatch();

    const addUser = React.useCallback(async () => {
        try {
            let res = await axios(`http://localhost:4000/api/all/${name}`)
            dispatch(add({ user: name, ...res.data.data }))
        } catch { }
    }, [name]);

    return (
        <div className='flex items-center flex-col py-5 w-full h-full'>
            <div className='p-3 flex flex-col bg-[#cfd4db] items-center rounded-lg w-1/5'>
                <h1 className='text-xl text-bold'>Add New User</h1>
                <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='rounded-lg m-2 p-1 focus:outline-none text-md font-semibold'
                    placeholder='Name'
                />
                <button onClick={addUser} className='w-2/4 p-2 rounded-lg bg-orange-300'>
                    <h1 className='text-lg font-bold'>Submit</h1>
                </button>
            </div>
            {users.map((item, index) => {
                return (
                    <div
                        key={index}
                        className='p-5 m-3 rounded-xl items-center flex flex-col w-2/5 bg-[#cfd4db] h-32'>
                        <h1 className='text text-3xl font-bold capitalize'>{item.user}</h1>
                        <div className='flex flex-row gap-14'>
                            {item.nation ? <RenderCol
                                name='Country'
                                value={item.nation.country.country_id}
                                prob={item.nation.country.probability}
                            /> : null}
                            {item.gender ? <RenderCol
                                name='Gender'
                                value={item.gender.gender}
                                prob={item.gender.probability}
                            /> : null}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default App;


const RenderCol = ({ name, value, prob }: { name: string; value: string; prob: number; }) => {
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