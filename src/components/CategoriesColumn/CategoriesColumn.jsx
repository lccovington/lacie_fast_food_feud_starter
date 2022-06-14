import * as React from "react"
import "./CategoriesColumn.css"
import Chip from "../Chip/Chip.jsx"

export function CategoriesColumn(props) {
  
    return (
        <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {props.categoriesArray.map((category) =>
          <Chip key={category} label={category} onClick={() => props.setCat(category)} isActive={props.activeCat == category} onClose={() => props.setCat(null)}/>
        )}
        </div>
      </div>
    )
  }
  export default CategoriesColumn