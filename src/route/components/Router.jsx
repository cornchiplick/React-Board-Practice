import { useRoutes } from "react-router-dom";
import BaseRoute from "./BaseRoute";
import Red from "../../components/Red";
import Blue from "../../components/Blue";
import Green from "../../components/Green";
import BoardRoute from "../../module/board/route/BoardRouter";

export default function Router() {
  const bbsRoute = BoardRoute();

  return useRoutes([
    {
      path: "/",
      element: <BaseRoute/>,
      children: [
        {
          path: "red", element: <Red/>
        },
        {
          path: "blue", element: <Blue/>
        },
        {
          path: "green", element: <Green/>
        },
        {...bbsRoute}
      ]
    }
  ])
}