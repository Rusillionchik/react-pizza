import React from "react";
import axios from "axios";
import qs from "qs"

import Categories from "../components/Caregories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../Pagination";

import { SearchContext } from "../App";
import { useNavigate} from "react-router-dom"

import Skeleton from "../components/PizzaBlock/Skeleton";


import {list} from "../components/Sort"
import { useSelector, useDispatch } from "react-redux"
import { setCategoyId, setCurrentPage, setFilters } from "../redux/slices/filterSlice"



 const Home = () => {

  const {searchValue} = React.useContext(SearchContext)


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {categoryId, sort, currentPage} = useSelector(state => state.filter)
  
  // const sortType = useSelector(state => state.filter.sort.sortProperty)

  

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    // const [categoryId, setCategoryId] = React.useState(0)
    // const [currentPage, SetCurrentPage] = React.useState(1)
    // const [sortType, setSortType] = React.useState({
    //   name: "популярности",
    //   sortProperty: "рейтинг"
    // })


    const onChangeCategory = (id) => {
      dispatch(setCategoyId(id));
    }

     const onChangePage = (number) => {
     dispatch(setCurrentPage(number))
     }
     
     React.useEffect(() => {
     if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      
      const sort = list.find(obj => obj.sortProperty == params.sortProperty)
      dispatch(setFilters({
        ...params,
        sort
      }

      ))
     }
     
     }, [])

    
  
    React.useEffect(() => {
      setIsLoading(true)

     const search = searchValue ? `&search=${searchValue}` : ''
      
      // fetch(`https://66c12088ba6f27ca9a585a64.mockapi.io/items?page=${pageCount}&limit=4&${
      //   categoryId > 0 ? `category=${categoryId}` : ''
      // }&sortBy=${sort.sortProperty.includes('-') ? `${sort.sortProperty.replace('-', '')}&order=asc` 
      // : `${sort.sortProperty}&order=desc`}${search}` )
      // .then((res) => res.json())
      // .then(arr => {
      //     setItems(arr)
      //     setIsLoading(false)
      // })

     axios
     .get(`https://66c12088ba6f27ca9a585a64.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty &&  sort.sortProperty.includes('-') ? `${sort.sortProperty.replace('-', '')}&order=asc` 
      : `${sort.sortProperty}&order=desc`}${search}`)
       .then((res)=>  {         
      setItems(res.data)
       setIsLoading(false)})
   
    window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    React.useEffect(() => {
     const queryString = qs.stringify({
     sortProperty: sort.sortProperty,
     categoryId,
     currentPage
     })

     navigate(`?${queryString}`)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.filter(obj => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    .map((obj) => <PizzaBlock key={obj.id}{...obj}/>)
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>) 
    // https://66c12088ba6f27ca9a585a64.mockapi.io/items
    return (
       <>   
       <div className="container">   
        <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
       </div>
       <h2 className="content__title">Все пиццы</h2>
       <div className="content__items">
        {  isLoading ? skeletons
        : pizzas
        }
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div> 
        </> 
    )
}


export default Home