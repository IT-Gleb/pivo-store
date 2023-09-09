// import React from "react";
import type { Props } from "../types";

import TabsComponent from "../Components/Menu/TabsComponent";

function MainBody({ children }: Props) {
  return (
    <main className="container my-sticky pl-4 pr-4 has-background-white">
      <TabsComponent />

      {children}
    </main>
  );
}

export default MainBody;
