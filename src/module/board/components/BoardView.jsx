import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBoardSelectQuery } from "../service/query/boardSelectQuery";

export default function BoardView() {

  const {id} = useParams();
  const {data: board} = useBoardSelectQuery({id});

  return (
    <Stack sx={{flex: 1, gap: 2, overflow: "auto"}}>
      <Typography variant="h6">
        Board View : {id}
      </Typography>

      <Stack sx={{flex: 1, height: 1, overflow: "auto", gap: 2}}>
        <Typography variant="subtitle1">
          {board.title}
        </Typography>

        <Typography variant="body2">
          {board.regDate}
        </Typography>
        <Typography variant="body2">
          {board.contents}
        </Typography>
      </Stack>
    </Stack>
  )
}