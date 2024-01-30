import BoardContainer from "../components/BoardContainer";
import BoardList from "../components/BoardList";
import BoardView from "../components/BoardView";

export default function BoardRoute() {
  return {
    path: "/board",
    element: (
      <BoardContainer/>
    ),
    children: [
      {
        index: true,
        element: <BoardList/>
      },
      {
        path: ":id",
        element: <BoardView/>
      }
    ]
  }
}
