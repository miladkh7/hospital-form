import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../../../redux/slices/forms";
import Breadcrumb from "../../breadcrumb";
import SelectBox from "../../elements/selectBox";
import TextInput from "../../elements/textInput";
import MiladiDatePicker from "../../elements/datePicker";
import TextArea from "../../elements/textArea";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { floorsNoSetter, form } from "../../../redux/slices/forms";
import { Link, useNavigate } from "react-router-dom";
import { cities, states } from "../../elements/cityPicker";
import marker from "../../../assets/images/marker.svg";

const GeneralInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.todos);
  const [allowContinue, setAllowContinue] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  const markerIcon = new L.icon({
    iconUrl: marker,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  const formHandler = (key, value) => {
    dispatch(form({ key, value }));
  };
  useEffect(() => {
    if (
      formData.floorsOn &&
      formData.floorsOn.length > 0 &&
      formData.floorsUnder &&
      formData.floorsUnder.length > 0
    ) {
      dispatch(
        floorsNoSetter(
          parseInt(formData.floorsOn) + parseInt(formData.floorsUnder)
        )
      );
    }
  }, [formData.florsOn, formData.florsUnder]);

  useEffect(() => {
    setCityOptions(cities[formData.province] || []);
  }, [formData.province]);

  useEffect(() => {
    if (
      formData.address &&
      formData.bedsNumber &&
      formData.city &&
      formData.createdDate &&
      formData.designedDate &&
      formData.floorsOn &&
      formData.floorsUnder &&
      formData.hospitalName &&
      formData.impactFactor &&
      formData.latitude &&
      formData.longitude &&
      formData.province &&
      formData.serviceDate &&
      formData.soilType &&
      formData.unitPrice
    ) {
      setAllowContinue(true);
    } else {
      setAllowContinue(false);
    }
  }, [formData]);

  const Next = () => {
    navigate("/hospital-classification");
  };
  return (
    <section className="general-info">
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <Breadcrumb activeStep={1} />
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-8">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col col-6">
                      <TextInput
                        value={formData.hospitalName}
                        label={"Hospital Name"}
                        required={true}
                        onChange={(value) => formHandler("hospitalName", value)}
                      />
                    </div>
                    <div className="col col-6">
                      <TextInput
                        value={formData.block}
                        required={true}
                        label={"Block"}
                        onChange={(value) => formHandler("block", value)}
                      />
                    </div>
                    <div className="col col-6">
                      <SelectBox
                        value={formData.province}
                        label="Province"
                        options={states}
                        onChange={(title) => {
                          formHandler("province", title);
                        }}
                      />
                    </div>
                    <div className="col col-6">
                      <SelectBox
                        value={formData.city}
                        label="City"
                        options={cityOptions}
                        onChange={(value) => {
                          formHandler("city", value);
                        }}
                      />
                    </div>
                    <div className="col col-4">
                      {" "}
                      <MiladiDatePicker
                        label="Designed Date"
                        value={formData.designedDate}
                        dateFormat="MM/dd/yyyy"
                        onChange={(date) => formHandler("designedDate", date)}
                      />
                    </div>
                    <div className="col col-4">
                      <MiladiDatePicker
                        label="Cunstruction Date"
                        value={formData.createdDate}
                        onChange={(date) => formHandler("createdDate", date)}
                      />
                    </div>
                    <div className="col col-4">
                      <MiladiDatePicker
                        label="Years Of Service"
                        value={formData.serviceDate}
                        onChange={(date) => formHandler("serviceDate", date)}
                      />
                    </div>
                    <div className="col col-6">
                      <TextInput
                        value={formData.floorsOn}
                        label="Floors On"
                        required={true}
                        onChange={(value) => {
                          formHandler("floorsOn", value);
                        }}
                        type={"number"}
                      />
                    </div>
                    <div className="col col-6">
                      <TextInput
                        value={formData.floorsUnder}
                        label="Floors Under"
                        required={true}
                        onChange={(value) => {
                          formHandler("floorsUnder", value);
                        }}
                        type={"number"}
                      />
                    </div>

                    <div className="col col-12">
                      <TextArea
                        label="Address"
                        value={formData.address}
                        onChange={(value) => formHandler("address", value)}
                        required={true}
                        cols={5}
                      />
                    </div>
                    <div className="col col-6">
                      <TextInput
                        value={formData.latitude}
                        label="Latitude"
                        required={true}
                        onChange={(value) => {
                          formHandler("latitude", value);
                        }}
                        max={10}
                      />
                    </div>
                    <div className="col col-6">
                      <TextInput
                        value={formData.longitude}
                        label="Longitude"
                        required={true}
                        onChange={(value) => {
                          formHandler("longitude", value);
                        }}
                        max={10}
                      />
                    </div>
                    <div className="col col-4">
                      <TextInput
                        value={formData.bedsNumber}
                        label="Beds Number"
                        required={true}
                        onChange={(value) => {
                          formHandler("bedsNumber", value);
                        }}
                        type={"number"}
                      />
                    </div>
                    <div className="col col-4">
                      <SelectBox
                        value={formData.impactFactor}
                        label="Impact Factor"
                        options={[
                          { title: "0/2" },
                          { title: "0.5" },
                          { title: "0.75" },
                          { title: "1.2" },
                        ]}
                        onChange={(title) => {
                          formHandler("impactFactor", title);
                        }}
                      />
                    </div>
                    <div className="col col-4">
                      <TextInput
                        value={formData.unitPrice}
                        label="Unit Price (Million IRR)"
                        required={true}
                        onChange={(value) => {
                          formHandler("unitPrice", value);
                        }}
                        type={"number"}
                      />
                    </div>
                    <div className="col col-12">
                      <SelectBox
                        value={formData.soilType}
                        label="Soil Type"
                        options={[
                          { title: "type I" },
                          { title: "type II" },
                          { title: "type III" },
                          { title: "type IV" },
                        ]}
                        onChange={(title) => {
                          formHandler("soilType", title);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-4">
                <MapContainer
                  center={[formData.latitude, formData.longitude]}
                  zoom={6}
                  style={{ height: "565px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[formData.latitude, formData.longitude]}
                    icon={markerIcon}
                  ></Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          <div className="col col-12">
            <button
              className={`next ${allowContinue ? "" : "disable"}`}
              onClick={allowContinue ? Next : null}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GeneralInfo;
