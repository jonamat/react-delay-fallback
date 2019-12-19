import React, { FC, useState, useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface DelayProps {
    /** Render delay. Default `0` */
    timeout?: number;
    /** Component to render instead of children while waiting.*/
    fallback?: JSX.Element;
    /** Function to trigger on render. */
    onRender?: (...args: Array<unknown>) => unknown;
    children?: ReactNode;
}

/** Delay children components. See [Docs](https://github.com/jonamat/react-delay-fallback). */
const Delay: FC<DelayProps> = ({ timeout = 0, children, fallback, onRender }) => {
    let timerId: NodeJS.Timeout | null;
    const [timeoutOver, setTimeoutOver] = useState<boolean>(!timeout);

    useEffect(
        () => () => {
            if (timerId) clearTimeout(timerId);
        },
        [],
    );

    if (!timeoutOver) {
        timerId = setTimeout(() => {
            setTimeoutOver(true);
            timerId = null;
        }, timeout);
        return <>{fallback}</>;
    }

    if (typeof onRender === 'function') onRender();

    return <>{children}</>;
};

Delay.propTypes = {
    timeout: PropTypes.number,
    fallback: PropTypes.element,
    onRender: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Delay;
