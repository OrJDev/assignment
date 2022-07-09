import React from 'react';
import { AddUser, RenderUsers } from './components';

interface IProps { }

const App: React.FC<IProps> = ({ }) => {
    const [error, setError] = React.useState<string | null>(null)

    return (
        <div className='flex items-center flex-col py-5 w-full h-full'>
            {error ? <h1 className='text-red-600 text-lg'>{error}</h1> : null}
            <AddUser setError={setError} />
            <RenderUsers />
        </div>
    )
}

export default App;