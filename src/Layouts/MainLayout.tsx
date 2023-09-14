import React, { Suspense, useLayoutEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
//import TopHeader from "./TopHeader";
// import MainBody from "./MainBody";
//import FooterMain from "./FooterMain";
import Pic1 from "../assets/imgs/0001.jpg";
import Pic2 from "../assets/imgs/0002.jpg";
import Pic3 from "../assets/imgs/0004.jpg";
import { randomFrom } from "../libs";
import PivoSpinner from "../Components/UI/Spinner/pivoSpinner";

const TopHeaderComponent = React.lazy(() => import("./TopHeader"));
const MainBodyComponent = React.lazy(() => import("./MainBody"));
const FooterComponent = React.lazy(() => import("./FooterMain"));

function MainLayout() {
  const BodyRef = useRef<any>(null);
  const PickBack = [Pic1, Pic2, Pic3];

  useLayoutEffect(() => {
    let ind = randomFrom(0, PickBack.length);
    if (BodyRef.current === null) {
      BodyRef.current = document.body;
      if (BodyRef.current) {
        BodyRef.current.style.backgroundAttachment = "fixed";
        BodyRef.current.style.backgroundRepeat = "no-repeat";
        BodyRef.current.style.backgroundPosition = "bottom center";
        BodyRef.current.style.backgroundSize = "cover";
        BodyRef.current.style.backgroundImage = `url(${PickBack[ind]})`;
      }
    }
    return () => {
      BodyRef.current = null;
    };
  }, []);

  return (
    <>
      <Suspense fallback={<PivoSpinner text="Гружу Top..." />}>
        <TopHeaderComponent />
      </Suspense>

      <Suspense fallback={<PivoSpinner text="Гружу основняк..." />}>
        <MainBodyComponent>
          <Outlet />
        </MainBodyComponent>
      </Suspense>
      <Suspense fallback={<PivoSpinner text="Гружу..." />}>
        <FooterComponent />
      </Suspense>
    </>
  );
}

export default React.memo(MainLayout);
