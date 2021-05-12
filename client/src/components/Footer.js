import React, { useState } from 'react';

function Footer(props) {
    var [homeHover, setHomeHover] = useState(false);
    var [aboutHover, setAboutHover] = useState(false);
    var [contactHover, setContactHover] = useState(false);
    var [aboutToggle, setAboutToggle] = useState(false);
    var [contactToggle, setContactToggle] = useState(false);

    var style = {
        footer: {
            position: "fixed",
            bottom: "0",
            minWidth: "100%",
            paddingTop: "10px",
            paddingBottom: "10px",
            background: "#070037",
            /* text-align: center; */
            zIndex: "5"
        },
        reset: {

        },
        "button": (hover) => {
            var style = {
                borderRadius: "42px",
                borderColor: "#c17ecb",
                marginRight: "1.5%",
                padding: "10px",
                backgroundColor: "rgb(7, 0, 55)",
                color: "#77dfff",
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center"
            };
            var styleHover = {
                backgroundColor: "#77dfff",
                color: "rgb(7, 0, 55)"
            };
            return (hover ? { ...style, ...styleHover } : style);
        },
        about: (toggle) => {
            const style = {
                position: "absolute",
                marginTop: "15%",
                marginLeft: "21%",
                padding: "30px",
                /* width: 9vw; */
                /* height: 9vw; */
                width: "50%",
                height: "50%",
                backgroundColor: "rgb(7, 0, 55)",
                color: "#77dfff",
                /* font-size: 1.15vw; */
                fontSize: "1.15vmax",
                border: "solid #dadada",
                borderWidth: "2px",
                borderRadius: "70px",
                zIndex: "1",
                //display: "none",
                visibility: "hidden"
            };

            return (toggle ? { ...style, visibility: "visible" } : style);
        },
        contact: (toggle) => {
            var style = {
                position: "absolute",
                marginTop: "29%",
                marginLeft: "40%",
                padding: "30px",
                /* width: 9vw; */
                /* height: 9vw; */
                width: "13%",
                height: "5%",
                backgroundColor: "rgb(7, 0, 55)",
                color: "#77dfff",
                /* font-size: 1.15vw; */
                fontSize: "1.15vmax",
                border: "solid #dadada",
                borderWidth: "2px",
                borderRadius: "70px",
                zIndex: "1",
                //display: "none",
                visibility: "hidden"
            };
            return (toggle ? { ...style, visibility: "visible"} : style);
        }
    };

    return (
        <footer>
            <div style={style.footer}>
                <button className="reset" id="home-tab"
                    onMouseEnter={() => setHomeHover(true)}
                    onMouseLeave={() => setHomeHover(false)}
                    style={style.button(homeHover)}>
                    Home
                </button>
                <button className="button" id="about-tab"
                    onMouseEnter={() => setAboutHover(true)}
                    onMouseLeave={() => setAboutHover(false)}
                    style={style.button(aboutHover)}
                    onClick={() => setAboutToggle(!aboutToggle)}>
                    About Us
                </button>
                <button className="button" id="contact-tab"
                    onMouseEnter={() => setContactHover(true)}
                    onMouseLeave={() => setContactHover(false)}
                    style={style.button(contactHover)}
                    onClick={() => setContactToggle(!contactToggle)}>
                    Contact Us
                </button>
            </div>
            <div className="container-about-us" id="about-us" style={style.about(aboutToggle)}>As students of Berkeley Extension coding bootcamp, we found ourselves with the given task of creating an application within randomly assigned groups. This project could be any design of our choosing so naturally, given that our lives now consisted of class, studying, homework, eating and occasional sleep, our only true friend, joy and source of entertainment stemmed from food… I might be projecting a little. Regardless, if one is exceptionally busy in life or attempting to be social by meeting up with friends, the same problem arises…what to eat? Now, I enjoy consistency as much as the next. I at least enjoy it as much as my cats seem to (which is saying a lot because cats live by the ways of consistency and habit). However, there are only so many times I can order food from the same restaurant or visit the same café over and over again before what remains of my sanity starts to slip away. It just gets boring! At the same time, it can require a great deal of effort to try new things and, speaking personally, I don’t have a lot of time to spend searching the vast selections of yelp, Grubhub or Doordash to find something unique and different in my area, especially when only the popular or well-advertised options appear first. Then you have to sort through them, scrolling and scrolling. It’s like trying to run while knee deep in mud or sewer water. Yeah! Not a pretty image to picture when you are hungry and looking for food. This is where Nomster shines like the true star that it is!... Metaphorically speaking to the appearance of a star of course. Not an actual star to which 90% of the ones we see are actually dead by now and we are simply witnessing what remains of their light travelling over billions of miles. Little sun corpses in the sky. Nomster provides the list of unique and uncommon food choices within your area for you in 7 seconds or less!... Unless you type slow. May take longer in that instance, but what a difference! Now the next time you are off adventuring with friends or enjoying a Sunday funday (I don’t really know what people do these days for fun), whip out Nomster and you’ll be the cool, hip and interesting person with access to all the most exotic and unique food choices wherever you go.</div>
            <div className="container-contact-us" id="contact-us" style={style.contact(contactToggle)}>No no no, we'll contact you.</div>
        </footer>
    );
}

export default Footer;