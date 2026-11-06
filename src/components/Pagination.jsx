
import { TablePagination } from "@mui/material";

function Pagination({
  count,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage
}) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 15]}
      onPageChange={(event, newPage) => {
        setPage(newPage);
      }}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      }}
    />
  );
}

export default Pagination;
