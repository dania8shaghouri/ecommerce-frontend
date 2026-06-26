import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
// import { useAuth } from "../context/Auth/AuthContext";z
import { useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import ErrorState from "../components/ui/ErrorState";

type RegisterResponse = {
  token: string;
  message: string;
};

const RegisterPage = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();

  const { loading, error, run } = useRequest<RegisterResponse>();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitRegister = () => {
    return run(
      async () => {
        const res = await axios.post<RegisterResponse>(
          `${BASE_URL}/user/register`,
          form,
        );

        return res.data;
      },
      (data) => {
        console.log(data);
        // login(form.email, data.token, "customer");
        navigate("/login", {
          state: { message: "Registration successful, please login" },
        });
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 border rounded"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-3 border rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg"
          >
            {loading ? "Loading..." : "REGISTER"}
          </button>
        </form>

        {error && <ErrorState message={error} onRetry={submitRegister} />}
      </div>
    </div>
  );
};

export default RegisterPage;
