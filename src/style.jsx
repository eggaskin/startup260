import React from 'react';
import "../main.css";

export function Style({updateCat, delCat}) {
    const [color, setColor] = React.useState("#f8f6c4");

    function setStyle() {
        updateCat(color);
    }
    
    React.useEffect(() => {
        fetch("https://www.colr.org/json/color/random",{cache: "reload"})
        .then((response) => response.json())
        .then((data) => {
            setColor('#'+data.new_color);
        });
    },[]); //TODO: are render rules right with this??

    return (<div className="postit" id="styling">
        <h1> Styling: </h1>
        <div><a >Background Color:</a>
            <input type="color" id="color" value={color} onChange={(e)=>setColor(e.target.value)}/></div>
        <button type='button' onClick={setStyle}>Style</button>
        <button type="delete" onClick={delCat}>Delete Category</button>
    </div>);
}
