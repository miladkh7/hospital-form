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

const HospitalClassification = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const [floors, setFloors] = useState([]);
  const [allowContinue, setAllowContinue] = useState(false);
  const formHandler = (key, value) => {
    dispatch(form({ key, value }));
  };
  useEffect(() => {
    const floorOn = [];
    const floorUnder = [];
    Array.from({ length: parseInt(formData.floorsUnder) }, (value, index) => {
      floorUnder.push({
        index: -index - 1,
        floor: 0,
        height: "",
        area: "",
      });
    });

    Array.from({ length: parseInt(formData.floorsOn) }, (value, index) => {
      floorOn.push({
        index: index++,
        floor: 0,
        height: "",
        area: "",
      });
    });
    setFloors(floorOn.reverse().concat(floorUnder));
  }, []);

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

    floor[key] = value;
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
                  {/* {floorsOn}
                {floorsUnder} */}
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
                            />
                          </div>

                          <div className="col col-4">
                            <TextInput
                              label="Floor Height (m)"
                              value={item.height}
                              required={true}
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
                    options={[
                      { title: "Reinforced Concrete" },
                      { title: "Steel" },
                      { title: "Masonry" },
                    ]}
                    onChange={(title) => formHandler("material", title)}
                  />
                  <span className="title">Lateral Load Resistant System</span>
                  <SelectBox
                    value={formData.lateralLoadResistantX}
                    label="X Direction"
                    options={[
                      { title: "Momemt Frames" },
                      { title: "Shear Walls" },
                      { title: "Braced Frames" },
                      { title: "Combinations" },
                    ]}
                    onChange={(title) =>
                      formHandler("lateralLoadResistantX", title)
                    }
                  />
                  <SelectBox
                    value={formData.lateralLoadResistantY}
                    label="Y Direction"
                    options={[
                      { title: "Momemt Frames" },
                      { title: "Shear Walls" },
                      { title: "Braced Frames" },
                      { title: "Combinations" },
                    ]}
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
                onClick={allowContinue ? Next : null}
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
