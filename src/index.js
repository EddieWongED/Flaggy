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
import WorldMap from './Component/WorldMap.js'
import NavBar from './Component/NavBar.js'
import TopBar from './Component/TopBar.js'
import Country from './Component/Country.js'
import Error from './Component/Error.js'

import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
    <BrowserRouter basename="Flaggy">
      <ThemeContext.Provider
      value={theme}>
        <div 
        className="page-root-div"
        theme={theme}>
          <TopBar
          navBarShown={navBarShown}
          setNavBarShown={setNavBarShown}/>
          <div className="main-content-div">
            <div
            className="page-left-div"
            theme={theme}>
              <NavBar
              navBarShown={navBarShown}
              setNavBarShown={setNavBarShown}
              handleThemeClick={handleThemeClick}/>
            </div>
            <div
            className="page-right-div"
            theme={theme}>
                <Switch>
                  <Route path="/map" component={WorldMap}/>
                  <Route path="/" component={MainContent} exact="true"/>
                  <Route path="/country/:code" component={Country} exact/>
                  <Route component={Error}/>
                </Switch>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

const MainContent = () => {
    return (
      <div
      id="home-div"
      className="home-div">
        <CountriesSection/>
      </div>
    )
}

function createLocalStorage() {
  if (localStorage.getItem("favourite") === null)
  {
    localStorage.setItem("favourite", JSON.stringify([]));
  }
  if (localStorage.getItem("theme") === "null")
  {
    localStorage.setItem("theme", "dark");
  }
}


ReactDom.render(<App/>, document.getElementById('root'));