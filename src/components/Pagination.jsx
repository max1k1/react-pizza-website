import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';
const Pagination = ({ currentPage }) => {
  const dispatch = useDispatch();
  return (
    <div className="pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => {
          console.log(event.selected);
          dispatch(setCurrentPage(event.selected + 1));
        }}
        pageRangeDisplayed={6}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
