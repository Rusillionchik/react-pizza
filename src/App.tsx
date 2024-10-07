import Home from "./pages/Home";

import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/Fullpizza";

import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";

import "./scss/app.scss";
import MainLayOut from "./layouts/MainLayOut";

// export const SearchContext = React.createContext("");

// const pizzas = []

// function pizza (title, price, img) {
// return `Цена: ${price} Заголовок: ${title}`
// }

function App() {
  // const [searchValue, setSearchValue] = React.useState("");

  return (
    /* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */
    /* <Header searchValue={searchValue} setSearchValue={setSearchValue}/> */

    <Routes>
      <Route path="/" element={<MainLayOut />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

    /* </SearchContext.Provider> */
  );
}

export default App;
