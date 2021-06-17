import React from "react"

const Number = (props) => {
   return (
      <h1>{props.resource.num.read()}</h1> 
   );
}

export default Number;