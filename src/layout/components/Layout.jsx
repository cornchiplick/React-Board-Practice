import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Gnb from "./Gnb";

export default function Layout() {
  return (
    <Stack sx={{width: 1, height: 1}}>
      <Gnb/>
      <Stack sx={{flex: 1, overflow: "hidden"}}>
        <Outlet/>
      </Stack>
    </Stack>
  )
}