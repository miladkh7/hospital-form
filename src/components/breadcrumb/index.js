import React from "react";
import "./style.scss";
const Breadcrumb = ({ activeStep }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="default-breadcrumb">
        <li
          className={`crumb ${
            activeStep === 1 ? "active" : activeStep > 1 ? "success" : ""
          }`}
        >
          <div className="link">
            <a>General Info</a>
          </div>
        </li>
        <li
          className={`crumb ${
            activeStep === 2 ? "active" : activeStep > 2 ? "success" : ""
          }`}
        >
          <div className="link">
            <a href="#">Hospital Classification</a>
          </div>
        </li>
        <li className={`crumb ${activeStep === 3 ? "active" : ""}`}>
          <div className="link">
            <a href="#">Non Stuructural Components</a>
          </div>
        </li>
      </ol>
    </nav>
    // <nav>
    //   <ol className="cd-breadcrumb triangle">
    //     <li className={`${activeStep === 1 ? "current" : ""}`}>
    //       <a href="#0">General Info</a>
    //     </li>
    //     <li className={`${activeStep === 2 ? "current" : ""}`}>
    //       <a href="#0">Hospital Classification</a>
    //     </li>
    //     <li className={`${activeStep === 3 ? "current" : ""}`}>
    //       <a>Add Non Stuructural Components</a>
    //     </li>
    //   </ol>
    // </nav>
  );
};
export default Breadcrumb;
