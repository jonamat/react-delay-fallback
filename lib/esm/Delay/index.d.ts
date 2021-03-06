import { FC, ReactNode } from 'react';
export interface DelayProps {
    /** Render delay. Default `0` */
    timeout?: number;
    /** Component to render instead of children while waiting.*/
    fallback?: ReactNode;
    /** Function to trigger on render. */
    onRender?: (...args: Array<unknown>) => unknown;
    children?: ReactNode;
}
/** Delay children components. See [Docs](https://github.com/jonamat/react-delay-fallback). */
export declare const Delay: FC<DelayProps>;
