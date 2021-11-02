import React, { useEffect } from 'react'
import './Home.css';


function Home(props) {

    return (
        <div className="wrapper" >
            <input style={{width:'25%', backgroundColor:'#282c34',color:'white', border:'1.5px solid white'}} className="form-control"
                type="text" placeholder="Enter username"
                onKeyPress={props.handleEnter}
            /> </div>
    )
};

export default Home;