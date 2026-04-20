import {
  useGridApiContext,
  useGridSelector,
  gridFilteredSortedRowIdsSelector,
  type GridPaginationModel,
} from "@mui/x-data-grid";

import CustomPagination from "../shared/CustomPagination";

type PropertiesPaginationFooterProps = {
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
};

export default function PropertiesPaginationFooter({
  paginationModel,
  setPaginationModel,
}: PropertiesPaginationFooterProps) {
  const apiRef = useGridApiContext();

  const filteredSortedRowIds = useGridSelector(
    apiRef,
    gridFilteredSortedRowIdsSelector
  );

  const filteredRowCount = filteredSortedRowIds.length;

  return (
    <CustomPagination
      page={paginationModel.page}
      pageSize={paginationModel.pageSize}
      rowCount={filteredRowCount}
      totalCountLabel="総物件数"
      onPageChange={(newPage) =>
        setPaginationModel({
          ...paginationModel,
          page: newPage,
        })
      }
    />
  );
}