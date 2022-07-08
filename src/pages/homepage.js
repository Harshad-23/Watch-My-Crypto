import { LinearProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import Banner from "../components/banner";
//import CoinsTable from "../components/coinsTable";

const CoinsTable = lazy(() => import("../components/coinsTable"));

function HomePage() {
  return (
    <>
      <Banner />
      <Suspense fallback={<LinearProgress />}>
        <CoinsTable />
      </Suspense>
    </>
  );
}

export default HomePage;
