/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMemo, useState } from "react";

import sample_data from "~/sample_data/data_time.json";

const ResponsiveCalendar = dynamic(
  () => import("@nivo/calendar").then((m) => m.ResponsiveCalendar),
  { ssr: false },
);

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((m) => m.ResponsiveLine),
  { ssr: false },
);

const styleById: Record<string, any> = {
  "Predicted consumption": {
    strokeDasharray: "6, 6",
    strokeWidth: 2,
  },
  "Predicted production": {
    strokeDasharray: "6, 6",
    strokeWidth: 2,
  },
  default: {
    strokeWidth: 2,
  },
};

const DashedLine = ({
  series,
  lineGenerator,
  xScale,
  yScale,
}: {
  series: any;
  lineGenerator: any;
  xScale: any;
  yScale: any;
}) => {
  return series.map(
    ({ id, data, color }: { id: string; data: any; color: any }) => {
      return (
        <path
          key={id}
          d={lineGenerator(
            data.map((d: any) => ({
              x: xScale(d.data.x),
              y: yScale(d.data.y),
            })),
          )}
          fill="none"
          stroke={color}
          style={styleById[id] || styleById.default}
        />
      );
    },
  );
};

const QuickCard = ({
  title,
  amount,
  estimated,
}: {
  title: string;
  amount: number;
  estimated: number;
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {amount.toLocaleString("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}{" "}
        W
      </dd>
      <dd className="mt-4 text-gray-500">
        Estimated tomorrow:{" "}
        {estimated.toLocaleString("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}{" "}
        W
      </dd>
    </div>
  );
};

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const groupByKey = (key: keyof (typeof sample_data)[0], invert = false) => {
  const holder: Record<string, number> = {};

  sample_data.forEach(function (d) {
    const date = formatDateToYYYYMMDD(new Date(d.date));

    if (holder.hasOwnProperty(date)) {
      if (invert) {
        holder[date] -= d[key];
      } else {
        holder[date] += d[key];
      }
    } else {
      if (invert) {
        holder[date] = -d[key];
      } else {
        holder[date] = d[key];
      }
    }
  });

  const clean = [];

  for (const prop in holder) {
    clean.push({ day: prop, value: holder[prop]! });
  }

  console.log(clean);

  return clean;
};

export default function GraphDashboard() {
  const consumedPower = useMemo(() => groupByKey("Consumed Power (W)"), []);
  const producedPower = useMemo(() => groupByKey("Produced Power (W)"), []);

  const [start, setStart] = useState(150);
  const [end, setEnd] = useState(200);

  return (
    <>
      <Head>
        <title>MeteOro - Terni</title>
        <meta
          name="description"
          content="MeteOro - NOI Hackathon Summer 2023"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-full bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center gap-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 391.1 280.1"
                    className="h-8 w-auto fill-gray-900">
                    <path d="M244.481 85.59c-2.485-30.284-17.369-58.538-42.616-80.343L195.789 0l-6.076 5.247c-25.248 21.805-40.131 50.059-42.616 80.343H0v9.295c0 55.255 52.809 100.207 117.721 100.207 15.27 0 29.855-2.514 43.256-7.039-13.201 13.351-31.764 39.767-31.764 82.762v9.295h132.658v-9.295c0-42.98-18.571-69.408-31.769-82.763 13.402 4.525 27.988 7.04 43.26 7.04 64.912 0 117.722-44.952 117.722-100.207V85.59H244.481zm-48.939 59.783c-11.134-11.608-18.535-25.749-20.67-41.192h41.341c-2.137 15.443-9.538 29.583-20.671 41.192zm.247-120.439c17.342 17.182 27.765 38.158 30.041 60.407h-60.082c2.276-22.249 12.7-43.225 30.041-60.407zM19.23 104.181h136.937c2.172 20.002 11.281 38.308 25.252 53.176-17.241 11.936-39.461 19.145-63.697 19.145-50.845-.001-92.871-31.677-98.492-72.321zM148.144 261.52c2.653-35.588 20.152-55.551 29.743-63.938a76.55 76.55 0 0 1 5.923 5.808c-9.005 13.475-17.315 32.565-18.972 58.131h-16.694zm35.308 0c1.312-17.604 6.261-31.373 12.085-41.82 5.826 10.451 10.779 24.221 12.093 41.82h-24.178zm42.792 0c-1.658-25.558-9.972-44.65-18.978-58.129a76.172 76.172 0 0 1 5.931-5.809c9.589 8.395 27.087 28.375 29.742 63.938h-16.695zm-30.704-72.697c-5.528-5.715-10.219-9.207-12.381-10.685a118.252 118.252 0 0 0 12.383-8.157 118.06 118.06 0 0 0 12.387 8.159c-2.169 1.483-6.862 4.972-12.389 10.683zm77.822-12.322c-24.236 0-46.456-7.209-63.697-19.145 13.971-14.869 23.079-33.174 25.252-53.176h136.937c-5.621 40.645-47.648 72.321-98.492 72.321z" />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-900">MeteOro</h2>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          {/* Header */}
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-5 tracking-tight text-gray-900">
                Terni
              </h1>
            </div>
          </header>

          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                {/* Overview */}
                <div>
                  <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <QuickCard
                      title={"Current consumption"}
                      amount={2534.21}
                      estimated={2700}
                    />
                    <QuickCard
                      title={"Current production"}
                      amount={2999.3}
                      estimated={300}
                    />
                    <QuickCard
                      title={"Net difference"}
                      amount={2999.3 - 2534.21}
                      estimated={300 - 2700}
                    />
                  </dl>
                </div>

                <div className="mt-8">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    History of consumption
                  </h3>

                  <div className="mt-5 h-96 w-full rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <ResponsiveCalendar
                      data={consumedPower}
                      from="2018-08-01"
                      to="2019-08-01"
                      emptyColor="#eeeeee"
                      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                      yearSpacing={40}
                      monthBorderColor="#ffffff"
                      dayBorderWidth={2}
                      dayBorderColor="#ffffff"
                      legends={[
                        {
                          anchor: "bottom-right",
                          direction: "row",
                          translateY: 36,
                          itemCount: 4,
                          itemWidth: 42,
                          itemHeight: 36,
                          itemsSpacing: 14,
                          itemDirection: "right-to-left",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    History of production
                  </h3>

                  <div className="mt-5 h-96 w-full rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <ResponsiveCalendar
                      data={producedPower}
                      from="2018-08-01"
                      to="2019-08-01"
                      emptyColor="#eeeeee"
                      colors={[
                        "#61cdbb",
                        "#97e3d5",
                        "#e8c1a0",
                        "#f47560",
                      ].reverse()}
                      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                      yearSpacing={40}
                      monthBorderColor="#ffffff"
                      dayBorderWidth={2}
                      dayBorderColor="#ffffff"
                      legends={[
                        {
                          anchor: "bottom-right",
                          direction: "row",
                          translateY: 36,
                          itemCount: 4,
                          itemWidth: 42,
                          itemHeight: 36,
                          itemsSpacing: 14,
                          itemDirection: "right-to-left",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Prediction
                  </h3>

                  <div className="mt-5 h-96 w-full rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <div className="flex justify-end">
                      <input
                        type="number"
                        onChange={(e) => setStart(parseInt(e.target.value))}
                        value={start}
                      />
                      <input
                        type="number"
                        onChange={(e) => setEnd(parseInt(e.target.value))}
                        value={end}
                      />
                    </div>
                    <ResponsiveLine
                      colors={["#f47560", "#e8c1a0", "#61cdbb", "#97e3d5"]}
                      data={[
                        {
                          id: "Actual consumption",
                          data: sample_data.slice(start, end).map((entry) => ({
                            x: new Date(entry.date),
                            y: entry["Produced Power (W)"],
                          })),
                        },
                        {
                          id: "Predicted consumption",
                          data: sample_data
                            .slice(end - 1, end + 24)
                            .map((entry) => ({
                              x: new Date(entry.date),
                              y: entry["Produced Power (W)"],
                            })),
                        },
                        {
                          id: "Actual production",
                          data: sample_data.slice(start, end).map((entry) => ({
                            x: new Date(entry.date),
                            y: entry["Consumed Power (W)"],
                          })),
                        },
                        {
                          id: "Predicted production",
                          data: sample_data
                            .slice(end - 1, end + 24)
                            .map((entry) => ({
                              x: new Date(entry.date),
                              y: entry["Consumed Power (W)"],
                            })),
                        },
                      ]}
                      enablePoints={false}
                      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                      xScale={{
                        type: "time",
                      }}
                      xFormat="time:%d"
                      yScale={{
                        type: "linear",
                      }}
                      yFormat={(value) =>
                        `${Number(value).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} W`
                      }
                      axisBottom={{ format: "%b %d %H:%M" }}
                      curve="monotoneX"
                      enableSlices={"x"}
                      useMesh={true}
                      layers={[
                        "grid",
                        "markers",
                        "areas",
                        "crosshair",
                        DashedLine,
                        "slices",
                        "points",
                        "axes",
                        "legends",
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
