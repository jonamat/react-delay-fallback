# react-delay-fallback

![version](https://img.shields.io/npm/v/react-delay-fallback)
![size](https://img.shields.io/bundlephobia/min/react-delay-fallback)
![download](https://img.shields.io/npm/dm/react-delay-fallback)

React component to delay children rendering and show a fallback component while waiting

## Installation

```cli
npm i react-delay-fallback
```

## Compatibility

Compatible with React >=16.8.0\
Compatible with Node >=8.0.0

## Features
- Extremely small: uses react hooks and will occupying less than 2kb in your final bundle
- Safe unmounting: clears timers and listeners at unmounting

### Other features
- Runtime type checking with prop-types and static with typescript declaration files
- Exhaustive doc comments
- Tree shakable: exported with ESM modules
- Tested with available coverage report

## API

Index

[Delay](#Delay)

---

#### Delay

```import { Delay } from 'react-delay-fallback```

Type: `FunctionComponent`

| Prop        | Type        | Default     | Usage                                                 |
| ----------- | ----------- | ----------- | ----------------------------------------------------- |
| `timeout`?  | `number`    | `0`         | Time in milliseconds for rendering                    |
| `fallback`? | `ReactNode` | `undefined` | Component to render instead of children while waiting |
| `onRender`? | `Function`  | `undefined` | Function to trigger on render                         |

---

## Usage examples

```jsx
import { Delay } from 'react-delay-fallback';

function App() {
    const handleOnRender = () => window.alert('Callback invoked at rendering');

    return (
        <Delay
        timeout={5000}
        fallback={<span>Wait a moment...</span>} // <-- this will be rendered while page is loading
        onRender={handleOnRender}>
            <h1>This</h1>
            <p>Will appear after 5 seconds</p>
        </Delay>
    );
}

```

## Dependencies

No dependencies

### Peer dependencies
- React: ^16.8.0
- ReactDOM: ^15.6.2

## License
MIT
