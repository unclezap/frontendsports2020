import React from 'react';
import AuthHOC from '../HOC/AuthHOC'

function TitleBar() {
    return(
        // This will render as title, or welcome according to state of APP / props being passed.
        <div>
            <h1>Hindsight is Sports2020!</h1>
            <p>Please login or sign up to see data.</p>
        </div>
    );
};

export default TitleBar;