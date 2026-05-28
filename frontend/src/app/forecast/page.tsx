"use client";

import Link from "next/link";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";

export default function ForecastPage() {

  const [data, setData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forecast`
      );

      const result =
        await response.json();

      setData(result);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-screen text-3xl font-bold">

        Loading AI Forecast...

      </div>
    );
  }

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}

      <div className="w-64 bg-slate-900 text-white p-5">

        <h1 className="text-3xl font-bold mb-10">
          Amdox ERP
        </h1>

        <ul className="space-y-4">

          <li>

            <Link href="/dashboard">

              <div className="hover:bg-slate-700 p-3 rounded-lg">

                Dashboard

              </div>

            </Link>

          </li>

          <li>

            <Link href="/forecast">

              <div className="bg-slate-700 p-3 rounded-lg">

                🤖 AI Forecast

              </div>

            </Link>

          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">

            AI Demand Forecasting

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            ML-based future business demand prediction

          </p>

        </div>

        {/* AI STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <p className="text-gray-500">

              Forecast Accuracy

            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">

              96%

            </h2>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <p className="text-gray-500">

              Predicted Growth

            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">

              +28%

            </h2>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <p className="text-gray-500">

              AI Confidence

            </p>

            <h2 className="text-4xl font-bold text-purple-600 mt-3">

              High

            </h2>

          </div>

        </div>

        {/* CHART SECTION */}

        <div className="bg-white p-8 rounded-3xl shadow-xl">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">

              Future Demand Prediction

            </h2>

            <button
              onClick={fetchForecast}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-2xl
                shadow-lg
                transition
              "
            >
              Refresh AI Forecast
            </button>

          </div>

          <div className="h-[450px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={data}>

                <defs>

                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >

                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                    />

                    <stop
                      offset="100%"
                      stopColor="#9333ea"
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="url(#colorGradient)"
                  strokeWidth={5}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}