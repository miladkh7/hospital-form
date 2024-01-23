import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
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
import { hospitalForms } from "../../../api/crud";

const GeneralInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.todos);
  const [allowContinue, setAllowContinue] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [data, setData] = useState(null)

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
  
  const dateHandler = (date) => {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it is zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    
    const formattedDateString = `${year}-${month}-${day}`;

    return formattedDateString
  }
  const handleButtonClick = async () => {
    try {
      const response = await hospitalForms({
        id: Math.random(),
        name: formData.hospitalName,
        province: formData.province,
        city: formData.city,
        created_date: dateHandler(formData.createdDate),
        design_date: dateHandler(formData.designedDate),
        sercice_date: dateHandler(formData.serviceDate),
        floor_on: Number(formData.floorsOn),
        floor_under: Number(formData.floorsUnder),
        address: formData.address,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        beds_num: Number(formData.bedsNumber),
        impact_factor: Number(formData.impactFactor),
        unit_price: Number(formData.unitPrice),
        soil_type: formData.soilType,
      });
      // formData.soilType
      console.log("Response from hospitalForms:", response);
      if (response) {
        navigate("/hospital-classification");
        setData(response)
        console.log(response.id, "resoonse");
        dispatch(form({ key: "id", value: response.id }))
      }
    } catch (error) {
      console.error("Error in hospitalForms:", error);
    }
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
                        label={"Block Name"}
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
                        label="Year of Design"
                        value={formData.designedDate}
                        onChange={(date) => formHandler("designedDate", date)}
                        showWholeDate={true}
                      />
                    </div>
                    <div className="col col-4">
                      <MiladiDatePicker
                        label="Year of Construction"
                        value={formData.createdDate}
                        onChange={(date) => formHandler("createdDate", date)}
                      />
                    </div>
                    <div className="col col-4">
                      <MiladiDatePicker
                        label="Year of Service"
                        value={formData.serviceDate}
                        onChange={(date) => formHandler("serviceDate", date)}
                      />
                    </div>
                    <div className="col col-6">
                      <TextInput
                        value={formData.floorsOn}
                        label="No. of Floors above Ground"
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
                        label="No. of Floors under Ground"
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
                        label="Total Number of Beds"
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
                          { title: "0.8" },
                          { title: "1" },
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
                          { title: "I" },
                          { title: "II" },
                          { title: "III" },
                          { title: "IV" },
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
                  zoom={4}
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
              onClick={allowContinue ? handleButtonClick : null}
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
