(this.webpackJsonptestapp=this.webpackJsonptestapp||[]).push([[4],{18:function(e,t,r){"use strict";function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}r.d(t,"a",(function(){return n}))},19:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}r.d(t,"a",(function(){return n}))},20:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function c(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}r.d(t,"a",(function(){return c}))},21:function(e,t,r){"use strict";function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e){return(c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.d(t,"a",(function(){return o}));var a=r(18);function i(e,t){return!t||"object"!==c(t)&&"function"!==typeof t?Object(a.a)(e):t}function o(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,c=n(e);if(t){var a=n(this).constructor;r=Reflect.construct(c,arguments,a)}else r=c.apply(this,arguments);return i(this,r)}}},22:function(e,t,r){"use strict";function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}r.d(t,"a",(function(){return c}))},29:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}r.r(t);var i=r(19),o=r(20),s=r(18),u=r(22),l=r(21),h=r(1),f=r.n(h),b=r(6),g=r(2),y=r(0),v=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).handleLangClick=r.handleLangClick.bind(Object(s.a)(r)),r.handleSearchClick=r.handleSearchClick.bind(Object(s.a)(r)),r.handleSearchChange=r.handleSearchChange.bind(Object(s.a)(r)),r.toggleSearchIconHover=r.toggleSearchIconHover.bind(Object(s.a)(r)),r.toggleSearchBarHover=r.toggleSearchBarHover.bind(Object(s.a)(r)),r.toggleSearchFocus=r.toggleSearchFocus.bind(Object(s.a)(r)),r.searchBar=f.a.createRef(null),r.state={lang:localStorage.getItem("displayLang"),searchValue:"",searchClickState:!1,hoverSearchIcon:!1,hoverSearchBar:!1,searchOnFocus:!1},r}return Object(o.a)(n,[{key:"handleLangClick",value:function(){this.setState((function(e){return"English"===e.lang?(localStorage.setItem("displayLang","Chinese"),a(a({},e),{},{lang:"Chinese"})):(localStorage.setItem("displayLang","English"),a(a({},e),{},{lang:"English"}))}))}},{key:"handleSearchClick",value:function(){var e=this;this.setState((function(t){return t.searchClickState?""===e.searchBar.current.value&&(e.searchBar.current.style.width="0%",e.searchBar.current.style.visibility="hidden"):(e.searchBar.current.style.width="60%",e.searchBar.current.style.visibility="visible"),a(a({},t),{},{searchClickState:!t.searchClickState})}))}},{key:"toggleSearchIconHover",value:function(){var e=this;this.setState((function(t){return!t.hoverSearchIcon||e.state.searchClickState||e.state.searchOnFocus?t.hoverSearchIcon||(e.searchBar.current.style.width="60%",e.searchBar.current.style.visibility="visible"):""===e.searchBar.current.value&&(e.searchBar.current.style.width="0%",e.searchBar.current.style.visibility="hidden"),{hoverSearchIcon:!t.hoverSearchIcon}}))}},{key:"toggleSearchBarHover",value:function(){var e=this;this.setState((function(t){return!t.hoverSearchBar||e.state.searchOnFocus||e.state.searchClickState?(e.searchBar.current.style.width="60%",e.searchBar.current.style.visibility="visible"):""===e.searchBar.current.value&&(e.searchBar.current.style.width="0%",e.searchBar.current.style.visibility="hidden"),{hoverSearchBar:!t.hoverSearchBar}}))}},{key:"toggleSearchFocus",value:function(e){var t=this;this.setState((function(r){return r.searchOnFocus&&!t.state.searchClickState?""===t.searchBar.current.value&&(e.target.style.width="0%",e.target.style.visibility="hidden"):r.searchOnFocus||(e.target.style.width="60%",e.target.style.visibility="visible"),{searchOnFocus:!r.searchOnFocus}}))}},{key:"handleSearchChange",value:function(e){this.setState((function(t){return a(a({},t),{},{searchValue:e.target.value})}))}},{key:"render",value:function(){var e=Object(g.a)((function(){return r.e(6).then(r.bind(null,28))}));return Object(y.jsxs)(f.a.Fragment,{children:[Object(y.jsxs)("div",{className:"search-div",children:[Object(y.jsx)("div",{className:"search-img-div",onClick:this.handleSearchClick,onMouseEnter:this.toggleSearchIconHover,onMouseLeave:this.toggleSearchIconHover,children:Object(y.jsx)("img",{src:"https://img.icons8.com/color/48/4a90e2/search--v2.png",alt:"search:",className:"search-img"})}),Object(y.jsx)("input",{ref:this.searchBar,id:"search",type:"text",value:this.state.searchValue,theme:this.context,onChange:this.handleSearchChange,className:"search-input",onMouseEnter:this.toggleSearchBarHover,onMouseLeave:this.toggleSearchBarHover,onFocus:this.toggleSearchFocus,onBlur:this.toggleSearchFocus,placeholder:"Search..."})]}),Object(y.jsx)("div",{className:"lang-btn-div",children:Object(y.jsx)("button",{type:"button",className:"lang-btn",onClick:this.handleLangClick,theme:this.context,children:this.state.lang})}),Object(y.jsx)("div",{className:"countries-list-div",children:Object(y.jsx)(e,{countries:this.props.countries,search:this.state.searchValue,lang:this.state.lang})})]})}}]),n}(f.a.Component);v.contextType=b.a;t.default=v}}]);
//# sourceMappingURL=4.df330234.chunk.js.map