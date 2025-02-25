import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectBox from "../../elements/selectBox";
import TextInput from "../../elements/textInput";
import "./style.scss";
import { IoTrashBinOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  form,
  setComponentsList,
  clearForm,
  removeComponent,
} from "../../../redux/slices/forms";
import Breadcrumb from "../../breadcrumb";
import { hospitalComponents } from "../../../api/crud";

export const titleComponent = [
  { title: "Architectural Components" },
  { title: "Lifeline Systems" },
  { title: "Medical Equipment" },
];
export const subtitleComponent = {
  "Architectural Components": [
    { title: "Ceilings" },
    { title: "Partitions" },
    { title: "Suspended Lighting Fixtures" },
    { title: "Glass Windows" },
    { title: "Cladding" },
  ],
  "Lifeline Systems": [
    { title: "Supply" },
    { title: "Electric Power" },
    { title: "Heating" },
    { title: "Ventilation" },
    { title: "Air Conditioning" },
    { title: "Communication Systems" },
  ],
  "Medical Equipment": [
    { title: "Rigid Blocks" },
    { title: "Medical Cabinet" },
    { title: "Wheel Equipment" },
    { title: "Unanchored Contents" },
  ],
};
const Components = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.todos);
  const [localForm, setLocalForm] = useState({
    floorNumber: "",
    count: "",
    component: "",
    element: "",
    cost: "",
    isEmbraced: "",
    serviceYears: "",
  });
  const [subtitleCompoenent, setSubtitleCompoenent] = useState([]);
  const [allowAdd, setAllowAdd] = useState(false);
  const [allowNext, setAllowNext] = useState(false);

  useEffect(() => {
    setLocalForm((prevForm) => ({
      ...prevForm,
      element: "",
    }));
    setSubtitleCompoenent(subtitleComponent[localForm.component] || []);
  }, [localForm.component]);

  useEffect(() => {
    if (
      localForm.floorNumber &&
      localForm.count &&
      localForm.component &&
      localForm.element &&
      localForm.cost &&
      localForm.isEmbraced &&
      localForm.serviceYears
    ) {
      setAllowAdd(true);
    } else {
      setAllowAdd(false);
    }
  }, [localForm]);
  useEffect(() => {
    if (formData.components.length > 0) {
      setAllowNext(true);
    } else {
      setAllowNext(false);
    }
  }, [formData.components]);

  const formHandler = (key, value) => {
    setLocalForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };
  const saveComponent = () => {
    const item = {
      floor_no: localForm.floorNumber,
      quantity: localForm.count,
      component: localForm.component,
      element: localForm.element,
      cost: localForm.cost,
      is_embraced: localForm.isEmbraced,
      service_years: localForm.serviceYears,
    };
    dispatch(setComponentsList(item));

    setLocalForm({
      floorNumber: "",
      count: "",
      component: "",
      element: "",
      cost: "",
      isEmbraced: "",
      serviceYears: "",
    });
  };
  const emptyForm = {
    floorNumber: "",
    count: "",
    component: "",
    element: "",
    cost: "",
    isEmbraced: "",
    serviceYears: "",
  };

  const removeComponentItem = (index) => {
    dispatch(removeComponent(index));
  };
  
  const handleButtonClick = async () => {
    try {
      const response = await hospitalComponents({medical_components: formData.components}, formData.id);
      console.log("Response from hospitalForms:", response);
      if (response) {
        navigate("/view");
      }
    } catch (error) {
      console.error("Error in hospitalForms:", error);
    }
  };

  console.log(formData.components, "formData.components");
//   {
//     "floor_no": 1,
//     "quantity": 2,
//     "component": "2",
//     "cost": 2,
//     "is_embraced": false,
//     "service_years": 3
// },



  return (
    <section className="components">
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <Breadcrumb activeStep={3} />
          </div>
          <div className="col col-6">
            <span className="title">Add Component</span>
            <TextInput
              value={localForm.floorNumber}
              label="Floor Number"
              required={true}
              onChange={(value) =>
                parseInt(value) >=
                  Math.min(
                    parseInt(formData.floorsOn),
                    -parseInt(formData.floorsUnder)
                  ) &&
                parseInt(value) <=
                  Math.max(
                    parseInt(formData.floorsOn - 1),
                    -parseInt(formData.floorsUnder)
                  )
                  ? formHandler("floorNumber", value)
                  : null
              }
              type={"number"}
              acceptNagative={true}
            />
            <TextInput
              value={localForm.count}
              label="Count"
              required={true}
              onChange={(value) => formHandler("count", value)}
              type={"number"}
            />
            {/* <SelectBox
              value={localForm.component}
              label="Components"
              options={[
                { title: "ceilings" },
                { title: "partitions" },
                { title: "suspended lighting fixtures" },
                { title: "glass windows" },
                { title: "cladding" },
              ]}
              onChange={(value) => formHandler("component", value)}
            /> */}
            <div className="row">
              <div className="col col-6">
                <SelectBox
                  value={localForm.component}
                  label="component"
                  options={titleComponent}
                  onChange={(title) => {
                    formHandler("component", title);
                  }}
                />
              </div>
              <div className="col col-6">
                <SelectBox
                  value={localForm.element}
                  label="element"
                  options={subtitleCompoenent}
                  onChange={(value) => {
                    formHandler("element", value);
                  }}
                />
              </div>
            </div>
            <TextInput
              value={localForm.cost}
              label="Cost (Million IRR)"
              required={true}
              onChange={(value) => formHandler("cost", value)}
              type={"number"}
            />
            <SelectBox
              value={localForm.isEmbraced}
              label="Is Embraced"
              options={[{ title: "Yes" }, { title: "No" }]}
              onChange={(value) => formHandler("isEmbraced", value)}
            />
            <TextInput
              value={localForm.serviceYears}
              label="Years of Service"
              required={true}
              onChange={(value) => formHandler("serviceYears", value)}
              type={"number"}
            />
            <div className="btns">
              <button className="back" onClick={() => setLocalForm(emptyForm)}>
                Cancel
              </button>
              <button
                className={`next ${allowAdd ? "" : "disable"}`}
                onClick={allowAdd ? saveComponent : null}
              >
                Save
              </button>
            </div>
          </div>
          <div className="col col-6">
            {formData.components &&
              formData.components?.map((item) => {
                return (
                  <div className="item">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col col-6">
                          <div className="item-row">
                            <span className="label">Floor Number:</span>{" "}
                            <span className="value">{item.floor_no}</span>
                          </div>
                        </div>
                        <div className="col col-6">
                          <div className="item-row">
                            <span className="label">Count:</span>{" "}
                            <span className="value">{item.quantity}</span>
                          </div>
                        </div>
                        <div className="col col-6">
                          <div className="item-row">
                            <span className="label">Coponent:</span>{" "}
                            <span className="value">{item.component}</span>
                          </div>
                        </div>
                        <div className="col col-6">
                          <div className="item-row">
                            <span className="label">Element:</span>{" "}
                            <span className="value">{item.element}</span>
                          </div>
                        </div>
                        <div className="col col-6">
                          <div className="item-row">
                            <span className="label">Cost:</span>{" "}
                            <span className="value">{item.cost}</span>
                          </div>
                        </div>
                        <div className="col col-6">
                          <div className="item-row">
                            <span className="label">isEmbraced:</span>{" "}
                            <span className="value">{item.is_embraced}</span>
                          </div>
                        </div>
                        <div className="col col-6">
                          <div className="item-row">
                            <span className="label">Years of Service:</span>{" "}
                            <span className="value">{item.service_years}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <i
                      onClick={() =>
                        removeComponentItem(formData.components.indexOf(item))
                      }
                    >
                      <IoTrashBinOutline />
                    </i>
                  </div>
                );
              })}
          </div>
          <div className="col col-12">
            <div className="btns">
              <button
                className="back"
                onClick={() => navigate("/hospital-classification")}
              >
                Back
              </button>
              <button
                className={`next ${allowNext ? "" : "disable"}`}
                onClick={allowNext ? handleButtonClick : null}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Components;
