import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import GoogleSignIn from "../Shared/GoogleSignIn/GoogleSignIn";
import Swal from "sweetalert2";
import GetHostUrl from "../../Components/GetHostUrl/GetHostUrl";
import SaveUser from "../../Components/SaveUser/SaveUser";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    // Get image URL (assuming images are stored in 'images' folder)
    const imageUrl = await GetHostUrl(data.photo[0]);

    createUser(data.email, data.password)
      .then((result) => {
        const saveUser = SaveUser(data);
        axios.post("http://localhost:5000/api/users", saveUser).then((res) => {
          if (res.data.success === true) {
            Swal.fire({
              title: "SignUp Successful",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
        updateUserProfile(data.name, imageUrl).then(() => {
          navigate("/");
        });
        return result;
      })
      .catch((err) => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordMismatch = password !== confirmPassword;

  return (
    <div className="py-32 flex justify-center">
      <div className="form-container w-[90%] md:w-[30%] bg-primary rounded-lg p-8 text-white">
        <p className="text-center text-2xl font-bold">Sign Up</p>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-groups">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              id="name"
              placeholder=""
            />
            {errors.name && (
              <span className="text-accent">This field is required</span>
            )}
          </div>
          <div className="input-groups">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder=""
            />
            {errors.email && (
              <span className="text-accent">This field is required</span>
            )}
          </div>

          <div className="input-groups ">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                })}
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder=""
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span className="text-accent">This field is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-accent">Password must be 6 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase, and one special character.
              </p>
            )}
          </div>
          <div className="input-groups">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-accent">This field is required</span>
            )}
            {passwordMismatch && (
              <span className="text-accent">Passwords do not match</span>
            )}
          </div>
          <div className="input-groups">
            <label htmlFor="photo">Photo</label>
            <input
              {...register("photo", { required: true })}
              className="inpdddut"
              name="photo"
              id="photo"
              type="file"
            />
            {errors.photo && (
              <span className="text-accent">This field is required</span>
            )}
          </div>
          <div className="flex justify-center mt-5">
            <button className="login">Sign Up</button>
          </div>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <GoogleSignIn />
        <p className="signup">
          Already have an account?
          <Link
            rel="noopener noreferrer"
            to={"/login"}
            className="link link-hover link-accent"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
