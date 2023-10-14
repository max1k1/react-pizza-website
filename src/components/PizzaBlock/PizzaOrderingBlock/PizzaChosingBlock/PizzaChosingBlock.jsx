const PizzaChosingBlock = ({
  sizes,
  types,
  activeItemSize,
  onActiveItemSizeChange,
  activeItemType,
  onActiveItemTypeChange,
}) => {
  const typesElement = types.map((type, i) => (
    <li
      key={i}
      onClick={() => {
        onActiveItemTypeChange(i);
      }}
      className={activeItemType === i ? 'active' : ''}>
      {type === 0 ? 'thin bottom' : 'thick bottom'}
    </li>
  ));
  const sizesElement = sizes.map((size, i) => (
    <li
      key={i}
      onClick={() => {
        onActiveItemSizeChange(i);
      }}
      className={activeItemSize === i ? 'active' : ''}>
      {size} cm.
    </li>
  ));
  return (
    <div className="pizza-block__selector">
      <ul>{typesElement}</ul>
      <ul>{sizesElement}</ul>
    </div>
  );
};

export default PizzaChosingBlock;
