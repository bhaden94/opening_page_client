import React from "react";

const SpinnerPage = (props) => {

  const color = props.color

  return (
    <>
      <div className={`spinner-border ${color}`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

export default SpinnerPage;