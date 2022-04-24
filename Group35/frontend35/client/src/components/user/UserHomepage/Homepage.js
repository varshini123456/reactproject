import React from 'react'
import Header from './Header'
import Body from './Body';
import Products from './Products';

// getting all the components required for homepage
function Homepage(props){
    return (
        <div>
            <Header username={props.username} />
            <br />
            <br />
            <br />
            <Body username={props.username}/>
            <br />
            <br />
            <br />
            <Products username={props.username}/>
        </div>
    );
}

export default Homepage;