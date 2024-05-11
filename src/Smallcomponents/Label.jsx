const Label = ({ name }) => {
  return (
    <label htmlFor={name} className="mb-4 font-semibold text-[#96002e]">
      {name}
      {" : "}
    </label>
  );
};

export { Label };
