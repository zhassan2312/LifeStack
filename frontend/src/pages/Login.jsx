import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import Button from "../components/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-24 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-32">
            <div className="flex flex-col items-center gap-8 group">
              <div className="w-40 h-40 rounded-40 bg-(--color-primary-10) flex items-center justify-center group-hover:bg-(--color-primary-20) transition-colors">
                <MessageSquare className="w-6 h-6 text-(--color-font-color)" />
              </div>
              <h1 className="text-32 font-bold mt-8">Create Account</h1>
              <p className="text-(--color-black-60)">Sign up to get started</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-24">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-12 flex items-center pointer-events-none">
                  <Mail className="h-18 w-18 text-(--color-black-40)" />
                </div>
                <input
                  type="email"
                  className="p-12 pl-40 gap-12 placeholder:text-(--color-black-40) border-1 border-(--color-black-10) focus:border-(--color-black-20) rounded-12 flex w-full"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-12 flex items-center pointer-events-none">
                  <Lock className="h-18 w-18 text-(--color-black-40)" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="p-12 pl-40 gap-12 placeholder:text-(--color-black-40) border-1 border-(--color-black-10) focus:border-(--color-black-20) rounded-12 flex w-full"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-18 w-18 text-(--color-black-40) mr-12" />
                  ) : (
                    <Eye className="h-18 w-18 text-(--color-black-40) mr-12" />
                  )}
                </button>
              </div>
            </div>

            <Button
              text={isLoggingIn ? <Loader2 className="animate-spin" /> : "Login"}
              icon={isLoggingIn ? null : <MessageSquare className="w-6 h-6" />}
              className="w-full bg-(--color-primary) text-(--color-white-100) hover:bg-(--color-primary-80) focus:bg-(--color-primary-30) rounded-12 p-12"
              disabled={isLoggingIn}
            />
          </form>

          <div className="text-center">
            <p className="text-(--color-black-60) text-14">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-(--color-primary) font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your Journey."}
      />
    </div>
  );
};

export default Login;