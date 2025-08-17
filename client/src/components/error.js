import React from "react";

function Error({ message = "Something went wrong. Please try again later!" }) {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Error; 