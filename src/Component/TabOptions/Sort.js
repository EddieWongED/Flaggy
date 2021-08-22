/* eslint-disable */
import "../../style/tab.css"
import "../../style/sort.css"
import "../../index.css"
import "../../style/miscellaneous.css"
import React from 'react'
import sortUpImg from "../../icons/sortUpIcon.svg"
import sortDownImg from "../../icons/sortDownIcon.svg"
import {ThemeContext} from '../../Theme';
import { useTranslation } from 'react-i18next'

const SortOptions = (props) => {
    const context = React.useContext(ThemeContext);
    const {t} = useTranslation();
    const {optionID, handleDrag, handleDrop} = props;

    return (
        <div
        id={optionID}
        theme={context}
        className="sort-option-div card"
        draggable={true}
        onDragOver={(ev) => ev.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop}>
            <div
            className="sort-option-img-div">
                <img
                theme={context}
                className="sort-option-img"
                draggable={false}
                width="26"
                height="26"
                alt="drag"/>
            </div>
            <div
            id={optionID}
            className="sort-content-div">
                {t(props.optionID)}
            </div>
        </div>
    );
}

const Sort = (props) => {
    const context = React.useContext(ThemeContext);
    // const {t} = useTranslation();
    const [dragId, setDragId] = React.useState();

    function handleDrag(ev) {
        setDragId(ev.currentTarget.id);
    }

    function handleDrop(ev) {
        const dragBox = props.sortValue.find((option) => option.id === dragId);
        const dropBox = props.sortValue.find((option) => option.id === ev.currentTarget.id);
    
        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;
    
        const newOptionState = props.sortValue.map((option) => {
          if (option.id === dragId) {
            option.order = dropBoxOrder;
          }
          if (option.id === ev.currentTarget.id) {
            option.order = dragBoxOrder;
          }
          return option;
        });
    
        props.handleSortChange(newOptionState);
    }
    
    function handleOrdering(e) {
        e.preventDefault();
        console.log(e.currentTarget.id);
        let ordering = e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('-'));
        let target = e.currentTarget.id.substring(e.currentTarget.id.indexOf('-') + 1);
        const newOptionState = props.sortValue.map((option) => {
            if (option.id === target) {
              option.ascending = ordering === "ascending";
            }
            return option;
          });

          props.handleSortChange(newOptionState);
    }
    
    return (
        <div
        id="sort-div"
        className="sort-div"
        tabOpened={props.tabOpened}>
            {props.sortValue
                    .sort((a, b) => a.order - b.order)
                    .map((sortOption, index) => {
                        return (
                        <div
                        key={sortOption.id}
                        className="sort-option">
                            <div
                            className="sort-ordering-div">
                                <div
                                className="sort-ordering-container-div no-select"
                                theme={context}>
                                    <img
                                    src={sortDownImg}
                                    alt="descending"
                                    id={`descending-${sortOption.id}`} 
                                    className="sort-descending-img"
                                    ascending={sortOption.ascending.toString()}
                                    onClick={handleOrdering}
                                    theme={context}/>
                                    <img
                                    src={sortUpImg}
                                    alt="ascending"
                                    id={`ascending-${sortOption.id}`}  
                                    className="sort-ascending-img"
                                    ascending={sortOption.ascending.toString()}
                                    onClick={handleOrdering}
                                    theme={context}/>
                                </div>
                            </div>
                            <div
                            className="sort-option-numbering-div">
                                <div
                                className="sort-numbering no-select">
                                    {`${index + 1}.`}
                                </div>
                                <SortOptions
                                key={sortOption.id}
                                optionID={sortOption.id}
                                handleDrag={handleDrag}
                                handleDrop={handleDrop}/>
                            </div>
                        </div>
                    );})}
        </div>
    )
}

export default Sort;