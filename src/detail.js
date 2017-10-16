import React from 'react';

import Link from '../ssr/share/link';

export default(props) => {
    return (
        <div>
            <Link to="/">
                back
            </Link>
            <h1>Detail Page {props.match.params.id}</h1>
        </div>
    )
}
