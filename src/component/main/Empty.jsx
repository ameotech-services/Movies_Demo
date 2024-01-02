import React from "react";

const Empty = (props) => {
  return (
    <div className="empty_outer">
      <div className="empty_body">
        <h2 className="empty_title">Your movie list is empty</h2>
        <div className="empty_btn">
          <button
            className="btn_common btn_global"
            onClick={() => props.handleBtnClick()}
          >
            Add a new movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empty;
