import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { FaRegCalendarAlt } from "react-icons/fa";

const MiladiDatePicker = ({label, value, onChange, ...otherProps}) => {
  return (
    <div className={`date-picker ${value ? 'active': ''}`}>
      <DatePicker
        selected={value}
        value={value}
        onChange={(date) => onChange(date)}
        dateFormat="yyyy"
        showYearPicker
        {...otherProps}
      />
      <span className="label">{label}</span>
      <i><FaRegCalendarAlt /></i>
    </div>
  );
};
export default MiladiDatePicker;
