import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import monster1 from "../../images/monster-1.png";
import './style.css';

function Results(props) {
    console.log(JSON.stringify(props, null, 1));
    const [imageHover, setImageHover] = useState(false);
    const bubble1Ref = useRef();
    const bubble2Ref = useRef();
    const bubble3Ref = useRef();

    const ref = useRef({
        map: undefined,
        infobox: undefined
    });


    var style = {
        bubble1: {
            position: "absolute",
            marginTop: "285px",
            marginLeft: "197px",
            /* margin-left: 12.7vw; */
            float: "left",
            /* width: 2vw; */
            /* height: 2vw; */
            width: "30px",
            height: "30px",
            backgroundColor: "rgb(7, 0, 55)",
            border: "solid #dadada",
            borderWidth: "2px",
            borderRadius: "42px",
            zIndex: "1",
            opacity: "0",
            animationName: "fadein",
            animationDuration: "1s",
            animationFillMode: "forwards",
            animationDelay: "4.5s"
        },
        bubble2: {
            position: "absolute",
            marginTop: "253px",
            marginLeft: "11.2vw",
            float: "left",
            /* width: 3vw; */
            /* height: 3vw; */
            width: "50px",
            height: "50px",
            backgroundColor: "rgb(7, 0, 55)",
            border: "solid #dadada",
            borderWidth: "2px",
            borderRadius: "42px",
            zIndex: "2",
            opacity: 0,
            animationName: "fadein",
            animationDuration: "1s",
            animationFillMode: "forwards",
            animationDelay: "5s"
        },
        bubble3: {
            position: "absolute",
            marginTop: "159px",
            marginLeft: "4.8vw",
            float: "left",
            /* width: 9vw; */
            /* height: 9vw; */
            width: "137px",
            height: "137px",
            backgroundColor: "rgb(7, 0, 55)",
            border: "solid #dadada",
            borderWidth: "2px",
            borderRadius: "70px",
            zIndex: "3",
            opacity: 0,
            animationName: "fadein",
            animationDuration: "1.5s",
            animationFillMode: "forwards",
            animationDelay: "5s"
        },
        nomsterText: {
            marginTop: "3vw",
            color: "#77dfff",
            /* font-size: 25px; */
            fontSize: "1.6vw",
            fontWeight: "bold",
            textAlign: "center"
        },
        imageDisplay: (hover) => {
            var style = {
                position: "absolute",
                borderRadius: "42px",
                width: "25vw",
                height: "25vw",
                marginTop: "225px",
                //marginLeft: "-46.5vw",
                marginLeft: "-32.5vw",
                /* margin-top: -25px; */
                transform: "rotate(-90deg)",
                zIndex: "-1",
                animationName: "slides",
                animationDuration: "1s",
                animationFillMode: "forwards",
                animationDelay: "3s"
            };
            var styleHover = {
                animationFillMode: "none",
                marginLeft: "-50vw"
            };
            return (hover ? { ...style, ...styleHover } : style);
        }
    }

    useEffect(() => {
        var Microsoft = window.Microsoft;
        // deal with server side pre-rendering
        if (Microsoft !== undefined) {
            if (!ref.current.map) {
                ref.current.map = new Microsoft.Maps.Map('#myMap', {
                    credentials: process.env.REACT_APP_MSN_CREDENTIALS
                });
                ref.current.infobox = new Microsoft.Maps.Infobox(ref.current.map.getCenter(), {
                    visible: false
                });

                //Assign the infobox to a map instance.
                ref.current.infobox.setMap(ref.current.map);
            }
        }
    });

    useEffect(() => {
        var Microsoft = window.Microsoft;
        if (Microsoft !== undefined) {
            for (let business of props.results.businesses) {
                let lat = business.coordinates.latitude;
                let lon = business.coordinates.longitude;

                let loc = new Microsoft.Maps.Location(lat, lon);
                let pin = new Microsoft.Maps.Pushpin(loc);
                pin.metadata = {
                    title: business.name,
                    description: business.location.display_address.join("\n")
                };
                Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
                    //Make sure the infobox has metadata to display.
                    if (e.target.metadata) {
                        //Set the infobox options with the metadata of the pushpin.
                        ref.current.infobox.setOptions({
                            location: e.target.getLocation(),
                            title: e.target.metadata.title,
                            description: e.target.metadata.description,
                            visible: true,
                            // needed since an OVER LARGE X shows up without it
                            // no close button for the infobox as a result
                            // FIX: need to "customize" infobox so it has a close button
                            showCloseButton: false

                        });
                    }
                });

                ref.current.map.entities.push(pin);
            }
            let loc = new Microsoft.Maps.Location(props.results.region.center.latitude,
                props.results.region.center.longitude);
            ref.current.map.setView({ center: loc, zoom: 15 });
        }
    }, [props.results.businesses, props.results.region.center.latitude, props.results.region.center.longitude]);

    return (
        <>
            {
                props.results.businesses ?
                    (<div>
                        <div id="page-2" className="container">
                            {/* This search-results div will have other generated search divs appended to it to display search results */}
                            <div className="search-results">
                                <h3 id="noms">Nom Noms</h3>
                                <div id="nom-list">
                                    {
                                        props.results.businesses.map((business, index) => {
                                            return (
                                                <div key={index} className="business"
                                                    data-lat={business.coordinates.latitude}
                                                    data-lon={business.coordinates.longitude}
                                                >
                                                    <a className="name" href={business.url}>
                                                        {business.name}
                                                    </a>
                                                    <p>
                                                        {
                                                            `${business.location.display_address[0]} ${business.location.display_address[1]}`
                                                        }
                                                    </p>
                                                    <a href={`tel:${business.phone}`}>{business.phone}</a>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                            {/* This results-mapdiv will house the generated map once an option is selected from the search-results div list */}
                            <div className="results-map">
                                <h3 id="path">Path to Nom Noms</h3>
                                {/* map adds here */}
                                {/* <div id="myMap" style="position:relative;width:300px;height:560px;"></div> */}
                                <div id="myMap"></div>
                            </div>
                        </div>

                        {/* angled monster page 2 */}
                        <img src={monster1} style={style.imageDisplay(imageHover)}
                            onMouseEnter={() => setImageHover(true)}
                            onMouseLeave={() => setImageHover(false)}
                            alt="monster" />
                        <div ref={bubble1Ref} style={style.bubble1}></div>
                        <div ref={bubble2Ref} style={style.bubble2}></div>
                        <div ref={bubble3Ref} style={style.bubble3}>
                            <Link to="/">
                                <p style={style.nomsterText}>Click Me to go back</p>
                            </Link>
                        </div>
                    </div>)
                    :
                    <Redirect to="/" />
            }
        </>
    );
}

export default Results;