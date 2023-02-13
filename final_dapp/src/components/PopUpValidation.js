import React from "react";
import "./PopUpValidation.css";

const PopUpValidation = (props) => {
  if (!props.open) return null;
  return (
    <div className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="popup"
      >
        <div className="popup-inner rounded-lg">
          <button onClick={props.onClose} className="close-button">
            X
          </button>
          <div className="">
            <div className="flex flex-col justify-center items-center">
              <p
                className={
                  props.authorized
                    ? "text-4xl font-black text-green-500 dark:text-green"
                    : "text-4xl font-black text-[#FF0000] dark:text-red"
                }
              >
                {props.authorized ? "Address Verified" : "Address Not Verified"}
              </p>
            </div>
            <p className="text-xl font-black text-gray-900 dark:text-black">
              {props.category ? `Category: ${props.category}` : ``}
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-black">
              {props.privacy ? `Privacy: ${props.privacy}` : ``}
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-black">
              {props.authorized ? "Authorization: Authorized" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpValidation;
