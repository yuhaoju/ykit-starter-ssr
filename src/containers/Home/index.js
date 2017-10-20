import React from 'react';

import Link from 'SSR/link';
import { StyleSheet, css } from 'aphrodite';

const Home = (props) => {
    return (
        <div>
            <h1 className={css(styles.red)}>Home Page</h1>
            {
                props.posts ? Object.keys(props.posts).map((key, i) => {
                    const show = props.posts[key].show;
                    return (
                        <Link key={i} to={`/detail/${key}`}>
                            <h3>{show.name}</h3>
                            <p>{show.summary}</p>
                            <hr/>
                        </Link>
                    )
                }) : null
            }
        </div>
    )
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    },

    blue: {
        backgroundColor: 'blue'
    },

    hover: {
        ':hover': {
            backgroundColor: 'red'
        }
    },

    small: {
        '@media (max-width: 600px)': {
            backgroundColor: 'red',
        }
    }
});

export default Home
