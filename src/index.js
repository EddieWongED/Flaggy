/* eslint-disable */
import React, {useState, Suspense} from 'react'
import ReactDom from 'react-dom'
import loadable from '@loadable/component'
import { useTranslation } from 'react-i18next'

import './i18n/config'
import './index.css'
import './style/miscellaneous.css'

import {ThemeContext} from './Theme'
import CountriesSection from './Component/CountriesSection.js'
import NavBar from './Component/NavBar.js'

// const resource = createResource();
// console.log(resource);

// stateless functional component (must captialize the first character)
function App() {
  
  const {t} = useTranslation();
  
  console.log();
  
  createLocalStorage();

  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [navBarShown, setNavBarShown] = React.useState(false)

  const Clock = loadable(() => import('./Component/Clock.js'));

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
            <div className="title-div no-select">
              <h1>{t('title')}</h1> 
            </div>
            <div className="clock-div">
              <Suspense fallback={<div>Loading...</div>}>
                <Clock />
              </Suspense>
            </div>
          </div>
          <div className="bottom-div">
            <CountriesSection/>
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