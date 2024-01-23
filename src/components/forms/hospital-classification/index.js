import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import TextInput from "../../elements/textInput";
import Breadcrumb from "../../breadcrumb";
import RadioButton from "../../elements/radioButton";
import { useEffect, useState } from "react";
import { form } from "../../../redux/slices/forms";
import SelectBox from "../../elements/selectBox";
import Switch from "../../elements/switch";
import { useNavigate } from "react-router-dom";
import { hospitalFloors, hospitalClassification } from "../../../api/crud";
import { getGridData } from "../../../api/crud";

export const materials = [
  { title: "Reinforced Concrete" },
  { title: "Steel" },
  { title: "Masonry" },
];
export const subMaterials = {
  "Reinforced Concrete": [
    { title: "Moment Frames" },
    { title: "Shear Walls" },
    { title: "Braced Frames" },
    { title: "Combinations" },
  ],
  Steel: [
    { title: "Moment Frames" },
    { title: "Shear Walls" },
    { title: "Braced Frames" },
    { title: "Combinations" },
  ],
  Masonry: [{ title: "Unreinforced" }, { title: "Reinforced" }],
};
const HospitalClassification = () => {
  const [materialItems, setMaterialItems] = useState([]);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const [floors, setFloors] = useState([]);
  const [allowContinue, setAllowContinue] = useState(false);
  const formHandler = (key, value) => {
    dispatch(form({ key, value }));
  };
  useEffect(() => {
    formHandler("lateralLoadResistantX", "");
    formHandler("lateralLoadResistantY", "");
    setMaterialItems(subMaterials[formData.material] || []);
  }, [formData.material]);
  useEffect(() => {
    const floorOn = [];
    const floorUnder = [];
    Array.from({ length: parseInt(formData.floorsUnder) }, (value, index) => {
      floorUnder.push({
        index: -index - 1,
        height: "",
        area: "",
      });
    });

    Array.from({ length: parseInt(formData.floorsOn) }, (value, index) => {
      floorOn.push({
        index: index++,
        height: "",
        area: "",
      });
    });
    setFloors(floorOn.reverse().concat(floorUnder));
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = getGridData(formData.id);
  //     console.log("Response from getGridData:", response);
  //     // if (response) {
  //     //   setGridData(response);
  //     // }
  //     // return response;
  //   };
    
  //   getData()
  // }, [floors]);

  useEffect(() => {
    if (
      formData.standardEdition &&
      formData.controlSystem &&
      formData.material &&
      formData.lateralLoadResistantX &&
      formData.lateralLoadResistantY
    ) {
      setAllowContinue(true);
    } else {
      setAllowContinue(false);
    }
  }, [
    formData.standardEdition,
    formData.controlSystem,
    formData.material,
    formData.lateralLoadResistantX,
    formData.lateralLoadResistantY,
  ]);
  const changeRow = (item, key, value) => {
    const floor = floors.find((obj) => obj.index === item.index);
    floor[key] = parseFloat(value);
    const updatedFloor = floors.map((item) =>
      item.index === floor.index ? { ...item, ...floor } : item
    );
    setFloors(updatedFloor);
  };
  const Next = () => {
    formHandler("floors", floors);
    navigate("/components");
  };
  const Back = () => {
    navigate("/");
  };
  const handleButtonClick = async () => {
    try {
      const response = await hospitalFloors({ floors }, formData.id);
      const classificationResponse = await hospitalClassification(
        {
          standard_edition: formData.standardEdition,
          lateral_load_resistant_X: formData.lateralLoadResistantX,
          lateral_load_resistant_Y: formData.lateralLoadResistantY,
          Irregularity_vertical: formData.vertical,
          Irregularity_plan: formData.plan,
          control_system: formData.controlSystem,
        },
        formData.id
      );
      if (response && classificationResponse) {
        Next();
      }
    } catch (error) {
      console.error("Error in hospitalFloors:", error);
    }
  };
  return (
    <section className="hospital-classification">
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <Breadcrumb activeStep={2} />
          </div>
          <div className="col col-12">
            <div className="container-fluid">
              <div className="row">
                <div className="col col-5">
                  {floors.map((item) => {
                    return (
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col col-4">
                            <TextInput
                              label="Floor"
                              value={item.index}
                              required={true}
                              onChange={(value) => {}}
                              disable={true}
                            />
                          </div>

                          <div className="col col-4">
                            <TextInput
                              label="Floor Height (m)"
                              value={item.height}
                              required={true}
                              type={"number"}
                              step="any"
                              onChange={(value) => {
                                changeRow(item, "height", value);
                              }}
                            />
                          </div>
                          <div className="col col-4">
                            <TextInput
                              label="Floor Area (m^2)"
                              value={item.area}
                              required={true}
                              onChange={(value) => {
                                changeRow(item, "area", value);
                              }}
                              type={"number"}
                              step="any"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col col-3">
                  <RadioButton
                    title="Standard 2800 Edition"
                    items={[
                      {
                        label: "V1",
                        name: "standard",
                      },
                      {
                        label: "V2",
                        name: "standard",
                      },
                      {
                        label: "V3",
                        name: "standard",
                      },
                      {
                        label: "V4",
                        name: "standard",
                      },
                    ]}
                    onChange={(value) => formHandler("standardEdition", value)}
                    value={formData.standardEdition}
                  />
                  <span className="title">irregularity</span>
                  <Switch
                    isChecked={formData.vertical}
                    label="Vertical"
                    onChange={(value) => formHandler("vertical", value)}
                  />
                  <Switch
                    isChecked={formData.plan}
                    label="Plan"
                    onChange={(value) => formHandler("plan", value)}
                  />
                  <RadioButton
                    title="Structural Control System"
                    items={[
                      {
                        label: "none",
                        name: "Structural",
                      },
                      {
                        label: "Passive Control",
                        name: "Structural",
                      },
                      {
                        label: "Active Control",
                        name: "Structural",
                      },
                      {
                        label: "Semi Active",
                        name: "Structural",
                      },
                    ]}
                    value={formData.controlSystem}
                    onChange={(value) => formHandler("controlSystem", value)}
                  />
                </div>
                <div className="col col-4">
                  <span className="title">Material</span>
                  <SelectBox
                    value={formData.material}
                    label="Material"
                    options={materials}
                    onChange={(title) => formHandler("material", title)}
                  />
                  <span className="title">Lateral Load Resisting System</span>
                  <SelectBox
                    value={formData.lateralLoadResistantX}
                    label="X Direction"
                    options={materialItems}
                    onChange={(title) =>
                      formHandler("lateralLoadResistantX", title)
                    }
                  />
                  <SelectBox
                    value={formData.lateralLoadResistantY}
                    label="Y Direction"
                    options={materialItems}
                    onChange={(title) =>
                      formHandler("lateralLoadResistantY", title)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col col-12">
            <div className="btns">
              <button className="back" onClick={Back}>
                Back
              </button>
              <button
                className={`next ${allowContinue ? "" : "disable"}`}
                onClick={allowContinue ? handleButtonClick : null}
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
export default HospitalClassification;
