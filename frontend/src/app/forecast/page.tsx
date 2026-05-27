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

const data = [
  { month: "Jan", demand: 400 },
  { month: "Feb", demand: 520 },
  { month: "Mar", demand: 610 },
  { month: "Apr", demand: 590 },
  { month: "May", demand: 720 },
  { month: "Jun", demand: 840 },
  { month: "Jul", demand: 920 },
  { month: "Aug", demand: 1100 },
];

export default function ForecastPage() {

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
                AI Forecast
              </div>
            </Link>
          </li>

        </ul>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-10">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            AI Demand Forecasting
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            ML-based future business demand prediction
          </p>

        </div>

        {/* STATS */}

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

        {/* CHART */}

        <div className="bg-white p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Future Demand Prediction
          </h2>

          <div className="h-[450px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="#2563eb"
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