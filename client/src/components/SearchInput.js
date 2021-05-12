import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';


function SearchInput({setInput}) {
    var [hover, setHover] = useState(false);
    var [redirect, setRedirect] = useState(false);

    const ref = useRef("");

    var style = {
        /* step 3: user presses search button (transitions to page 2) */
        searchButton: {
            borderRadius: "42px",
            borderColor: "#c17ecb",
            marginTop: "10px",
            marginLeft: "2%",
            padding: "10px",
            backgroundColor: "rgb(7, 0, 55)",
            color: "#77dfff",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center"
        },
        searchButtonHover: {
            color: "rgb(7, 0, 55)",
            backgroundColor: "#77dfff"
        },
        location: {
            borderColor: "#77dfff",
            marginTop: "10px",
            padding: "12px"
        }
    }

    function onMouseEnter(e) {
        setHover(true);
    }

    function onMouseLeave(e) {
        setHover(false);
    }

    function onSubmit(e) {
        e.preventDefault();
        setInput(ref.current.value);
        setRedirect(true);
    }

    return (
        redirect ?
        <Redirect to="/results" />
        :
        <form className="yelp" onSubmit={onSubmit}>
            <input placeholder="location" style={style.location} type="text" ref={ref}/>
            <input
                style={hover ? {...style.searchButton, ...style.searchButtonHover } : style.searchButton } 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                type="submit" />
        </form>
    );
}

export default SearchInput;