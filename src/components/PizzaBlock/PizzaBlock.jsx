import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, selectCartItemById } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import PizzaChosingBlock from '../PizzaChosingBlock/PizzaChosingBlock';
const PizzaBlock = ({ id, title, imageUrl, price, sizes, types }) => {
  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();
  const addedCount = cartItem ? cartItem.sameItemsIdCount : 0;

  const [activeItemSize, setActiveItemSize] = useState(0);
  const [activeItemType, setActiveItemType] = useState(0);
  const onActiveItemTypeChange = (index) => {
    setActiveItemType(index);
  };
  const onActiveItemSizeChange = (index) => {
    setActiveItemSize(index);
  };

  const onClickAddItem = () => {
    const item = {
      id,
      title,
      imageUrl,
      price,
      size: sizes[activeItemSize],
      type: types[activeItemType],
    };
    dispatch(addCartItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <PizzaChosingBlock
        sizes={sizes}
        types={types}
        activeItemType={activeItemType}
        onActiveItemTypeChange={onActiveItemTypeChange}
        activeItemSize={activeItemSize}
        onActiveItemSizeChange={onActiveItemSizeChange}
      />
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        <button onClick={onClickAddItem} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"></path>
          </svg>
          <span>{addedCount > 0 && <i> {addedCount}</i>}</span>
        </button>
      </div>
    </div>
  );
};
export default PizzaBlock;
