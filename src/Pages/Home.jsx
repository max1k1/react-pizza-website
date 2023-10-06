import React, { useState } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from './../components/PizzaBlock/PizzaBlock';
import Sort from './../components/Sort';
import Categories from './../components/Categories';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setItems } from '../redux/slices/pizzasSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const [isSearch, setIsSearch] = useState(false);
  // const isSearch= React.useRef(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const items = useSelector((state) => state.pizzas.items);
  const { sortOption, sortOptionList, currentPage, categories, activeCategory, searchValue } =
    useSelector((state) => state.filter);

  // После первого рендера вмонтируем параметры в адресную строку и перемещаемся на неё
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        option: sortOptionList[sortOption].option,
        activeCategory,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    setIsSearch(true);
    isMounted.current = true;
  }, [navigate, sortOptionList, sortOption, activeCategory, currentPage]);

  // синхронизируем с редакс значение параметров которое пришло с адресной строки
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      sortOptionList.map(async (obj, i) => {
        if (obj.option === params.option) {
          return dispatch(setFilters({ ...params, sortOption: i }));
        }
        return 0;
      });
    }
  }, [dispatch, sortOptionList, sortOption, activeCategory, currentPage]);

  //
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPizzas = () => {
      setIsLoading(true);
      const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
      const sortBy = `&sortBy=${sortOptionList[sortOption].option.replace('-', '')}`;
      const order = sortOptionList[sortOption].option.includes('-') ? `&order=ask` : `&order=desc`;
      const search = searchValue ? `&search=${searchValue}` : '';
      axios
        .get(
          `https://65195bba818c4e98ac604bdc.mockapi.io/items?page=${currentPage}&limit=6${category}${sortBy}${order}${search}`,
        )
        .then((response) => {
          dispatch(setItems(response.data));
          setIsLoading(false);
        });
    };
    if (isSearch) {
      fetchPizzas();
    }
  }, [dispatch, isSearch, activeCategory, sortOption, searchValue, currentPage, sortOptionList]);
  const skeletonItemsElement = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const itemsElement = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  return (
    <div>
      <div className="content__top">
        <Categories categories={categories} activeCategory={activeCategory} />
        <Sort sortOptionList={sortOptionList} sortOption={sortOptionList[sortOption]} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletonItemsElement : itemsElement}</div>
      <Pagination currentPage={currentPage} />
    </div>
  );
};

export default Home;
