import React from 'react';

import Header from '../components/Header';
import NomsterImage from '../components/NomsterImage';
import SearchInput from '../components/SearchInput';
import Slider from '../components/Slider';


function Landing({query, setQuery}) {
    return (
        <div id="page-1" className="container">
            <Header />
            <div className="search-container">
                <NomsterImage />
                <SearchInput setInput={(location) => setQuery({...query, location })} />
                <Slider query={query.range} setQuery={(range) => setQuery({...query, range })}/>
            </div>
        </div>
    );
}

export default Landing;