 const Button = ({ children, type = "button", label="",icon="" ,className = "" , onClick=()=>{}}) => {
  return (
    <button
      type={type}
      className={`flex-row-reverse ${className} py-2 rounded-md`}
      onClick={onClick}
    >
      {label}
      {icon}
    </button>
  );
};

export default Button