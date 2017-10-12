import React from 'react';

const Home = (props) => (
    <div>
        <p>Hello Home</p>
        <p>props: {Object.keys(props).join()}</p>
    </div>
)

export default Home
