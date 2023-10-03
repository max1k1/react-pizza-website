import { useEffect, useState } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from './../components/PizzaBlock/PizzaBlock';
import Sort from './../components/Sort';
import Categories from './../components/Categories';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const sortOptionList = [
    { name: 'Rating: From hight to low', option: 'rating' },
    { name: 'Rating: From low to hight', option: '-rating' },
    { name: 'Price: From hight to low', option: 'price' },
    { name: 'Price: From low to hight', option: '-price' },
    { name: 'Alphabetically: From hight to low', option: 'tittle' },
    { name: 'Alphabetically: From low to hight', option: '-tittle' },
  ];
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItemCategory, setActiveItemCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(sortOptionList[0]);
  useEffect(() => {
    setIsLoading(true);
    const category = activeItemCategory > 0 ? `&category=${activeItemCategory}` : '';
    const sortBy = `&sortBy=${sortOption.option.replace('-', '')}`;
    const order = sortOption.option.includes('-') ? `&order=ask` : `&order=desc`;
    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(`https://65195bba818c4e98ac604bdc.mockapi.io/items?page=${currentPage}&limit=6${category}${sortBy}${order}${search}`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, [activeItemCategory, sortOption, searchValue, currentPage]);

  const skeletonItemsElement = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const itemsElement = items
    // filter system for static array
    // .filter((item) => {
    //   if (!searchValue) {
    //     return true;
    //   }
    //   if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div>
      <div className="content__top">
        <Categories
          activeItemCategory={activeItemCategory}
          setActiveItemCategory={setActiveItemCategory}
        />
        <Sort
          sortOption={sortOption}
          setSortOption={setSortOption}
          sortOptionList={sortOptionList}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletonItemsElement : itemsElement}</div>
      <Pagination onChangePage={setCurrentPage}/>
    </div>
  );
};

export default Home;
