(this.webpackJsonptestapp=this.webpackJsonptestapp||[]).push([[8],{61:function(t,e,c){"use strict";c.r(e);var n=c(0),r=c.n(n),s=(c(25),c(14)),j=c(45),a=c(1),i=function(t){var e=r.a.useContext(s.a);return Object(a.jsx)(r.a.Fragment,{children:Object(a.jsx)("div",{className:"country-div",onClick:function(e){alert("You are clicking: "+t.country.name)},theme:e,children:Object(a.jsxs)("div",{className:"country-content-div",children:[Object(a.jsx)("div",{className:"country-flag-div",children:Object(a.jsx)(l,{country:t.country})}),Object(a.jsx)("div",{className:"country-title-div",children:Object(a.jsx)(d,{country:t.country})}),Object(a.jsx)("div",{className:"content-table-div",children:Object(a.jsx)(o,{country:t.country})})]})})})},l=function(t){var e=t.country,c=e.flag,n=e.name;return Object(a.jsx)("img",{className:"country-flag-img",src:c,alt:n})},d=function(t){var e=t.country.name;return Object(a.jsx)("h2",{className:"country-title-h2",children:e})},o=function(t){var e=t.country,c=e.code,n=e.continent,i=e.language,l=e.capital,d=e.currency,o=r.a.useContext(s.a),u=Object(j.a)().t;return Object(a.jsxs)("table",{className:"content-table",theme:o,children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:u("metadata")}),Object(a.jsx)("th",{children:u("value")})]})}),Object(a.jsxs)("tbody",{children:[Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:u("code")}),Object(a.jsx)("td",{children:c})]}),Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:u("continent")}),Object(a.jsx)("td",{children:n})]}),Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:u("language")}),Object(a.jsx)("td",{children:i.join(", ")})]}),Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:u("capital")}),Object(a.jsx)("td",{children:l})]}),Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:u("currency")}),Object(a.jsx)("td",{children:d})]})]})]})};e.default=function(t){return Object(a.jsx)(r.a.Fragment,{children:(e=t.countries,c=t.search,e.map((function(t){return t.name.toLowerCase().includes(c.toLowerCase())||""===c?Object(a.jsx)(i,{country:t},t.code):null})))});var e,c}}}]);
//# sourceMappingURL=8.7bdd4137.chunk.js.map