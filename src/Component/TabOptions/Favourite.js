import "../../style/tab.css"
import "../../index.css"
import "../../style/miscellaneous.css"
import React from 'react'


const Favourite = (props) => {
    // const context = React.useContext(ThemeContext);
    // const {t} = useTranslation();
    console.log("rendering TabContent");

    return (
        <div
        id="favourite-div"
        tabOpened={props.tabOpened}
        ref={props.favouriteDiv}
        className="favourite-div">
        </div>
    )
}

export default Favourite;
