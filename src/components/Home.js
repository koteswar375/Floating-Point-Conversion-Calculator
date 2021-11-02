import React, { useEffect } from 'react'
import './Home.css';


function Home(props) {

    return (
        <div className="wrapper" >
            <input className="form-control"
                type="text"
                onKeyPress={props.handleEnter}
            /> </div>
    )
};

export default Home;