import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { createUser } from "../feature/userSlice";
import { useDispatch } from "react-redux";
import {toastInfo, toastSuccess, toastWarning, toastError} from "../components/common/Toastify"

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
};
const Register = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerForm = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length > 10) {
        return;
      }
    }
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const handlerSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", form);
      console.log(res.data);
      if(res) {
        localStorage.setItem("token", res.data.token)
      }
      dispatch(
        createUser({
          email: res.data.email,
          name: res.data.name,
          id: res.data.id,
        })
      );

      setForm(initialState);
      navigate("/");
      toastSuccess(res.data.message)
    } catch (error : any) {
      console.log(error);
      // toastError(error?.response?.data?.message)
    }
  };

  return (
    <>
      <div className="w-full bg-white h-screen">
        <div className="mx-auto">
          <div className="w-44 h-28 mx-auto">
            <img
              src="/assets/amazon-logo.png"
              alt=""
              className="h-full w-full object-contain"
            />
          </div>

          <div className="w-[400px] mx-auto border p-6">
            <h3 className="text-black text-lg">Create Account</h3>
            <form onSubmit={handlerSubmit}>
              <div className="formRow">
                <label htmlFor="">Your Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder=""
                  value={form.name}
                  onChange={handlerForm}
                  required
                  className="input"
                />
              </div>

              <div className="formRow">
                <label htmlFor="">Your Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="email"
                  value={form.email}
                  onChange={handlerForm}
                  required
                  className="input"
                />
              </div>

              <div className="formRow">
                <label htmlFor="">Mobile Number</label>
                <input
                  name="phone"
                  type="number"
                  placeholder=""
                  value={form.phone}
                  onChange={handlerForm}
                  required
                  className="input"
                />
              </div>

              <div className="formRow">
                <label htmlFor="">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handlerForm}
                  required
                  className="input"
                />
              </div>

              <button type="submit" className="button w-full mt-3">
                Create your Amazon account
              </button>
            </form>

            <p>
              Already have account?{" "}
              <Link to="/login" className="underline text-amazon_blue-blue">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
