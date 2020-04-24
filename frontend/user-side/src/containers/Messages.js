import React, {useState, useEffect} from 'react';

import Loader from 'react-loader-spinner';


import axios from '../axios';

const Messages = () => {

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

    });
    return (
        <>
        {isLoading?(          
        <div style={{backgroundColor: '#fff', textAlign: 'center', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loader 
                type="Bars"
                color="#9200e6"
                height={200}
                width={200}
            />
        </div>):(
            <h1>Hello</h1>
        )}
        </>
    )
};

export default Messages;