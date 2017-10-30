import React from 'react';

import Link from 'SSR/link';
import { StyleSheet, css } from 'aphrodite';

const Home = (props) => {
    return (
        <div>
            <h1 className={css(styles.header)}>Home Page</h1>
            {
                props.posts ? Object.keys(props.posts).map((key, i) => {
                    const show = props.posts[key].show;
                    return (
                        <Link key={i} to={`/detail/${key}`}>
                            <div className={css(styles.item)}>
                                <h3 className={css(styles.itemTitle)}>{show.name}</h3>
                                <p className={css(styles.summary)}>{show.summary}</p>
                            </div>
                            <hr/>
                        </Link>
                    )
                }) : null
            }
        </div>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: '5px 12px',
        color: '#fff',
        backgroundColor: '#444'
    },
    item: {
        padding: '5px 12px'
    },
    itemTitle: {
        marginBottom: '8px',
        fontSize: '20px',
        color: '#444'
    },
    summary: {
        color: '#666'
    },
});

export default Home
