import React from 'react';

function Header() {
    var style = {
        header: {
            backgroundColor: "#7467ad",
            border: "solid #dadada",
            borderWidth: "5px 5px 5px 5px",
            borderRadius: "42px",
            height: "10vw",
            marginTop: "2.5%",
            marginBottom: "2.5%",
            marginLeft: "2.5%",
            marginRight: "2.5%",
            textAlign: "center",
            fontFamily: "'Nosifer', cursive",
            minWidth: "250px",
            minHeight: "100px"
        },
        /* app title "Nomster" */        
        title: {
            margin: 0,
            color: "#77dfff",
            /* fontSize: 4.2vw; */
            fontSize: "4.5vmax",
            WebkitTextStroke: "1px rgb(7, 0, 55)",
            fontWeight: "bold",
            textAlign: "center"
        },
        /* small comment below "Nomster" */
        blurb: {
            marginTop: "-1vw",
            color: "rgb(255, 0, 42)",
            WebkitTextStroke: ".5px rgb(142, 0, 0)",
            /* fontSize: 1.5vw; */
            fontSize: "1.6vmax",
            fontWeight: "bold",
            textAlign: "center"
        }
    };

    return (
        <header style={style.header}>
            <h1 style={style.title}>Nomster</h1>
            <h4 style={style.blurb}>Off the eaten path</h4>
        </header>
    );
}

export default Header;