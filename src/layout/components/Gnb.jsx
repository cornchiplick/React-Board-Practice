import { useLocation } from "react-router-dom";
import { useRouter } from "../../route/hook/useRouter";
import { Box, Stack, Typography } from "@mui/material";
import { useGnbMenusQuery } from "../service/query/gnbMenusQuery";
import { useActiveGnb } from "../hook/useActiveGnb";
import { useEffect } from "react";

function GnbItem({menu}) {
  const router = useRouter();
  const isActive = useActiveGnb(menu.path);

  const onClickMove = (path) => {
    router.move(path);
  }

  return (
    <Box onClick={() => onClickMove(menu.path)} sx={{cursor: "pointer"}}>
      <Typography variant="h6"
        sx={{
          color: "#cecece",
          ...(isActive && {
            color: "#000"
          })
        }}>
        {menu.name}
      </Typography>
    </Box>
  );
}

export default function Gnb() {
  const {pathname} = useLocation();
  const router = useRouter();
  const {data: menus = []} = useGnbMenusQuery();

  useEffect(() => {
    if (!menus.length) return

    if (pathname === "/") {
      router.replace(menus[0].path)
    }
  }, [pathname, menus]);

  return (
    <Stack direction="row" sx={{gap: 2, mt: 2, mx: 2}}>
      {menus?.map(menu => (
        <GnbItem key={menu.id} menu={menu}/>
      ))}
      </Stack>
  );
}