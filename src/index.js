import React, {useState, Suspense} from 'react'
import ReactDom from 'react-dom'
import loadable from '@loadable/component'

import './index.css'
import {createResource} from './API'
import {ThemeContext} from './Theme';

const resource = createResource();
console.log(resource);

// stateless functional component (must captialize the first character)
function App() {
  
  createLocalStorage();

  const [countries, setCountries] = useState(resource.countries);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [navBarShown, setNavBarShown] = React.useState(false)

  const Clock = loadable(() => import('./Component/Clock.js'));
  const Number = loadable(() => import('./Component/Number.js'));
  const CountriesSection = loadable(() => import('./Component/CountriesSection.js'));
  const NavBar = loadable(() => import('./Component/NavBar.js'));
  

  function handleThemeClick() {
    setTheme(prevState => {
      return prevState === "dark" ? "light" : "dark"
    });

    localStorage.setItem("theme", theme === "dark" ? "light" : "dark"); 
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="page-root-div" theme={theme}>
        <div className="page-left-div" theme={theme}>
          <NavBar navBarShown={navBarShown} setNavBarShown={setNavBarShown} handleThemeClick={handleThemeClick}/>
        </div>
        <div className="page-right-div" theme={theme}>
          <div className="top-div">
            <div className="title-div">
              <h1>Countries List</h1> 
            </div>
            <div className="clock-div">
              <Suspense fallback={<div>Loading...</div>}>
                <Clock />
              </Suspense>
            </div>
          </div>
          <div className="bottom-div">
            <CountriesSection countries={countries} setCountries={setCountries}/>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function createLocalStorage() {
  if (localStorage.getItem("displayLang") === null)
  {
    localStorage.setItem("displayLang", "English");
  }
  if (localStorage.getItem("theme") === "null")
  {
    localStorage.setItem("theme", "dark");
  }
}


ReactDom.render(<App/>, document.getElementById('root'));