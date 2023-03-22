import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@emotion/react";

const OverviewChart = ({ chartData }) => {
  console.log(chartData);
  const theme = useTheme();
  const [dailyChargeLine] = useMemo(() => {
    if (!chartData) return [];

    const { dailyBill } = chartData;
    console.log("daily Bill", dailyBill);

    const dailyChargeLine = {
      id: "dailyTotal",
      color: "#042878",
      data: [],
    };
    // Object.values(dailyBill).reduce(({ day, dailyTotal }) => {
    //   console.log(day, dailyTotal);
    //   dailyChargeLine.data = [
    //     ...dailyChargeLine.data,
    //     { x: day, y: dailyTotal },
    //   ];

    //   return { day, dailyTotal };
    // });

    for (let value of dailyBill) {
      console.log(value.day, value.dailyTotal);
      dailyChargeLine.data.push({ x: value.day, y: value.dailyTotal });
    }

    console.log(dailyChargeLine);
    return [[dailyChargeLine]];
  }, [chartData]); //eslint-disable-line react-hooks/exhaustive-deps

  if (!chartData) return "Loading...";

  return (
    <ResponsiveLine
      data={dailyChargeLine}
      //   theme={{
      //     axis: {
      //       domain: {
      //         line: {
      //           stroke: theme.palette.secondary[200],
      //         },
      //       },
      //       legend: {
      //         text: {
      //           fill: theme.palette.secondary[200],
      //         },
      //       },
      //       ticks: {
      //         line: {
      //           stroke: theme.palette.secondary[200],
      //           strokeWidth: 1,
      //         },
      //         text: {
      //           fill: theme.palette.secondary[200],
      //         },
      //       },
      //     },
      //     legends: {
      //       text: {
      //         fill: theme.palette.secondary[200],
      //       },
      //     },
      //     tooltip: {
      //       container: {
      //         color: theme.palette.primary.main,
      //       },
      //     },
      //   }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Total Bill Value  for Month",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      //   pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      //   pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      //   legends={[
      //     {
      //       anchor: "bottom-right",
      //       direction: "column",
      //       justify: false,
      //       translateX: 30,
      //       translateY: -40,
      //       itemsSpacing: 0,
      //       itemDirection: "left-to-right",
      //       itemWidth: 80,
      //       itemHeight: 20,
      //       itemOpacity: 0.75,
      //       symbolSize: 12,
      //       symbolShape: "circle",
      //       symbolBorderColor: "rgba(0, 0, 0, .5)",
      //       effects: [
      //         {
      //           on: "hover",
      //           style: {
      //             itemBackground: "rgba(0, 0, 0, .03)",
      //             itemOpacity: 1,
      //           },
      //         },
      //       ],
      //     },
      //   ]}
    />
  );
};

export default OverviewChart;
