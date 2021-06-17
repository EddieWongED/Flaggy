import React, {useState, Suspense} from 'react'
import ReactDom from 'react-dom'
import loadable from '@loadable/component'
import './index.css'
import {createResource} from './API'

const resource = createResource();
console.log(resource);

// stateless functional component (must captialize the first character)
function App() {
  
  createLocalStorage();

  const [countries, setCountries] = useState(resource.countries);

  const Clock = loadable(() => import('./Component/Clock.js'));
  const Number = loadable(() => import('./Component/Number.js'));
  const CountriesSection = loadable(() => import('./Component/CountriesSection.js'));

  //const Number = loadable(() => import('./Number.js'));
  return (
    <div className="page-root">
      <div className="top">
        <div className="title">
          <h1>Title</h1>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Number resource={resource}/>
          </Suspense> 
        </div>
        <div className="clock">
          <Suspense fallback={<div>Loading...</div>}>
            <Clock />
          </Suspense>
        </div>
      </div>
      <div className="bottom">
        <CountriesSection countries={countries} setCountries={setCountries}/>
      </div>
        
    </div>
  );
}

function createLocalStorage() {
  if (localStorage.getItem("displayLang") == null)
  {
    localStorage.setItem("displayLang", "English");
  }
}


ReactDom.render(<App/>, document.getElementById('root'));