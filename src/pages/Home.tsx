import React from "react";

import qs from "qs";

import Categories from "../components/Caregories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../Pagination";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Skeleton from "../components/PizzaBlock/Skeleton";

import { list } from "../components/Sort";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilter,
  setCategoyId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  // const { searchValue } = React.useContext(SearchContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  // const sortType = useSelector(state => state.filter.sort.sortProperty)

  // const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoyId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    // setIsLoading(true);

    const search = searchValue ? `&search=${searchValue}` : "";

    // await axios
    //   .get(
    //     `https://-66c12088ba6f27ca9a585a64.mockapi.io/items?page=${currentPage}&limit=4&${
    //       categoryId > 0 ? `category=${categoryId}` : ""
    //     }&sortBy=${
    //       sort.sortProperty && sort.sortProperty.includes("-")
    //         ? `${sort.sortProperty.replace("-", "")}&order=asc`
    //         : `${sort.sortProperty}&order=desc`
    //     }${search}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });
    // try {
    //   console.log(555);
    dispatch(
      //@ts-ignore
      fetchPizzas({
        search,
        categoryId,
        sort,
        currentPage,
      })
    );
    // setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    //   alert("Ошибка при получении пицц");
    //   console.log("ERROR", error);
    // }
  };

  //Если изменили параметры и был первый рендер, то будет проверка
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //Если был первый рендер, то проверяем url-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty == params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы с бэка
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
      isSearch.current = false;
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items
    .filter((obj: any) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj: any) => (
      <Link key={obj.id} to={`pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));
  // https://66c12088ba6f27ca9a585a64.mockapi.io/items
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению не удалось получить пиццы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
