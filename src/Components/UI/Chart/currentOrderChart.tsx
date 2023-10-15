import React, { useLayoutEffect, useRef, startTransition } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import { randomFrom } from "../../../libs";
import { updateImage64 } from "../../../store/slices/currImageOrderSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

function CurrentOrderChart() {
  const currOrderData = usePivoSelector((state) => state.currentOrder.Items);
  const ctxRef = useRef<ChartJS>(null);
  const dispatch = usePivoDispatch();

  const PieData = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        hoverBackgroundColor: "rgba(255, 172, 115, 1)",
        borderWidth: 0.45,
      },
    ],
  };

  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart: any, args: any, options: any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const options = {
    animation: {
      onComplete: async function (animation: any) {
        //Сохранить картинку
        if (ctxRef.current) {
          let img: string = await ctxRef.current.toBase64Image(
            "image/jpeg",
            0.5
          );
          if (img && img.length > 0) {
            dispatch(updateImage64(img));
          }
        }
      },
    },
    plugins: {
      customCanvasBackgroundColor: {
        // color: "rgba(112, 205, 20436, 0.15)",
        color: "white",
      },
      tooltip: {
        backgroundColor: "rgba(45, 37, 108, 0.5)",
        titleColor: "#abfbaf",
        callbacks: {
          label: function (context: any) {
            // console.log(context.parsed);
            //let label = context.parsed || "";
            let label = "";
            if (context.parsed) label = "На сумму:";
            // if (label) {
            //   label += "На сумму: ";
            // }
            if (context.parsed !== null) {
              // console.log(context.parsed.y);
              label += new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
              }).format(context.parsed);
            }
            return label;
          },
          labelTextColor: function (context: any) {
            return "#cfa";
          },
        },
      },
    },
    scales: {},
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
    ChartJS.defaults.plugins.legend.display = false;
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
      <Chart
        type="doughnut"
        ref={ctxRef}
        options={options}
        data={PieData}
        plugins={[plugin]}
      />
    </div>
  );
}

export default React.memo(CurrentOrderChart);
