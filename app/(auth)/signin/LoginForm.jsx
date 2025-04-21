"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_Context/UserContext";
import { toast } from "sonner";

export default function LoginForm({ className, ...props }) {
  const router = useRouter();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      email.trim() !== "" && password.trim() !== "" && validateInputsSilently();
    setIsFormValid(isValid);
  }, [email, password]);

  const validateInputsSilently = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send a POST request to the backend API
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Login successful
          const { token, id, userType } = data;

          // Decode the JWT token to extract the `id` and `userType`
        //  const decodedToken = jwt.decode(token);
        //  const userId = decodedToken.id; // Extract `id` from the token
        //  const userRole = decodedToken.userType;
          // Save the token securely (e.g., in localStorage)
          localStorage.setItem("authToken", token);

          // Update user context
          login(email, password);

          // Show success message
          toast.success(`${userType} Is Authenticated`);

          // Redirect to the dashboard
          router.push(`/dashboard/${id}/${userType}`);
        } else {
          // Login failed
          toast.error(data.error || "Invalid credentials");
        }
      } catch (err) {
        // Handle network or unexpected errors
        toast.error("An Unexpected Error Occurred. Please Try Again!");
      }
    } else {
      toast.error("Please Re-Check Your Credentials");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className={cn("flex flex-col gap-6 animate-fade-in", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center transition-all duration-500">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 transition-all duration-300">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="username@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "transition-all duration-300",
              errors.email ? "border-red-500" : ""
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm animate-fade-in">
              {errors.email}
            </p>
          )}
        </div>
        <div className="grid gap-2 transition-all duration-300">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "transition-all duration-300",
              errors.password ? "border-red-500" : ""
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm animate-fade-in">
              {errors.password}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full transition-all duration-300"
          disabled={!isFormValid}
        >
          Login
        </Button>
      </div>

      <div className="text-center text-sm transition-all duration-300">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>

      <div className="text-center text-sm transition-all duration-300">
        Don&apos;t know your account?{" "}
        <Link href="/" className="underline underline-offset-4">
          Forgot Id / Password
        </Link>
      </div>
    </form>
  );
}