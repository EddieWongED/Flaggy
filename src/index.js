import React from 'react';
import ReactDom from 'react-dom'
import './index.css';
import JSXItems from './Items.js'

// stateless functional component (must captialize the first character)
function App() {
  // return JSX/Html
  return (
    <React.Fragment>
      <h4>Title</h4>
      <section className='itemlist'>
        {/* print items with the Items.js */}
        {JSXItems}
      </section>
    </React.Fragment>
  );
}

ReactDom.render(<App/>, document.getElementById('root'));