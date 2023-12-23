import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import "./style.scss";
import Chart from "./chart";
import Grid from "./grid";
import mockData from "../../api/mockData";
import RadioButton from "../elements/radioButton";
import Map from "./map";
const View = () => {
  const [activeTab, setActiveTab] = useState("grid");
  const [serachedValue, setSerachedValue] = useState("");
  const [expand, setExpand] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [filteredData, setFilteredData] = useState({});
  const [searchedData, setSearchedData] = useState(mockData);

  const filterData = () => {
    if (!selectedHospital) {
      setFilteredData({});
      return;
    }

    const selectedHospitalData = mockData.find(
      (item) => item.hospitalName === selectedHospital
    );

    if (selectedHospitalData) {
      setFilteredData(selectedHospitalData);
    } else {
      setFilteredData({});
    }
  };
  useEffect(() => {
    filterData();
  }, [selectedHospital]);
  const locations = mockData.map((item) => [item.latitude, item.longitude]);

  const searchData = (value) => {
    setSerachedValue(value);
    if (value && value.length > 0) {
      let updatedArray = [];
      mockData.map((item) => {
        if (item.hospitalName.includes(value)) {
          updatedArray.push(item);
        }
      });
      setSearchedData(updatedArray);
    } else setSearchedData(mockData);
  };

  return (
    <section className="view">
      <div className="filter">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "grid" ? "active" : ""}`}
            onClick={() => setActiveTab("grid")}
          >
            <span>Grid View</span>
          </div>
          <div
            className={`tab ${activeTab === "map" ? "active" : ""}`}
            onClick={() => setActiveTab("map")}
          >
            <span>Map View</span>
          </div>
          <div
            className={`tab ${activeTab === "chart" ? "active" : ""}`}
            onClick={() => setActiveTab("chart")}
          >
            <span>Chart View</span>
          </div>
        </div>
        <div className="filter-box">
          <div className="input-field">
            <input
              value={serachedValue}
              type="text"
              required={true}
              spellCheck="false"
              onChange={(e) => searchData(e.target.value)}
            />
            <i>
              <IoMdSearch />
            </i>
          </div>
          <div className="title">
            <div onClick={() => setExpand(!expand)}>
              {expand ? (
                <i>
                  <MdKeyboardArrowDown />
                </i>
              ) : (
                <i>
                  <MdKeyboardArrowUp />
                </i>
              )}
              <div>Hospital</div>
            </div>
            {expand ? (
              // <div className="hospitals">
              //   {searchedData.map((item) => {
              //     return (
              //       <div class="form-group">
              //         <input
              //           type="checkbox"
              //           name={item.hospitalName}
              //           id={item.hospitalName}
              //           value={item.hospitalName}
              //           onChange={(e) => {
              //             setSelectedHospital(e.target.value);
              //           }}
              //         />
              //         <label for={item.hospitalName}>{item.hospitalName}</label>
              //       </div>
              //     );
              //   })}
              // </div>
              <RadioButton
               title=""
               items={searchedData.map((item) => {
                 return {
                   label: item.hospitalName,
                   name: "hospital",
                 };
               })}
               onChange={(value) => setSelectedHospital(value)}
               value={selectedHospital}
             />
            ) : null}
             
          </div>
        </div>
      </div>
      <div className="visual">
        {activeTab === "chart" ? (
          <Chart data={mockData} />
        ) : activeTab === "grid" ? (
          <Grid data={filteredData.charts} />
        ) : activeTab === "map" ? (
          <Map locations={locations} />
        ) : null}
      </div>
    </section>
  );
};
export default View;
