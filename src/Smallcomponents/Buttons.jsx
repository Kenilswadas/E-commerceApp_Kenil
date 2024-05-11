// Button component
const Button = ({ btnName, faicon, clickHandler, disable }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => {
          clickHandler();
        }}
        disabled={disable}
        className=" flex items-center justify-center px-4 p-2 bg-gradient-to-r from-[#96002e] to-[#217aa9] text-white rounded-full transition-transform transform-gpu  hover:shadow-lg hover:underline underline-offset-2 mt-4	"
      >
        {faicon}
        {btnName}
      </button>
    </div>
  );
};

export { Button };
