import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Grid = ({ data }) => {
  const nameData = [0, 0.2, 0.4, 0.6, 0.8, 1];

  const fragilityData = data?.fragility?.map((item, index) => ({
    name: nameData[index] || 0,
    collapse: item?.collapse || 0,
    extensive: item?.extensive || 0,
    moderate: item?.moderate || 0,
    slight: item?.slight || 0,
  }));

  const nameValuesSecondData = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];
  const hazardData =
    data && data.hazard
      ? data.hazard.map((item, index) => ({
          name: nameValuesSecondData[index] || 0,
          amplifiedHazard: item.amplifiedHazard || null,
          hazard: item.hazard || null,
        }))
      : [];

  const medicalData =
    data && data.medical
      ? data.medical.map((item, index) => ({
          name: nameData[index] || 0,
          slight: item.slight || null,
          moderate: item.moderate || null,
        }))
      : [];
  const architecturalData =
    data && data.architectural
      ? data.architectural.map((item, index) => ({
          name: nameData[index] || 0,
          slight: item.slight || null,
          moderate: item.moderate || null,
        }))
      : [];

  const lifelineData =
    data && data.lifeline
      ? data.lifeline.map((item, index) => ({
          name: nameData[index] || 0,
          slight: item.slight || null,
          moderate: item.moderate || null,
        }))
      : [];

  const nscData =
    data && data.nsc
      ? data.nsc.map((item, index) => ({
          name: nameData[index] || 0,
          slight: item.slight || null,
          moderate: item.moderate || null,
        }))
      : [];

  const structuralData =
    data && data.structural
      ? data.structural.map((item, index) => ({
          name: nameData[index] || 0,
          collapse: item?.collapse || 0,
          extensive: item?.extensive || 0,
          moderate: item?.moderate || 0,
          slight: item?.slight || 0,
        }))
      : [];

  const combinedData =
    data && data.combined
      ? data.combined.map((item, index) => ({
          name: nameData[index] || 0,
          collapse: item?.collapse || 0,
          extensive: item?.extensive || 0,
          moderate: item?.moderate || 0,
          slight: item?.slight || 0,
        }))
      : [];
  return (
    <section className="chart">
      {data ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col col-12">
              <div className="row">
                <LineChart width={450} height={300} data={fragilityData}>
                  <CartesianGrid strokeDasharray="0 1" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={["auto", "auto"]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="collapse"
                    stroke="#A3CC4A"
                    name="collapse"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="extensive"
                    stroke="#2BA90F"
                    strokeDasharray="3 2"
                    name="extensive"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#7A00C4"
                    strokeDasharray="3 2"
                    name="moderate"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="slight"
                    stroke="#C40000"
                    name="slight"
                    strokeWidth={2}
                  />
                </LineChart>
                <LineChart width={450} height={300} data={hazardData}>
                  <CartesianGrid strokeDasharray="0 1" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={["auto", "auto"]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amplifiedHazard"
                    stroke="#068800"
                    name="Amplified Hazard"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="hazard"
                    stroke="#C40000"
                    name="Hazard"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
            </div>
            <div className="col col-8">
              <div className="row">
                <LineChart width={200} height={300} data={medicalData}>
                  <CartesianGrid strokeDasharray="0 3" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={[0, 1]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="slight"
                    stroke="#C40000"
                    name="slight"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#3532C8"
                    name="moderate"
                    strokeWidth={2}
                  />
                </LineChart>
                <LineChart width={200} height={300} data={architecturalData}>
                  <CartesianGrid strokeDasharray="0 3" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={[0, 1]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="slight"
                    stroke="#C40000"
                    name="slight"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#3532C8"
                    name="moderate"
                    strokeWidth={2}
                  />
                </LineChart>
                <LineChart width={200} height={300} data={lifelineData}>
                  <CartesianGrid strokeDasharray="0 3" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={[0, 1]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="slight"
                    stroke="#C40000"
                    name="slight"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#3532C8"
                    name="moderate"
                    strokeWidth={2}
                  />
                </LineChart>
                <LineChart width={200} height={300} data={nscData}>
                  <CartesianGrid strokeDasharray="0 3" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={[0, 1]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="slight"
                    stroke="#C40000"
                    name="slight"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#3532C8"
                    name="moderate"
                    strokeWidth={2}
                  />
                </LineChart>
                <LineChart width={200} height={300} data={structuralData}>
                  <CartesianGrid strokeDasharray="0 1" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={["auto", "auto"]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="collapse"
                    stroke="#A3CC4A"
                    name="collapse"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="extensive"
                    stroke="#2BA90F"
                    strokeDasharray="3 2"
                    name="extensive"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#7A00C4"
                    strokeDasharray="3 2"
                    name="moderate"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="slight"
                    stroke="#C40000"
                    name="slight"
                    strokeWidth={2}
                  />
                </LineChart>
                <LineChart width={200} height={300} data={combinedData}>
                  <CartesianGrid strokeDasharray="0 1" />
                  <XAxis
                    dataKey="name"
                    type="number"
                    scale="pow"
                    domain={["auto", "auto"]}
                  />
                  <YAxis type="number" scale="pow" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="collapse"
                    stroke="#A3CC4A"
                    name="collapse"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="extensive"
                    stroke="#2BA90F"
                    strokeDasharray="3 2"
                    name="extensive"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#7A00C4"
                    strokeDasharray="3 2"
                    name="moderate"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="slight"
                    stroke="#C40000"
                    name="slight"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Grid;
