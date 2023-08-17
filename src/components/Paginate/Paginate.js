import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './Paginate.module.scss';

const cx = classNames.bind(styles);

function Paginate({ pageCount, setCurrentPage }) {
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <ReactPaginate
            className={cx('pagination')} //Tên lớp của vùng chứa phân trang.
            pageCount={pageCount} //Tổng số trang
            previousLabel="<" // Nhãn cho nút previous.
            previousLinkClassName={cx('page-link')} // Tên lớp trên thẻ a của nút previous.
            previousClassName={cx('page-item', 'previous-item')} // Tên lớp trên thẻ li của nút previous.
            breakLabel="..." // Nhãn cho dấu chấm lửng
            breakLinkClassName={cx('page-link')}
            breakClassName={cx('page-item')}
            pageLinkClassName={cx('page-link')} // Tên lớp trên thẻ a của từng phần tử trang.
            nextLabel=">"
            nextLinkClassName={cx('page-link')} // Tên lớp trên thẻ a của nút next.
            nextClassName={cx('page-item', 'next-item')} // Tên lớp trên thẻ li của nút next.
            pageClassName={cx('page-item')} // Tên lớp trên thẻ li của từng phần tử trang.
            activeClassName={cx('active')}
            disabledClassName={cx('disabled')}
            pageRangeDisplayed={0} // Phạm vi của các trang được hiển thị.
            marginPagesDisplayed={2} // Số lượng trang để hiển thị cho lề.
            onPageChange={handlePageClick}
        />
    );
}

export default Paginate;
