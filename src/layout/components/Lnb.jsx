import { Stack } from "@mui/material";

export default function Lnb({sx, children}) {
  return (
    <Stack sx={{
      flex: 1,
      backgroundColor: "#cecece",
      ...sx
    }}>
      {children}
      <Stack sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        Lnb
      </Stack>
    </Stack>
  )
}