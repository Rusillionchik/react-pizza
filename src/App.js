
import React from "react";
import Header from "./components/Header";


import  Home  from "./pages/Home";
import Cart from "./pages/Cart";
import  NotFound  from "./pages/NotFound";

import {
  Routes,
  Route
  } from "react-router-dom"
import './scss/app.scss'
import Categories from "./components/Caregories";

import './scss/app.scss'



export const SearchContext = React.createContext('')





// const pizzas = []


// function pizza (title, price, img) {
// return `Цена: ${price} Заголовок: ${title}`
// }

function App() {
const [searchValue, setSearchValue] = React.useState('')

  return (
<div className="wrapper">
  <SearchContext.Provider value={{searchValue, setSearchValue}}>
  {/* <Header searchValue={searchValue} setSearchValue={setSearchValue}/> */}
< Header/>
    <div className="content">
     
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="*" element={<NotFound/>}/>
     </Routes>
     </div>
  </SearchContext.Provider>
    </div>
  );
}

export default App;
