// Register.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebse.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Password validation
  const validatePassword = (pwd) => {
    return /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return toast.error(
        "Password must have at least 1 uppercase, 1 lowercase and 6 characters"
      );
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name and photo
      await updateProfile(userCredential.user, { displayName: name, photoURL });

      toast.success("Registration Successful!");
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error(err);
      toast.error(err.message.includes("email-already-in-use") ? "Email already in use" : "Registration Failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google Login Successful!");
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-In Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Register for AI Model Inventory Manager
      </h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Photo URL (optional)"
          className="border p-2 rounded"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">
          Register
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="mt-4 w-full bg-red-500 text-white p-2 rounded"
      >
        Sign in with Google
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
