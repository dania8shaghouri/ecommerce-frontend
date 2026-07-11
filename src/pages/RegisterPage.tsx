import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import ErrorState from "../components/ui/ErrorState";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../validation/registerSchema";

type RegisterResponse = {
  token: string;
  message: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const { loading, error, run } = useRequest<RegisterResponse>();

  const submitRegister = (form: RegisterFormData) => {
    return run(
      async () => {
        const res = await axios.post<RegisterResponse>(
          `${BASE_URL}/user/register`,
          form,
        );

        return res.data;
      },
      () => {
        navigate("/login", {
          state: {
            message: "Registration successful, please login",
          },
        });
      },
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit(submitRegister)} className="space-y-4">
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="w-full p-3 border rounded"
          />

          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}

          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full p-3 border rounded"
          />

          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}

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
            className="w-full bg-primary text-white py-3 rounded-lg"
          >
            {loading ? "Loading..." : "REGISTER"}
          </button>
        </form>

        {error && <ErrorState message={error} />}
      </div>
    </div>
  );
};

export default RegisterPage;
