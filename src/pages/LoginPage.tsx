import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import ErrorState from "../components/ui/ErrorState";

type LoginResponse = {
  token: string;
  role: "customer" | "admin";
  message: string;
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { loading, error, run } = useRequest<LoginResponse>();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitLogin = () => {
    return run(
      async () => {
        const res = await axios.post<LoginResponse>(
          `${BASE_URL}/user/login`,
          form,
        );

        return res.data;
      },
      (data) => {
        console.log("LOGIN:", data);

        login(form.email, data.token, data.role ?? "customer");

        const role = data.role ?? "customer";

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 ml-1 underline"
          >
            Register
          </button>
        </div>

        {error && <ErrorState message={error} onRetry={submitLogin} />}
      </div>
    </div>
  );
};

export default LoginPage;
