import "../../style/tab.css"
import "../../index.css"
import "../../style/miscellaneous.css"
import "../../style/favourite.css"
import { useTranslation } from 'react-i18next'
import React from 'react'


const Favourite = (props) => {
    const {handleFavouriteFilterChange, favouriteFilter} = props;
    // const context = React.useContext(ThemeContext);
    const {t} = useTranslation();
    console.log("rendering TabContent");

    function handleFavouriteClick() {
        handleFavouriteFilterChange(!favouriteFilter);
    }

    return (
        <div
        id="favourite-div"
        tabOpened={props.tabOpened}
        className="favourite-div no-select">
            <div
            className="favourite-switch-div">
                <label
                className="switch">
                    <input
                    type="checkbox"
                    defaultChecked={favouriteFilter}
                    onClick={handleFavouriteClick}/>
                    <span
                    className="slider round">
                    </span>
                </label>
            </div>
            <div
            className="show-favourite-only-div no-select">
                    {t("showFavouriteOnly")}
            </div>
        </div>
    )
}

export default Favourite;
