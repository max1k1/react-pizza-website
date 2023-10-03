import ReactPaginate from "react-paginate";

const Pagination = ({onChangePage}) => {
    return ( <div className="pagination">
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event)=>{onChangePage(event.selected+1)}}
      pageRangeDisplayed={6}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  </div> );
}
 
export default Pagination;