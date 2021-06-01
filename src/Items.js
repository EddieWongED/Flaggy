import React from 'react';
import ReactDom from 'react-dom'

// retrieve items from JSON
let items = require('./Items.json');

// create 
const Item = (props) => {
    const clickItem = (e) => {
      console.log(e);
      e.target.style.border = "3px solid #FF0000";
      alert("You are clicking the item: " + props.name);
    }
  
    return (
      <React.Fragment>
        <article className='item' onClick={clickItem}>
          <ItemImage img={props.img}/>
          <ItemName name={props.name}/>
          {props.children}
        </article>
      </React.Fragment>
    )
  }
  
 const ItemImage = (props) => {
    return (
      <img src={props.img} alt="png" width="50" height="50"/>
    )
  }
  
  const ItemName = (props) => {
    return (
      <h2 style={{color: '#617d98'}}>
      {props.name}
      </h2>
    )
  }
  
const JSXItems = items.items.map((item) => {
    return (
      <Item key={item.id} name={item.itemName} img={item.img}/>
    );
  })

export default JSXItems
