import React from 'react';
import "../main.css";

export function CatSelect({newCat, clickFunc}) {
    const [catName, setCat] = React.useState("list");
    const [newCatName, setNewCatName] = React.useState("new category");
    const buttonName = newCat ? "New" : "View Category";
    // how to populate options??

    function getOptions() {
        const options = [];
        const categories = Object.keys(JSON.parse(localStorage.getItem("categories")));
        for (let i=0; i<categories.length; i++) {
            options.push(
                <option key={i}>{categories[i]}</option>
            );
        }
        return options;
    }

    return (<div className="postit" id="catSelect">
        <h1> Category: </h1>
        <select id="select" name="varSelect" onChange={(e) => {setCat(e.target.value); clickFunc(e.target.value)}}>
            {getOptions()}
        </select>
        {newCat ? <input type="text" id="newCategory" onChange={(e) => setNewCatName(e.target.value)} placeholder="new category" /> : null}
        <button type="button" id="switchcat" onClick={()=>{newCat?clickFunc(newCatName,true):clickFunc(catName)}}>{buttonName}</button>
    </div>);
}