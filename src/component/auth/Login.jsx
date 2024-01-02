import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Eye from "../../assets/images/eye.svg";
import EyeClose from "../../assets/images/eye_close.svg";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    let isCredentialRemember = Cookies.get("loginId") !== undefined;
    setIsRemember(isCredentialRemember);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: Cookies.get("loginId") || "",
      password: Cookies.get("loginPass") || "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Must be a Gmail address")
        .email("Invalid email address")
        .required("Please Enter Email"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Please Enter Password"),
    }),
    onSubmit: (values) => {
      let token =
        "ABCDEFGHIJKLMNOPYHGFDSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      localStorage.setItem("token", token);
      if (isRemember) {
        Cookies.set("loginId", values.email);
        Cookies.set("loginPass", values.password);
      } else {
        Cookies.remove("loginId");
        Cookies.remove("loginPass");
      }
      formik.resetForm();
      navigate("/movieList");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="page_outer">
      <div className="comp_wrapper">
        <div className="inner_container">
          <h2 className="auth_heading">Sign in</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <div>
              <div className="input_wrapper">
                <input
                  type={"email"}
                  name="email"
                  className="input_box"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="err_msg mb-0">{formik.errors.email}</p>
                )}
              </div>
              <div className="input_wrapper">
                <div className="position-relative">
                  <input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    className="input_box"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <div
                    className="toggle_pass_img"
                    onClick={() => toggleShowPassword()}
                  >
                    {isShowPassword ? (
                      <img src={Eye} />
                    ) : (
                      <img src={EyeClose} />
                    )}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="err_msg mb-0">{formik.errors.password}</p>
                )}
              </div>
            </div>
            <div className="remember_wrapper py-2">
              <input
                type={"checkbox"}
                name="rememberMe"
                className="checkbox"
                onChange={(e) => setIsRemember((prev) => !prev)}
                checked={isRemember}
              />
              <p className="lbl_remember mb-0">Remember me</p>
            </div>
            <button type="submit" className="btn_common btn_global">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
