import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/axios-instance";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${BASE_URL}/api/auth/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await resp.json();
      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else {
        toast.error(json.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogin = () => {
    navigate("/auth-login");
  };

  return (
    <div className="px-4 md:px-8 mt-20 flex flex-col items-center">
      <div className="max-w-[320px] w-full">
        <h1 className="text-black font-bold text-4xl mb-12 text-center">
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={`rounded-[12px] w-full p-3 border-2 border-black placeholder-black focus:outline-none hover:shadow-[7px_5px_4px_0px_#dcdcdc]`}
            type="Text"
            required
            minLength={3}
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`rounded-[12px] w-full p-3 border-2 my-6 border-black placeholder-black focus:outline-none hover:shadow-[7px_5px_4px_0px_#dcdcdc]`}
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`rounded-[12px] w-full p-3 border-2 border-black placeholder-black focus:outline-none hover:shadow-[7px_5px_4px_0px_#dcdcdc]`}
            type="password"
            required
            minLength={5}
          />
          <button
            type="submit"
            className="text-white font-medium bg-blue-500 w-full py-3 rounded-[8px] mt-8"
          >
            Sign Up
          </button>
        </form>
        <p className="text-black text-xl uppercase font-semibold text-center my-2">
          or
        </p>
        <button
          onClick={handleLogin}
          className="text-white font-medium bg-blue-500 w-full py-3 rounded-[8px]"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Form;
