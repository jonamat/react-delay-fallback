import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { create } from 'react-test-renderer';

import { Delay } from '..';

jest.useFakeTimers();
const onRender = jest.fn();

const consoleError = jest.fn();
Object.defineProperty(console, 'error', {
    get() {
        return consoleError;
    },
});

beforeEach(() => {
    consoleError.mockClear();
    onRender.mockClear();
});

const renderComponent = (props?: React.ComponentProps<typeof Delay>) =>
    render(
        <Delay {...props}>
            <div data-testid="children">Hello world!</div>
        </Delay>,
    );

describe('Component', () => {
    it('render properly', () => {
        expect(() => {
            const { queryByTestId } = renderComponent({ timeout: 1000 });

            expect(consoleError).not.toBeCalled();
            expect(queryByTestId('children')).not.toBeInTheDocument();

            jest.runAllTimers();

            expect(queryByTestId('children')).toBeInTheDocument();
        }).not.toThrowError();
    });

    it('validates props', () => {
        renderComponent({ timeout: 'not a number' });
        renderComponent({ fallback: { something: 'wrong' } });
        renderComponent({ onRender: 'not a function' });

        expect(consoleError).toBeCalledTimes(3);
    });

    it('shows fallback first and children at timeout', () => {
        const { queryByTestId } = renderComponent({
            timeout: 1000,
            fallback: <div data-testid="fallback" />,
        });

        expect(queryByTestId('fallback')).toBeInTheDocument();
        expect(queryByTestId('children')).not.toBeInTheDocument();

        jest.runAllTimers();

        expect(queryByTestId('fallback')).not.toBeInTheDocument();
        expect(queryByTestId('children')).toBeInTheDocument();
    });

    it('invokes onRender at timeout', () => {
        renderComponent({ timeout: 1000, onRender });

        expect(onRender).not.toBeCalled();

        jest.runAllTimers();

        expect(onRender).toBeCalledTimes(1);
    });

    it('shows chidren if props are undefined', () => {
        const { queryByTestId } = renderComponent();

        expect(consoleError).not.toBeCalled();
        expect(queryByTestId('children')).toBeInTheDocument();
    });

    it('clear interval at unmount', () => {
        const { unmount } = renderComponent({ timeout: 1000 });

        unmount();

        expect(clearTimeout).toBeCalledTimes(1);
    });

    it('matches the snapshot', () => {
        const fallbackSnapshoot = create(<Delay timeout={100} fallback={<div>fallback snapshot</div>} />).toJSON();

        expect(fallbackSnapshoot).toMatchSnapshot();

        const childSnapshoot = create(
            <Delay timeout={0}>
                <div>child snapshot</div>
            </Delay>,
        ).toJSON();

        expect(childSnapshoot).toMatchSnapshot();
    });
});
