import * as React from "react"
import "./RestaurantsRow.css"
import Chip from "../Chip/Chip.jsx"

export function RestaurantsRow(props) {
  
    return (
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
          {props.restaurantsArray.map((restaurant) => 
          <Chip key={restaurant} label={restaurant} onClick={() => props.setRes(restaurant)} isActive={props.activeRes == restaurant} onClose={() => props.setRes(null)}/>
        )}
          </div>
        </div>
    )
  }
  export default RestaurantsRow