import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const hanldeClick = () => {
    localStorage.removeItem("token");
    navigate("/auth-login");
  };
  return (
    <div className="bg-black text-white font-medium w-full flex justify-end">
      <button
        onClick={hanldeClick}
        className="py-2 px-3 bg-blue-500 mx-4 my-2 rounded-[8px]"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
