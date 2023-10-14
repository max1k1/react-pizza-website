import PizzaChosingBlock from './PizzaChosingBlock/PizzaChosingBlock';
import AddPizzaButton from './AddPizzaButton/AddPizzaButton';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, selectCartItemById } from '../../../redux/slices/cartSlice';

const PizzaOrderingBlock = ({ id, title, imageUrl, price, sizes, types, isPriceParams }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
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
    <div>
      {' '}
      <PizzaChosingBlock
        sizes={sizes}
        types={types}
        activeItemType={activeItemType}
        onActiveItemTypeChange={onActiveItemTypeChange}
        activeItemSize={activeItemSize}
        onActiveItemSizeChange={onActiveItemSizeChange}
      />
      <div className="pizza-block__bottom">
        {isPriceParams ? <div className="pizza-block__price">from {price} $</div> : ( <div></div>)}
        <AddPizzaButton addedCount={addedCount} onClickAddItem={onClickAddItem} />
      </div>
    </div>
  );
};

export default PizzaOrderingBlock;
