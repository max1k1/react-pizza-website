import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice';


const Categories = ({categories, activeCategory }) => {
  const dispatch = useDispatch();
  const categoriesElement = categories.map((c, i) => (
    <li
      key={i}
      onClick={() => {
        dispatch(setActiveCategory(i));
      }}
      className={activeCategory === i ? 'active' : ''}>
      {c}
    </li>
  ));
  return (
    <div className="categories">
      <ul>{categoriesElement}</ul>
    </div>
  );
};

export default Categories;
