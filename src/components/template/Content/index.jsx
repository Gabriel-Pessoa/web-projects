import React from 'react';

import Home from '../../pages/Home';
import Location from '../../pages/Location';
import Contact from '../../pages/Contact';
import Social from '../../pages/Social';
import WeddingList from '../../pages/WeddingList';

import './styles.css';

function Content() {
    return (
        <div className="content">
            <Home />
            <Location />
            <Contact />
            <Social />
            <WeddingList />
        </div>
    );
}

export default Content;