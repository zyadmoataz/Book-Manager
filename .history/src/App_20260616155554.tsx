import PageLayout from "./components/layout/PageLayout";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  );
}

export default App;
