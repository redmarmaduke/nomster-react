import React, { useState } from 'react';

import './style.css'

function Slider(props) {
    const [value, setValue] = useState(5);
    const [hover, setHover] = useState(false);

    var style = {
        root: {
            color: "#77dfff",
            fontSize: "17px",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%"
        },
        text: {
            margin: "0",
            marginTop: "25px",
            marginBottom: "5px",
            padding: "0"
        },
        slider: () => {
            var style = {
                WebkitAppearance: "none",
                width: "75%",
                height: "10px",
                margin: "0",
                /* background-color: #77dfff; */
                backgroundColor: "#c17ecb",
                borderRadius: "20px",
                outline: "none",
                opacity: "0.7",
                WebkitTransition: ".2s",
                transition: "opacity .2s"
            };
            var styleHover = {
                opacity: "1"    
            }
            return (hover ? { ...style, ...styleHover } : style)
        },
        sliderHover: {
            opacity: "1"
        }
    };

    return (
        <div style={style.root}>
            <p style={style.text}>Range of Search:
            <output name="slider-output" id="myOutput" value={value}>{value}</output> Miles</p>
            <input
                type="range" min="1" max="25" value={value} id="myRange"
                style={style.slider()}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onInput={(e) => setValue(e.target.value)} />
        </div>
    );
}

export default Slider;