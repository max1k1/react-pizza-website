import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestSinglePizza,
  selectSingleItem,
  selectSingleItemStatus,
} from '../redux/slices/pizzasSlice';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaOrderingBlock from '../components/PizzaBlock/PizzaOrderingBlock/PizzaOrderingBlock';

const SinglePizza = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rating, title, imageUrl, price, sizes, types } = useSelector(selectSingleItem);
  const singleItemStatus = useSelector(selectSingleItemStatus);

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
                <PizzaOrderingBlock
                  id={id}
                  title={title}
                  imageUrl={imageUrl}
                  sizes={sizes}
                  types={types}
                  price={price}
                  isPriceParams={false}
                />
              </div>
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
