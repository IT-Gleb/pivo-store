import React, { useLayoutEffect, useRef, startTransition } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { usePivoSelector } from "../../../hooks/storeHooks";
import { randomFrom } from "../../../libs";

ChartJS.register(ArcElement, Tooltip, Legend);

function CurrentOrderChart() {
  const currOrderData = usePivoSelector((state) => state.currentOrder.Items);
  const ctxRef = useRef<ChartJS>(null);

  const PieData = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0.45,
      },
    ],
  };

  const getLabelsPie = () => {
    let res: any = [];
    if (currOrderData.length > 0) {
      currOrderData.forEach((item) => {
        res.push(item.name);
      });
    }
    return res;
  };
  const getDataPie = () => {
    let res: any = [];
    if (currOrderData.length > 0) {
      currOrderData.forEach((item) => {
        res.push(Number(item.price).toFixed(2));
      });
    }
    return res;
  };

  useLayoutEffect(() => {
    // ChartJS.defaults.responsive = true;
    // ChartJS.defaults.maintainAspectRatio = true;
    ChartJS.defaults.plugins.legend.display = true;
    ChartJS.defaults.plugins.legend.position = "right";
  }, []);

  useLayoutEffect(() => {
    startTransition(() => {
      PieData.labels = getLabelsPie();
      PieData.datasets[0].data = getDataPie();
      //console.log(PieData);

      let tmpBgColors: any = [];
      let tmpBorderColor: any = [];
      PieData.datasets[0].data.forEach((item) => {
        let tmpColor = `rgba(${randomFrom(125, 245)}, ${randomFrom(
          110,
          245
        )}, ${randomFrom(112, 245)}, 0.35)`;
        tmpBgColors.push(tmpColor);
      });
      PieData.datasets[0].data.forEach((item) => {
        let tmpColor = `rgba(${randomFrom(25, 45)}, ${randomFrom(
          11,
          24
        )}, ${randomFrom(11, 45)}, 1)`;
        tmpBorderColor.push(tmpColor);
      });

      PieData.datasets[0].backgroundColor = tmpBgColors;
      PieData.datasets[0].borderColor = tmpBorderColor;

      if (ctxRef.current) {
        ctxRef.current.update();
      }
    });
  }, [currOrderData]);

  return (
    <div className="p-1 m-0" style={{ width: 420, height: 360 }}>
      <Chart type="doughnut" ref={ctxRef} data={PieData} />
    </div>
  );
}

export default React.memo(CurrentOrderChart);
