import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();

  // variabel validasi
  const [errors, setErrors] = useState({});

  const onSubmit = ({ email, password }) => {
    let newErrors = {};

    // cek email required
    if (!email.length)
      newErrors = {
        email: ["email harus diisi"],
      };

    // cek email valid
    if (!email.includes("@"))
      newErrors = {
        email: [...(newErrors?.email ?? []), "email tidak valid"],
      };

    // cek password required & panjang tulisan 8 huruf
    if (password.length < 8)
      newErrors = {
        ...newErrors,
        password: [
          ...(newErrors?.password ?? []),
          "minimal 8 karakter",
        ],
      };

    // tampilkan di console jika invalid
    console.log({
      status: Object.keys(newErrors).length ? 422 : 200,
      message: Object.keys(newErrors).length
        ? "terjadi kesalahan input!"
        : "Anda berhasil Login!",
      errors:newErrors,
      data:{email,password}
    });

    setErrors(newErrors);
  };

  // pop-up reset passsword
  const forgot = (e) => {
    e.preventDefault();
    alert("belum tersedia!");
  };
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login to your Account</h2>
        <div className="container">
          <div>
            <label htmlFor="email">
              <b>Email Address</b>
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="example@email.com"
            />
            {/* message */}
            {errors?.email && <span>{errors.email.join(", ")}</span>}
          </div>

          <div>
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter Password"
            />
            {/* message */}
            {errors?.password && <span>{errors.password.join(", ")}</span>}
          </div>

          <button type="submit">Login</button>
        </div>
      </form>
      <div className="container">
        <p>
          dont have any account? <Link to="/register">Register</Link>
        </p>
        <p>
          Forggoten your password?{" "}
          <a className="btn-links" onClick={forgot}>
            Password
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
