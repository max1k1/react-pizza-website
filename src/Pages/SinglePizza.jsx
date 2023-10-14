import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestSinglePizza,
  selectSingleItem,
  selectSingleItemStatus,
} from '../redux/slices/pizzasSlice';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaChosingBlock from '../components/PizzaChosingBlock/PizzaChosingBlock';

const SinglePizza = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rating, title, imageUrl, price, sizes, types } = useSelector(selectSingleItem);
  const singleItemStatus = useSelector(selectSingleItemStatus);
  const [activeItemSize, setActiveItemSize] = useState(0);
  const [activeItemType, setActiveItemType] = useState(0);
  const onActiveItemTypeChange = (index) => {
    setActiveItemType(index);
  };
  const onActiveItemSizeChange = (index) => {
    setActiveItemSize(index);
  };
  useEffect(() => {
    dispatch(requestSinglePizza(id));
  }, [dispatch, id]);
  return (
    <div>
      {singleItemStatus === 'loading' ? (
        <Skeleton />
      ) : (
        <div>
          <div className="single-pizza">
            <div className="single-pizza__main-block">
              <img src={imageUrl} alt="pizzaImage" />
              <h1>{title}</h1>
            </div>
            <div className="single-pizza__ordering-block">
              <div className="single-pizza__short-description">
                <span>Price: {price}$</span>
                <span> Rating: {rating}/10</span>
              </div>
              <div className="single-pizza__ordering-system">
                <PizzaChosingBlock
                  sizes={sizes}
                  types={types}
                  activeItemType={activeItemType}
                  onActiveItemTypeChange={onActiveItemTypeChange}
                  activeItemSize={activeItemSize}
                  onActiveItemSizeChange={onActiveItemSizeChange}
                />
              </div>
              {/* <button className="button button--outline button--add">
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
                <span>0</span>
              </button> */}
            </div>
          </div>
          <div className="single-pizza__full-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta officiis, qui ex error,
            modi illo amet accusamus dicta deserunt ratione rerum earum mollitia, officia
            repellendus enim similique aliquam. Amet, totam. Sed nostrum debitis, laborum aliquid
            suscipit corrupti beatae! Id adipisci deleniti vero ratione animi reprehenderit esse et
            maiores. Harum ipsam porro assumenda fuga consequuntur vel eius sequi asperiores est.
            Rerum?
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePizza;
