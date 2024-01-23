import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getGridData, getHospital } from "../../api/crud";
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
  const [gridData, setGridData] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedData, setSearchedData] = useState(hospital);

  const formData = useSelector((state) => state.todos);

  const getData = async () => {
    try {
      // setIsLoading(true)
      const response = await getGridData(formData.id);
      console.log("Response from getGridData:", response);
      if (response) {
        setGridData(response);
        // setIsLoading(false)
      } else {
        // setIsLoading(false)
      }
      return response;
    } catch (error) {
      console.log(error, "error getGridData");
    }
  };
  const hospitals = async () => {
    try {
      const getHospitals = await getHospital();

      if (getHospitals && getHospitals.length > 0) {
        setHospital(getHospitals);
        setSearchedData(getHospitals)
        console.log(hospital, "getHspital");
      }
    } catch (error) {
      console.log(error, "error in getHospital");
    }
  };

  useEffect(() => {
    hospitals();
    getData();
  }, []);

  const filterData = () => {
    if (!selectedHospital) {
      setFilteredData({});
      return;
    }

    const selectedHospitalData = hospital.find(
      (item) => item.name === selectedHospital
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
  const locations = hospital.map((item) => [item.latitude, item.longitude]);

  const searchData = (value) => {
    setSerachedValue(value);
    if (value && value.length > 0) {
      let updatedArray = [];
      hospital.map((item) =>
        item.name.includes(value) ? updatedArray.push(item) : null
      );
      setSearchedData(updatedArray);
    } else setSearchedData(hospital);
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
                    label: item.name,
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
          <Chart data={hospital} />
        ) : activeTab === "grid" ? (
          <Grid data={filteredData.charts} base64={gridData} />
        ) : activeTab === "map" ? (
          <Map
            locations={locations}
            filteredLocation={[filteredData.latitude, filteredData.longitude]}
          />
        ) : null}
      </div>
    </section>
  );
};
export default View;
