import React, { Suspense } from "react";
import type { Props } from "../types";

// import TabsComponent from "../Components/Menu/TabsComponent";
import PivoSpinner from "../Components/UI/Spinner/pivoSpinner";
const TabsComp = React.lazy(() => import("../Components/Menu/TabsComponent"));

function MainBody({ children }: Props) {
  return (
    <main className="container my-sticky pl-4 pr-4 has-background-white">
      {/* <TabsComponent /> */}
      <Suspense fallback={<PivoSpinner text="загружаю Tabs..." />}>
        <TabsComp />
      </Suspense>

      {children}
    </main>
  );
}

export default MainBody;
