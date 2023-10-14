import { Link } from 'react-router-dom';
import PizzaOrderingBlock from './PizzaOrderingBlock/PizzaOrderingBlock';
const PizzaBlock = ({ id, title, imageUrl, price, sizes, types }) => {
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <PizzaOrderingBlock
        isPriceParams={true}
        id={id}
        title={title}
        imageUrl={imageUrl}
        price={price}
        sizes={sizes}
        types={types}
      />
    </div>
  );
};
export default PizzaBlock;
