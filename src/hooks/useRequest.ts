import { useState } from "react";

export const useRequest = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const run = async (
    fn: () => Promise<T>,
    onSuccess?: (data: T) => void
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
      if (err instanceof Error) {
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