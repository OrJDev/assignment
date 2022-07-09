import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import axios from 'axios';
import { add } from '../redux/users';
import { convertError } from '../utils';

interface IProps {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AddUser: React.FC<IProps> = ({ setError }) => {
    const users = useAppSelector(state => state.users.value);
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState('')
    const addUser = React.useCallback(async () => {
        if (!name) {
            setError('Name is required')
        } else if (users.find(e => e.user.toLowerCase() === name.toLowerCase())) {
            setError('User already exists')
        } else {
            try {
                let res = await axios(`http://localhost:4000/api/all/${name}`)
                dispatch(add({
                    user: name,
                    ...res.data['data']
                }))
                setError(null)
                setName('')
            } catch (e) {
                setError(convertError(e))
            }
        }
    }, [name]);
    return (
        <div className='p-3 flex flex-col bg-[#cfd4db] items-center rounded-lg w-1/5'>
            <h1 className='text-xl text-bold'>Add New User</h1>
            <input
                type='text'
                value={name}
                onChange={e => {
                    setError(null)
                    setName(e.target.value)
                }}
                className='rounded-lg m-2 p-1 focus:outline-none text-md font-semibold'
                placeholder='Name'
            />
            <button onClick={addUser} className='w-2/4 p-2 rounded-lg bg-orange-300'>
                <h1 className='text-lg font-bold'>Submit</h1>
            </button>
        </div>
    )
}

export default AddUser;