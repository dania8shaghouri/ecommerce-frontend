import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import ErrorState from "../components/ui/ErrorState";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../validation/loginSchema";

type LoginResponse = {
  token: string;
  role: "customer" | "admin";
  message: string;
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { loading, error, run } = useRequest<LoginResponse>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const submitLogin = (form: LoginFormData) => {
    return run(
      async () => {
        const res = await axios.post<LoginResponse>(
          `${BASE_URL}/user/login`,
          form,
        );

        return res.data;
      },
      (data) => {
        login(form.email, data.token, data.role ?? "customer");

        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit(submitLogin)} className="space-y-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border rounded"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

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

        {error && <ErrorState message={error} />}
      </div>
    </div>
  );
};

export default LoginPage;
