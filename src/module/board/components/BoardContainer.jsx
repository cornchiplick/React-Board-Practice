import { Button, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import { useRecoilState } from "recoil";
import BoardWrite from "./BoardWrite";
import { writeAtom } from "../recoil/board-atom";
import Lnb from "../../../layout/components/Lnb";
import { Outlet } from "react-router-dom";

export default function BoardContainer() {

  const [writeState, setWriteState] = useRecoilState(writeAtom);
  const onClickShowWrite = () => {
    setWriteState({isShow: true, id: ""});
  };

  return (
    <Stack sx={{mt: 1, width: 1, height: 1, gap: 2}}>
      <Typography variant="h4">Board Container</Typography>
      <Stack direction="row"
        sx={{
          flex: 1,
          gap: 2,
          overflow: "auto"
        }}>
        {/* 좌측 LNB */}
        <Stack sx={{width: 300}}>
          <Lnb>
            <Stack sx={{p: 2}}>
              <Button fullWidth variant="contained" onClick={onClickShowWrite}>
                Write
              </Button>
            </Stack>
          </Lnb>
        </Stack>

        {/* 우측 Contents */}
        <Stack sx={{flex: 1, overflow: "auto"}}>
          <Suspense>
            <Outlet/>
          </Suspense>
        </Stack>

      </Stack>
      {writeState.isShow && <BoardWrite/>}
    </Stack>
  )
}