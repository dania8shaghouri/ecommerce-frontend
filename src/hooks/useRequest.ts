import { useState } from "react";
import axios from "axios";

interface ApiErrorResponse {
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
}

export const useRequest = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const run = async (
    fn: () => Promise<T>,
    onSuccess?: (data: T) => void,
  ): Promise<T | undefined> => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fn();

      setSuccess("Success");
      onSuccess?.(res);

      return res;
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        if (err.code === "ERR_NETWORK") {
          setError("Unable to connect to the server.");
        } else if (err.code === "ECONNABORTED") {
          setError("Request timed out.");
        } else if (err.response?.status === 403) {
          setError("You are not authorized to perform this action.");
        } else if (err.response?.status === 404) {
          setError("Requested resource not found.");
        } else if (err.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          const data = err.response?.data;

          if (data?.errors?.length) {
            setError(data.errors[0].message);
          } else {
            setError(data?.message ?? "Request failed");
          }
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    run,
  };
};
