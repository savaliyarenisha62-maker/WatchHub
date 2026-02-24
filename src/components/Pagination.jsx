import "./Pagination.css";

const Pagination = ({ currentPage, totalPage, onPrev, onNext, postsPerPage, setPostsPerPage }) => {
  return (
    <div className="pagination">
     
    

      <button className="page-btn" onClick={onPrev} disabled={currentPage === 1}>PREV</button>

      <span>{currentPage} of {totalPage}</span>
      
      <button  className="page-btn" onClick={onNext} disabled={currentPage === totalPage}>NEXT</button>
    </div>
  );
};
  export default Pagination;