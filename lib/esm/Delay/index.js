import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
/** Delay children components. See [Docs](https://github.com/jonamat/react-delay-fallback). */
const Delay = ({ timeout = 0, children, fallback, onRender }) => {
    let timerId;
    const [timeoutOver, setTimeoutOver] = useState(!timeout);
    useEffect(() => () => {
        if (timerId)
            clearTimeout(timerId);
    }, []);
    if (!timeoutOver) {
        timerId = setTimeout(() => {
            setTimeoutOver(true);
            timerId = null;
        }, timeout);
        return React.createElement(React.Fragment, null, fallback);
    }
    if (typeof onRender === 'function')
        onRender();
    return React.createElement(React.Fragment, null, children);
};
Delay.propTypes = {
    timeout: PropTypes.number,
    fallback: PropTypes.element,
    onRender: PropTypes.func,
    children: PropTypes.node.isRequired,
};
export default Delay;
