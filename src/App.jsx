import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
import Chip from "./components/Chip/Chip"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel"
import { useState } from "react"
import { createDataSet } from "./data/dataset"

import "./App.css"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noactiveItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {

  const [activeCategory, setCategory] = React.useState(0)
  const [activeRestaurant, setRestaurant] = React.useState(0)
  const [activeItem, setItem] = React.useState(0)

  const currentMenuItems = data.filter((menuItem) => {
    return menuItem.food_category == activeCategory && menuItem.restaurant == activeRestaurant
  })

  function getPageInstructions() {
    if (!(activeCategory || activeRestaurant || activeItem)) {
      return appInfo.instructions.start
    } else if (activeCategory && !(activeRestaurant || activeItem)) {
      return appInfo.instructions.onlyCategory
    } else if (activeRestaurant && !(activeCategory || activeItem)) {
      return appInfo.instructions.onlyRestaurant
    } else if (!(activeItem) && (activeCategory && activeRestaurant)) {
      return appInfo.instructions.noactiveItem
    } else {
      return appInfo.instructions.allSelected
    }
  }

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category) =>
          <Chip key={category} label={category} onClick={() => setCategory(category)} isActive={activeCategory == category} onClose={() => setCategory(null)}/>
        )}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description}/>
        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
          {restaurants.map((restaurant) => 
          <Chip key={restaurant} label={restaurant} onClick={() => setRestaurant(restaurant)} isActive={activeRestaurant == restaurant} onClose={() => setRestaurant(null)}/>
        )}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions={getPageInstructions()}/>
        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((menuItem) => (
              <Chip key={menuItem.item_name} label={menuItem.item_name} onClick={() => setItem(menuItem)} isActive={activeItem.item_name == menuItem.item_name} onClose={() => setItem('')}/>
            ))}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            <NutritionalLabel item={activeItem} />
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
