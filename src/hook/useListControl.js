import { useCallback, useEffect, useState } from 'react';

export const useListControl = (props) => {
  const [id, setId] = useState(props?.id || Date.now());

  const [page, setPage] = useState(props?.page || 1);
  const [pageSize, setPageSize] = useState(props?.pageSize || 10);
  const [totalCount, setTotalCount] = useState(props?.totalCount || 0);

  const [sortField, setSortField] = useState();
  const [isSortAsc, setSortAsc] = useState(false);

  const [headerList, setHeaderList] = useState(props?.headerList || []);
  const [selectedList, setSelectedList] = useState(props?.selectedList || []);

  const getLastPageNumber = useCallback(() => {
    return (
      parseInt(totalCount / pageSize) + (totalCount % pageSize !== 0 ? 1 : 0)
    );
  }, [totalCount, pageSize]);

  const onChangePage = useCallback(
    (page) => {
      setPage(page);
      setSelectedList([]);
    },
    [props],
  );

  const onChangePageSize = useCallback((pageSize) => {
    setPage(1);
    setPageSize(pageSize);
    setSelectedList([]);
  });

  const onChangeTotalCount = useCallback(
    (totalCount) => {
      setTotalCount(totalCount);
    },
    [props],
  );

  const onSort = useCallback(
    (column) => {
      const isAsc = sortField === column && isSortAsc;
      if ('' !== column) {
        setSortField(column);
        setSortAsc(!isAsc);
      }
    },
    [sortField, isSortAsc],
  );

  const onSelectRow = (itemId) => {
    const newSelected = selectedList.includes(itemId)
      ? selectedList.filter((value) => value !== itemId)
      : [...selectedList, itemId];
    setSelectedList(newSelected);
  };

  const onSelectAllRows = useCallback((checked, itemIdList) => {
    if (checked) {
      setSelectedList(itemIdList);
      return;
    }
    setSelectedList([]);
  }, []);

  const onResetTable = useCallback(() => {
    setId(props?.id || Date.now());
    setSortField(null);
    setSortAsc(false);
    setHeaderList(props?.headerList || []);
    setSelectedList(props?.selectedList || []);
  }, [props]);

  const getQueryParam = () => {
    let params = {
      _page: page,
      _limit: pageSize,
      _sort: 'regDate',
      _order: 'desc',
    };

    if (sortField) {
      params._sort = sortField;
      params._order = isSortAsc ? 'asc' : 'desc';
    }

    return params;
  };

  useEffect(() => {
    onResetTable();
  }, [props.id]);

  return {
    id,

    page,
    onChangePage,
    pageSize,
    onChangePageSize,
    totalCount,
    onChangeTotalCount,
    getLastPageNumber,

    sortField,
    isSortAsc,
    onSort,
    headerList,

    selectedList,
    onSelectRow,
    onSelectAllRows,

    getQueryParam,
  };
};
