import React from "react";
const Inputfield = ({ formik, fieldName, fieldtype }) => {
  return (
    <div>
      <input
        id={fieldName}
        type={fieldtype}
        {...formik.getFieldProps(fieldName)}
        placeholder={fieldName}
        className="bg-white text-[#3C3454] rounded-full mt-5 pl-4 p-0.5 w-64 border-2 border-[#D9D9D]"
      />
       {formik.touched[fieldName] && formik.errors[fieldName] ? (
        <div className="text-red-800">{formik.errors[fieldName]}</div>
      ) : null}
    </div>
  );
};

export { Inputfield };
