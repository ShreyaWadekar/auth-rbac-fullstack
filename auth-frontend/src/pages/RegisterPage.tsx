import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import { RegisterForm } from "../types";
import { saveAuth } from "../utils/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: { role: "USER" }
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      saveAuth(data.token, data.role, data.name);
      navigate("/dashboard");
    },
  });

  const onSubmit = (data: RegisterForm) => mutation.mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/, message: "Invalid email" }
              })}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register("role")}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {mutation.isError && (
            <p className="text-red-500 text-sm">Registration failed. Email may already exist.</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;