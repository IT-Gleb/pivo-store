import { useLayoutEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import type { IChartComponentProp } from "../../../types";
import { checkYear, randomFrom } from "../../../libs";
import useScreenWidth from "../../../hooks/screenWidth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  PointElement,
  LineElement
);

const minScreenWidth: number = 540;

function RandomChart({ fromYear, nameItem }: IChartComponentProp) {
  const { screenWidth } = useScreenWidth();
  const ChartRef = useRef<ChartJS>();

  const options = {
    responsive: true,
    //maintainAspectRatio: false,
    // stacked: false,

    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,
        // position: "right" as const,
        display: screenWidth > minScreenWidth ? true : false,
        labels: {
          font: {
            family: `"myRoboto"`,
            size: 12,
            weight: "normal",
          },
        },
      },
      title: {
        display: true,
        text: `График продаж ${String(nameItem).toUpperCase()}`,
        font: {
          size: 14,
          weight: "bold",
          family: `"myRoboto", sans-serif`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        // display: false,
        display: screenWidth > minScreenWidth ? true : false,

        title: {
          display: true,
          text: String("Произведено продукта").toUpperCase(),
          color: "rgb(12, 160, 24)",
          font: {
            size: 10,
          },
        },
        // grid: {
        //   display: true,
        // },
        ticks: {
          color: "rgb(15, 86, 26)",
          stepSize: 150,

          callback: (value: any, index: number, ticks: any) => {
            let opt = { style: "decimal" };
            return value > 0
              ? new Intl.NumberFormat("ru-RU", opt).format(value) + " dal"
              : value;
          },
          font: {
            weight: "bolder",
            size: 10,
            family: `"myRoboto"`,
          },
        },
      },
      y: {
        beginAtZero: true,
        display: screenWidth > minScreenWidth ? true : false,
        // display: false,
        title: {
          display: true,
          text: String("производится по времени (лет)").toUpperCase(),
          color: "rgb(78, 24, 36)",
          font: {
            size: 10,
          },
        },

        // grid: { display: true },
        ticks: {
          color: "rgb(120, 56, 55)",
          callback: function (value: any, index: number, ticks: any) {
            return (
              ChartData.labels[index] +
              ` /${new Intl.NumberFormat("ru-RU").format(
                ChartData.datasets[0].data[index]
              )} dal/`
            );
          },
          font: {
            weight: "bolder",
            size: 10,
            family: `"myRoboto",  serif`,
          },
        },
      },
    },
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
    // scales: {
    //   y: {
    //     type: "linear" as const,
    //     display: true,
    //     position: "left" as const,
    //     // grid: {
    //     //   drawOnChartArea: false,
    //     // },
    //   },
    //},
  };

  const ChartData = {
    labels: [],
    datasets: [
      {
        order: 1,
        type: "bar" as const,
        data: [20, 12, 28, 35, 30],
        backgroundColor: ["rgba(99, 180, 132, 0.75)"],
        hoverBackgroundColor: "rgb(145, 156, 245)",
        label: "сотен dal //декалитров// в год",
        // barThickness: 70,
        // barPercentage: 0.5,
        // categoryPercentage: 0.5,
      },
      {
        order: 0,
        type: "line" as const,
        label: "Среднее значение",
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: "rgba(55, 89, 242, 0.25)",
        borderColor: "lightcoral",
        borderWidth: 2,
        pointStyle: "line",
        // pointStyle: false,
        fill: true,
        // yAxisID: "y",
        // position: { x: 0 },
        // x: -10,
        // beginAtZero: true,
      },
    ],
  };

  useLayoutEffect(() => {
    // console.log(screenWidth);
    let lbls: any = ["2007", "2008", "2009", "2010", "2011"];

    if (fromYear) {
      let maxYear: number = new Date(Date.now()).getFullYear();
      let minYear: number = Number(checkYear(fromYear));
      if (isNaN(minYear)) minYear = 2007;
      let minY = minYear;
      let tmpYears: Array<number> = [];
      while (minY < maxYear) {
        tmpYears.push(minY);
        minY += 1;
      }
      if (tmpYears.length > 0) {
        lbls = tmpYears.map((item) => {
          return String(item) + "г.";
        });

        ChartData.labels = Array.from(lbls);

        //------------------------Add Data---------------------------
        ChartData.datasets[0].data = [];
        ChartData.datasets[0].backgroundColor = [];
        let tmpVal: number = 0;
        for (let i: number = 0; i < lbls.length; i++) {
          tmpVal = randomFrom(100, 2500);
          ChartData.datasets[0].data.push(tmpVal);
        }
        ChartData.datasets[0].data[0] = randomFrom(100, 700);

        //------------------------------------------------------------

        let Sum = ChartData.datasets[0].data.reduce((acc, currI) => {
          return acc + currI;
        }, 0);
        Sum = Math.floor(Sum / ChartData.datasets[0].data.length);

        //------------------Add Colors----------------------------
        for (let i: number = 0; i < ChartData.datasets[0].data.length; i++) {
          tmpVal = ChartData.datasets[0].data[i];
          if (tmpVal <= Sum) {
            ChartData.datasets[0].backgroundColor.push("rgb(130, 9, 18)");
          } else {
            ChartData.datasets[0].backgroundColor.push("rgb(14, 169, 45)");
          }
        }
        //-------------------------------------------------
        ChartData.datasets[0].label = `сотен dal //декалитров// в год`;
        //Установить среднее значение
        ChartData.datasets[1].label = `Среднее значение`;
        // ChartData.datasets[1].pointStyle = "cross";
        ChartData.datasets[1].pointStyle = "rect";

        ChartData.datasets[1].data = [];
        for (let i: number = 0; i < ChartData.datasets[0].data.length; i++) {
          ChartData.datasets[1].data.push(Sum);
        }
        // ChartData.datasets[1].data.unshift(23);
      }
      //   console.log(fromYear, minYear, maxYear);
    }
    if (ChartRef.current) ChartRef.current.update();
  });

  return (
    <>
      <Chart
        type={"bar"}
        ref={ChartRef}
        options={options}
        data={ChartData}
      ></Chart>
    </>
  );
}

export default RandomChart;
