import React from 'react';
import DrinkNow from '../DrinkNow/DrinkNow'
import Specials from '../Specials/Specials'
import './home.css';


function Home() {
    return(
        <div>
            <div className="drink-now">
                <img src="/images/logo.png" alt="logo" />
                <DrinkNow />
            </div>
            <div className="specials">
                <Specials />
            </div>
        </div>
    )
}

export default Home;