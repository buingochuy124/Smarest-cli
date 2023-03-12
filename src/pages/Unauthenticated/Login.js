/* eslint-disable jsx-a11y/anchor-is-valid */

import { GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/auth/authContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, loginUser, loginUserWithGoogle } = authContext;
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [credentialResponse, setCredentialResponse] = useState({
    credential: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    onLoginGoogle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLoginGoogle = () => {
    loginUserWithGoogle(credentialResponse);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(login);

    if (isLoggedIn) {
      setLogin({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="h-auto">
      <div className="py-36">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage: `url(https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952__340.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Smarest
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <br />
            {/* <div className="h-20">
              <iframe
                title="Sign in with Google Button"
                style={{
                  display: "block",
                  position: "relative",
                  top: "0px",
                  left: "0px",
                  height: "44px",
                  width: "202px",
                  border: "0px",
                  margin: "-2px -10px",
                }}
                src="https://accounts.google.com/gsi/button?type=standard&theme=outline&size=large&text=undefined&shape=undefined&logo_alignment=undefined&width=undefined&locale=undefined&click_listener=undefined&client_id=304531247476-58f940f3b0dgrupg95cdo8b51fspupdv.apps.googleusercontent.com&iframe_id=gsi_570883_390319&as=4bNWz5fCV6rGBgPp1KZx2Q"
              ></iframe>
            </div> */}
            <div>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const googleToken = JSON.stringify(
                    credentialResponse.credential
                  );
                  setCredentialResponse({
                    ...credentialResponse,
                    credential: googleToken,
                  });
                  onLoginGoogle();
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              ;
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                or login with email
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                name="email"
                value={login.username}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500">
                  Forget Password?
                </a>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                value={login.password}
                onChange={onChange}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={onSubmit}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <a href="/register" className="text-xs text-gray-500 uppercase">
                or sign up
              </a>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
