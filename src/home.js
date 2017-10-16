import React from 'react';

import Link from '../ssr/share/link';

const Home = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            {
                props.posts ? Object.keys(props.posts).map((key, i) => {
                    const item = props.posts[key];
                    return (
                        <Link key={i} to={`/detail/${key}`}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                            <hr/>
                        </Link>
                    )
                }) : null
            }
        </div>
    )
}

export default Home
