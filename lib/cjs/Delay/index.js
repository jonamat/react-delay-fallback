"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
/** Delay children components. See [Docs](https://github.com/jonamat/react-delay-fallback). */
var Delay = function (_a) {
    var _b = _a.timeout, timeout = _b === void 0 ? 0 : _b, children = _a.children, fallback = _a.fallback, onRender = _a.onRender;
    var timerId;
    var _c = (0, react_1.useState)(!timeout), timeoutOver = _c[0], setTimeoutOver = _c[1];
    (0, react_1.useEffect)(function () { return function () {
        if (timerId)
            clearTimeout(timerId);
    }; }, []);
    if (!timeoutOver) {
        timerId = setTimeout(function () {
            setTimeoutOver(true);
            timerId = null;
        }, timeout);
        return react_1.default.createElement(react_1.default.Fragment, null, fallback);
    }
    if (typeof onRender === 'function')
        onRender();
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.Delay = Delay;
exports.Delay.propTypes = {
    timeout: prop_types_1.default.number,
    fallback: prop_types_1.default.node,
    onRender: prop_types_1.default.func,
    children: prop_types_1.default.node.isRequired,
};
