import { Outlet } from "react-router";
import ListarPrisioneiros from "./components/prisioneiro/ListarPrisioneiros";

function App() {
  return (
    <>
      <Outlet />
      {/* <ListarPrisioneiros /> */}
    </>
  );
}

export default App;
