import React from 'react';
import "../main.css";
import {Notes} from "./notes";
import {CatSelect} from "./catSelect";
import {Style} from "./style";
import {submitCategories, Category, loadCategories} from "./categories"

// credit to https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
// https://www.sitepoint.com/javascript-generate-lighter-darker-color/
function newShade(hex, lum) {
    // validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

export function Cat({userName}) {
    const [cat, setCat] = React.useState(Object.keys(JSON.parse(localStorage.getItem("categories")))[0]);
    const [color, setColor] = React.useState("#f8f6c4");
        //localStorage.getItem("categories")==null ? "#f8f6c4" :JSON.parse(localStorage.getItem("categories"))[cat].color);

    // when the category changes, view category
    // React.useEffect(() => {// rerender
    //     console.log("cat changed");
    // }
    // ,[cat]); //TODO:

    function colorCat(color) {
        setColor(color);
        let categories = JSON.parse(localStorage.getItem("categories"));
        categories[cat].color = color;
        localStorage.setItem("categories", JSON.stringify(categories));
        submitCategories();
    }

    function delCat() {
        let categories = JSON.parse(localStorage.getItem("categories"));
        delete categories[cat];
        // categories = categories.filter((el) => el != catname); //TODO:
        localStorage.setItem("categories", JSON.stringify(categories));
        setCat(Object.keys(categories)[0]);
        // updateOptions();
        submitCategories(); 
    }

    return (
    <main>
        <div className="container" id="userscontent" style={{flexDirection: 'row'}}>
            <Notes catname={cat} style={{backgroundColor:color,borderColor:newShade(color,-0.35)}} />
            <div className="container" style={{flexDirection:'column'}}>
            <CatSelect userName={userName} newCat={false} clickFunc={(e) => setCat(e)} />
            <Style updateCat={colorCat} delCat={delCat}/>
            </div>
        </div> 
        </main>);
}