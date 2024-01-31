import { useDeferredValue } from "react";
import { useRouter } from "../../../route/hook/useRouter";
import { useBoardListQuery } from "../service/query/boardListQuery";
import { Box, Checkbox, MenuItem, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography } from "@mui/material";
import { useListControl } from "../../../hook/useListControl";
import { CommonConstants } from "../../../common/common-constants";
import { getAutoFormattedDate } from "../../../common/common-utils";

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

const HEADER_LIST = [
  {
    column: "id",
    label: "아이디",
    sort: true,
    width: 200,
    textAlign: "center",
    itemTextAlign: "center"
  },
  {
    column: "title",
    label: "제목",
    sort: true,
    textAlign: "center"
  },
  {
    column: "regDate",
    label: "게시일",
    sort: true,
    width: 200,
    textAlign: "center",
    itemTextAlign: "center"
  }
];

const TableHeader = ({listCtrl, boardList}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{width: 40}}>
          <Checkbox indeterminate={!!listCtrl.selectedList.length && listCtrl.selectedList.length < boardList.length}
            checked={!!boardList.length && listCtrl.selectedList.length === boardList.length}
            onChange={(event) => listCtrl.onSelectAllRows(event.target.checked, boardList.map(board => board.id))} />
        </TableCell>
        {
          listCtrl.headerList.map(header => (
            <TableCell key={header.column}
              sx={{
                ...(header.width && {width: header.width}),
                ...(header.textAlign && {textAlign: header.textAlign})
              }}>
              
              {header.isSort && listCtrl.onSort ? (
                <TableSortLabel hideSortIcon
                  active={listCtrl.sortField === header.column}
                  direction={listCtrl.sortField === header.column ? (listCtrl.isSortAsc ? "asc" : "desc") : "asc"}
                  onClick={() => listCtrl.onSort(header.column)}>
                  {header.label}

                  {listCtrl.sortField === header.column ? (
                    <Box sx={{...visuallyHidden}}>
                      {listCtrl.isSortAsc ? "sorted ascending" : "sorted descending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : header.label}

            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}

const BoardListItem = ({listCtrl, board}) => {

  const router = useRouter();
  const onClickTitle = (id) => {
    router.move(`${id}`);
  }

  return (
    <TableRow key={board.id}>
      <TableCell>
        <Checkbox checked={listCtrl.selectedList.includes(board.id)} onChange={() => listCtrl.onSelectRow(board.id)}/>
      </TableCell>
      {
        listCtrl.headerList.map(header => {
          switch (header.column) {
            case "id" :
              return (
                <TableCell key={header.column} sx={{...(header.itemTextAlign && {textAlign: header.itemTextAlign})}}>{board.id}</TableCell>
              );
            case "title" :
              return (
                <TableCell key={header.column}>
                  <Typography component="div" 
                    onClick={() => onClickTitle(board.id)}
                    sx={{
                      cursor: "pointer",
                      // ...(board.isRead ? {color: "#c0c0c0"} : {color: "#000", fontWeight: 600}),
                      ...(header.itemTextAlign && {textAlign: header.itemTextAlign})
                      }}>
                  {board.title}
                  </Typography>
                </TableCell>
              );
            case "regDate" :
              return (
                <TableCell key={header.column} sx={{...(header.itemTextAlign && {textAlign: header.itemTextAlign})}}>{getAutoFormattedDate(board.regDate)}</TableCell>
              );
          }
        })
      }
    </TableRow>
  )
}

export default function BoardList() {
  
  const listCtrl = useListControl({
    headerList: HEADER_LIST
  });

  const newListCtrl = useDeferredValue(listCtrl);
  const {data: boardList} = useBoardListQuery(newListCtrl);

  return (
    <Stack sx={{flex: 1, gap: 2, overflow: "auto"}}>
      <Typography variant="h6" sx={{mt: 2}}>
        Board List
      </Typography>

      <Stack sx={{flex: 1, height: 1, overflow: "auto"}}>
        <TableContainer sx={{position: "relative"}}>
          <Table stickyHeader>
            <TableHeader listCtrl={listCtrl} boardList={boardList}/>
            <TableBody>
              {
                boardList.map(board => (
                  <BoardListItem key={board.id} listCtrl={listCtrl} board={board}/>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        {
          !!boardList.length &&
          <Stack direction="row"
            alignItems="center"
            sx={{m: 1}}>
            <Stack direction="row"
              sx={{flex: 1, justifyContent: "center"}}>
              <Pagination count={listCtrl.getLastPageNumber()}
                page={listCtrl.page}
                onChange={(e, page) => listCtrl.onChangePage(page)}
                color="primary"/>
            </Stack>
            <Typography variant="body2">
              Total : {listCtrl.totalCount}
            </Typography>
            <TextField select
              size="small"
              value={listCtrl.pageSize}
              onChange={(e) => listCtrl.onChangePageSize(e.target.value)}
              sx={{ml: 1}}>
              {CommonConstants.PAGE_SIZE_LIST.map(page => (
                <MenuItem key={page} value={page}>{page}</MenuItem>
              ))}
            </TextField>
          </Stack>
        }
      </Stack>
    </Stack>
  )
}