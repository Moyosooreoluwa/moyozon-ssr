"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Col_Container_Row_react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Col,Container,Row!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Container.js\");\n/* harmony import */ var _barrel_optimize_names_Col_Container_Row_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Col,Container,Row!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Row.js\");\n/* harmony import */ var _barrel_optimize_names_Col_Container_Row_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Col,Container,Row!=!react-bootstrap */ \"(app-pages-browser)/./node_modules/react-bootstrap/esm/Col.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst reducer = (state, action)=>{\n    switch(action.type){\n        case 'FETCH_REQUEST':\n            return {\n                ...state,\n                loading: true\n            };\n        case 'FETCH_SUCCESS':\n            return {\n                ...state,\n                products: action.payload,\n                loading: false\n            };\n        case 'FETCH_FAIL':\n            return {\n                ...state,\n                loading: false,\n                error: action.payload\n            };\n        default:\n            return state;\n    }\n};\nfunction Home() {\n    _s();\n    const [{ loading, error, products }, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, {\n        products: [],\n        loading: true,\n        error: ''\n    });\n    // const [products, setProducts] = useState([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Home.useEffect\": ()=>{\n            const fetchData = {\n                \"Home.useEffect.fetchData\": async ()=>{\n                    dispatch({\n                        type: 'FETCH_REQUEST'\n                    });\n                    try {\n                        const result = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get('/api/product');\n                        dispatch({\n                            type: 'FETCH_SUCCESS',\n                            payload: result.data\n                        });\n                    } catch (err) {\n                        dispatch({\n                            type: 'FETCH_FAIL',\n                            payload: err\n                        });\n                    }\n                // setProducts(result.data);\n                }\n            }[\"Home.useEffect.fetchData\"];\n            fetchData();\n        }\n    }[\"Home.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Container_Row_react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n            className: \"my-2\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"Featured Products\"\n                    }, void 0, false, {\n                        fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                        lineNumber: 44,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"products\",\n                        children: loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: \"Loading...\"\n                        }, void 0, false, {\n                            fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                            lineNumber: 47,\n                            columnNumber: 15\n                        }, this) : error ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: error\n                        }, void 0, false, {\n                            fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                            lineNumber: 49,\n                            columnNumber: 15\n                        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Container_Row_react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            children: products.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Container_Row_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                    sm: 6,\n                                    md: 4,\n                                    lg: 3,\n                                    className: \"mb-3\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: product.name\n                                    }, void 0, false, {\n                                        fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                                        lineNumber: 55,\n                                        columnNumber: 21\n                                    }, this)\n                                }, product.slug, false, {\n                                    fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                                    lineNumber: 53,\n                                    columnNumber: 19\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                            lineNumber: 51,\n                            columnNumber: 15\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                        lineNumber: 45,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n                lineNumber: 43,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/moyosooreoluwa/Documents/CODING PROJECTS/WEBDEV/moyozon-ssr/frontend/src/app/page.tsx\",\n            lineNumber: 42,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n}\n_s(Home, \"02cXYkWU98eOLzOyMnlZNAPamVU=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUMwQjtBQUNvQjtBQUNRO0FBRXRELE1BQU1NLFVBQVUsQ0FBQ0MsT0FBT0M7SUFDdEIsT0FBUUEsT0FBT0MsSUFBSTtRQUNqQixLQUFLO1lBQ0gsT0FBTztnQkFBRSxHQUFHRixLQUFLO2dCQUFFRyxTQUFTO1lBQUs7UUFDbkMsS0FBSztZQUNILE9BQU87Z0JBQUUsR0FBR0gsS0FBSztnQkFBRUksVUFBVUgsT0FBT0ksT0FBTztnQkFBRUYsU0FBUztZQUFNO1FBQzlELEtBQUs7WUFDSCxPQUFPO2dCQUFFLEdBQUdILEtBQUs7Z0JBQUVHLFNBQVM7Z0JBQU9HLE9BQU9MLE9BQU9JLE9BQU87WUFBQztRQUMzRDtZQUNFLE9BQU9MO0lBQ1g7QUFDRjtBQUVlLFNBQVNPOztJQUN0QixNQUFNLENBQUMsRUFBRUosT0FBTyxFQUFFRyxLQUFLLEVBQUVGLFFBQVEsRUFBRSxFQUFFSSxTQUFTLEdBQUdiLGlEQUFVQSxDQUFDSSxTQUFTO1FBQ25FSyxVQUFVLEVBQUU7UUFDWkQsU0FBUztRQUNURyxPQUFPO0lBQ1Q7SUFDQSxnREFBZ0Q7SUFDaERaLGdEQUFTQTswQkFBQztZQUNSLE1BQU1lOzRDQUFZO29CQUNoQkQsU0FBUzt3QkFBRU4sTUFBTTtvQkFBZ0I7b0JBQ2pDLElBQUk7d0JBQ0YsTUFBTVEsU0FBUyxNQUFNakIsNkNBQUtBLENBQUNrQixHQUFHLENBQUM7d0JBQy9CSCxTQUFTOzRCQUFFTixNQUFNOzRCQUFpQkcsU0FBU0ssT0FBT0UsSUFBSTt3QkFBQztvQkFDekQsRUFBRSxPQUFPQyxLQUFLO3dCQUNaTCxTQUFTOzRCQUFFTixNQUFNOzRCQUFjRyxTQUFTUTt3QkFBSTtvQkFDOUM7Z0JBRUEsNEJBQTRCO2dCQUM5Qjs7WUFDQUo7UUFDRjt5QkFBRyxFQUFFO0lBQ0wscUJBQ0U7a0JBQ0UsNEVBQUNaLGdHQUFTQTtZQUFDaUIsV0FBVTtzQkFDbkIsNEVBQUNDOztrQ0FDQyw4REFBQ0M7a0NBQUc7Ozs7OztrQ0FDSiw4REFBQ0Q7d0JBQUlELFdBQVU7a0NBQ1pYLHdCQUNDLDhEQUFDWTtzQ0FBSTs7Ozs7bUNBQ0hULHNCQUNGLDhEQUFDUztzQ0FBS1Q7Ozs7O2lEQUVOLDhEQUFDUixnR0FBR0E7c0NBQ0RNLFNBQVNhLEdBQUcsQ0FBQyxDQUFDQyx3QkFDYiw4REFBQ3RCLGdHQUFHQTtvQ0FBb0J1QixJQUFJO29DQUFHQyxJQUFJO29DQUFHQyxJQUFJO29DQUFHUCxXQUFVOzhDQUVyRCw0RUFBQ1E7a0RBQUdKLFFBQVFLLElBQUk7Ozs7OzttQ0FGUkwsUUFBUU0sSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWXhDO0dBOUN3QmpCO0tBQUFBIiwic291cmNlcyI6WyIvVXNlcnMvbW95b3Nvb3Jlb2x1d2EvRG9jdW1lbnRzL0NPRElORyBQUk9KRUNUUy9XRUJERVYvbW95b3pvbi1zc3IvZnJvbnRlbmQvc3JjL2FwcC9wYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ29sLCBDb250YWluZXIsIFJvdyB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnRkVUQ0hfUkVRVUVTVCc6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgbG9hZGluZzogdHJ1ZSB9O1xuICAgIGNhc2UgJ0ZFVENIX1NVQ0NFU1MnOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHByb2R1Y3RzOiBhY3Rpb24ucGF5bG9hZCwgbG9hZGluZzogZmFsc2UgfTtcbiAgICBjYXNlICdGRVRDSF9GQUlMJzpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IGFjdGlvbi5wYXlsb2FkIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW3sgbG9hZGluZywgZXJyb3IsIHByb2R1Y3RzIH0sIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIocmVkdWNlciwge1xuICAgIHByb2R1Y3RzOiBbXSxcbiAgICBsb2FkaW5nOiB0cnVlLFxuICAgIGVycm9yOiAnJyxcbiAgfSk7XG4gIC8vIGNvbnN0IFtwcm9kdWN0cywgc2V0UHJvZHVjdHNdID0gdXNlU3RhdGUoW10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0ZFVENIX1JFUVVFU1QnIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL3Byb2R1Y3QnKTtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnRkVUQ0hfU1VDQ0VTUycsIHBheWxvYWQ6IHJlc3VsdC5kYXRhIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0ZFVENIX0ZBSUwnLCBwYXlsb2FkOiBlcnIgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldFByb2R1Y3RzKHJlc3VsdC5kYXRhKTtcbiAgICB9O1xuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbXSk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPVwibXktMlwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT5GZWF0dXJlZCBQcm9kdWN0czwvaDE+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9kdWN0c1wiPlxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgIDxkaXY+TG9hZGluZy4uLjwvZGl2PlxuICAgICAgICAgICAgKSA6IGVycm9yID8gKFxuICAgICAgICAgICAgICA8ZGl2PntlcnJvcn08L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxSb3c+XG4gICAgICAgICAgICAgICAge3Byb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPENvbCBrZXk9e3Byb2R1Y3Quc2x1Z30gc209ezZ9IG1kPXs0fSBsZz17M30gY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICB7LyogPFByb2R1Y3QgcHJvZHVjdD17cHJvZHVjdH0+PC9Qcm9kdWN0PiAqL31cbiAgICAgICAgICAgICAgICAgICAgPHA+e3Byb2R1Y3QubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9Sb3c+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgIDwvPlxuICApO1xufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwidXNlRWZmZWN0IiwidXNlUmVkdWNlciIsIkNvbCIsIkNvbnRhaW5lciIsIlJvdyIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJsb2FkaW5nIiwicHJvZHVjdHMiLCJwYXlsb2FkIiwiZXJyb3IiLCJIb21lIiwiZGlzcGF0Y2giLCJmZXRjaERhdGEiLCJyZXN1bHQiLCJnZXQiLCJkYXRhIiwiZXJyIiwiY2xhc3NOYW1lIiwiZGl2IiwiaDEiLCJtYXAiLCJwcm9kdWN0Iiwic20iLCJtZCIsImxnIiwicCIsIm5hbWUiLCJzbHVnIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});