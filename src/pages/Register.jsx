import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebse.config";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Particles from "react-tsparticles";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      return Swal.fire({
        title: "Oops!",
        text: "Password must have at least 1 uppercase, 1 lowercase and 6 characters",
        icon: "error",
        confirmButtonColor: "#9ECFD4",
      });
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      Swal.fire({
        title: "Good job!",
        text: "Registration Successful!",
        icon: "success",
        confirmButtonColor: "#70B2B2",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Oops!",
        text: err.message.includes("email-already-in-use") ? "Email already in use" : "Registration Failed",
        icon: "error",
        confirmButtonColor: "#9ECFD4",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        title: "Good job!",
        text: "Google Login Successful!",
        icon: "success",
        confirmButtonColor: "#70B2B2",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Oops!",
        text: "Google Sign-In Failed",
        icon: "error",
        confirmButtonColor: "#9ECFD4",
      });
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10"
      style={{ backgroundColor: "#9ECFD4" }}
    >
      {/* Particles Background */}
      <Particles
        options={{
          background: { color: { value: "#9ECFD4" } },
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "repulse" }, resize: true } },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.3, width: 1 },
            collisions: { enable: true },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 1 },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Register Card */}
      <div className="bg-white rounded-2xl  shadow-lg w-full max-w-md p-6 sm:p-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Name Input */}
          <div className="flex items-center border rounded p-3 focus-within:ring-2 focus-within:ring-[#016B61]">
            <AiOutlineUser className="text-gray-400 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Name"
              className="w-full outline-none bg-transparent text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center border rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineMail className="text-gray-400 mr-2 text-xl" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Photo URL Input */}
          <div className="flex items-center border rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineUser className="text-gray-400 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Photo URL (optional)"
              className="w-full outline-none bg-transparent text-gray-800"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border rounded p-3 focus-within:ring-2 focus-within:ring-[#70B2B2]">
            <AiOutlineLock className="text-gray-400 mr-2 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none bg-transparent text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="ml-2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            className="p-3 rounded font-semibold flex justify-center items-center gap-2 hover:opacity-90 transition bg-[#016B61] text-white"
          >
            Sign Up
          </button>
        </form>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full border text-[#016B61] font-medium rounded p-3 hover:bg-gray-100 transition flex justify-center items-center gap-2 border-[#9ECFD4]"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>

        <p className="mt-4 text-center text-[#016B61]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
