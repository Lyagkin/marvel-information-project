import "./Spinner.scss";

import spinner from "../../resources/img/spinner.gif";

function Spinner() {
  return (
    <div className="spinner">
      <img src={spinner} alt="spinner" />
    </div>
  );
}

export default Spinner;
