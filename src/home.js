import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            {
                Object.keys(props.posts).map((key, i) => {
                    const item = props.posts[key];
                    return (
                        <Link key={i} to={`/detail/${key}`}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                            <hr/>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Home
