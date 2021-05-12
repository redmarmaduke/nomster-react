const yelp = require('yelp-fusion');
const client = yelp.client(process.env.REACT_APP_MSN_API_KEY);

var cuisines = new Set();

[
    "Argentine",
    "Armenian",
    "Bangladeshi",
    "Belgian",
    "Brazilian",
    "Bulgarian",
    "Cajun/Creole",
    "Cantonese",
    "Caribbean",
    "Chinese",
    "Cypriot",
    "Danish",
    "Ethiopian",
    "Filipino",
    "French",
    "Georgian",
    "German",
    "Greek",
    "Indonesian",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Kurdish",
    "Laotian",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "American (New)",
    "Nicaraguan",
    "Pakistani",
    "Persian/Iranian",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Scandinavian",
    "Somali",
    "Spanish",
    "Sri Lankan",
    "Taiwanese",
    "Tex-Mex",
    "Thai",
    "American (Traditional)",
    "Turkish",
    "Ukrainian",
    "Vietnamese",
    "Afghan",
    "African",
    "Andalusian",
    "Arabian",
    "Asturian",
    "Australian",
    "Austrian",
    "Basque",
    "Bavarian",
    "British",
    "Burmese",
    "Cambodian",
    "Catalan",
    "Chilean",
    "Corsican",
    "Cuban",
    "Czech",
    "Czech/Slovakian",
    "Galician",
    "Guamanian",
    "Halal",
    "Hawaiian",
    "Himalayan/Nepalese",
    "Honduran",
    "Hungarian",
    "Iberian",
    "Israeli",
    "Laos",
    "Lyonnais",
    "Malaysian",
    "Modern Australian",
    "Modern European",
    "Mongolian",
    "Moroccan",
    "Canadian (New)",
    "New Mexican Cuisine",
    "New Zealand",
    "Traditional Norwegian",
    "Parma",
    "Polynesian",
    "Scottish",
    "Serbo Croatian",
    "Singaporean",
    "Slovakian",
    "Swabian",
    "Swedish",
    "Swiss Food",
    "Syrian",
    "Traditional Swedish",
    "Uzbek",
    "Yugoslav"].forEach((value) => {
        cuisines.add(value);
    });

async function getListing(queryObj, retries, timout) {
    queryObj = queryObj || {};
    queryObj.term = queryObj.term || "restaraunts";
    if (!queryObj.location && !(queryObj.latitude && queryObj.longitude)) {
        queryObj.location = "160 Spear Street, San Francisco, CA";
    }
    queryObj.range = queryObj.range || 1000;
    // if queryObj.offset doesn't exist, set to 0
    queryObj.offset = queryObj.offset || 0;
    // if queryObj.limit doesn't exist set to 50
    queryObj.limit = queryObj.limit || 50;
    // part of ES6, permitting merging of two objects with keys being overwritten
    // by items later in the list
    queryObj.categories = queryObj.categories || Array.from(cuisines).join(",");
    queryObj.sort_by = queryObj.sort_by || "distance";

    return client.search(queryObj).then(({ jsonBody }) => {
        var processed_cuisines = {};
        for (let business of jsonBody.businesses) {
            let found = false;
            for (let { title } of business.categories) {
                if (cuisines.has(title)) {
                    if (title in processed_cuisines) {
                        processed_cuisines[title].push(business);
                    }
                    else {
                        processed_cuisines[title] = [ business ];
                    }
                    found = true;
                    break;
                }
            }
            /* code to check the content of the categories for discarded content  */
            if (!found) {
                for (let category of business.categories) {
                    //console.log(category);
                }
            }
        }
        // processed cuisines is an array [][cuisine key,[businesses]]
        // remove all trailing *empty* cuisines
        processed_cuisines = Object.entries(processed_cuisines).sort(
            (a, b) => a[1].length - b[1].length).map(
            (value) => value[1]).reduce(
            (accumulator, value) => { accumulator.push(...value); return accumulator; },[]);

        jsonBody.businesses = processed_cuisines;
        jsonBody.total = processed_cuisines.length;
        return jsonBody;
    });
}

module.exports = getListing;