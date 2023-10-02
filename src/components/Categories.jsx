const Categories = ({ activeItemCategory, setActiveItemCategory }) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
  const categoriesElement = categories.map((c, i) => (
    <li
      key={i}
      onClick={() => {
        setActiveItemCategory(i);
      }}
      className={activeItemCategory === i ? 'active' : ''}>
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
