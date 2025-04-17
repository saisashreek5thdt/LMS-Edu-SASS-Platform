"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_Context/UserContext";
import { toast } from "sonner";

export default function RegisterForm({ className, ...props }) {
  const router = useRouter();
  const { setProfileImage } = useUser();
  
  const [userType, setUserType] = useState("");
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    
    if (!userType) tempErrors.userType = "Please select user type.";
    if (!logo) tempErrors.logo = "Logo is required.";
    if (!name.trim()) tempErrors.name = "Full name is required.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Invalid email address.";
    if (!generatedOtp || !otpVerified) tempErrors.otp = "OTP must be verified before registration.";
    if (password.length < 6) tempErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleVerifyOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    alert(`Your OTP is: ${newOtp}`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Registration Sucessfull")
      router.push("/signin");
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    setOtpVerified(value === generatedOtp);
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleRegister}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your form below to create your account
        </p>
      </div>

      <div className="grid gap-6">
        {/* User Type Selection */}
        <div className="grid gap-2">
          <Label htmlFor="userType">Choose User Type</Label>
          <RadioGroup className="p-3 grid grid-cols-2" onValueChange={setUserType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="school" id="school" />
              <Label htmlFor="school">Schools</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tutor" id="tutor" />
              <Label htmlFor="tutor">Tutors</Label>
            </div>
          </RadioGroup>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
        </div>

        {/* Logo Upload */}
        <div className="grid gap-2">
          <Label htmlFor="logo">Logo</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
          {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
        </div>

        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="fname">Full Name</Label>
          <Input
            id="fname"
            type="text"
            placeholder="Enter Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="username@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* OTP Verification */}
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" className="w-full" onClick={handleVerifyOtp}>
            Verify
          </Button>
          <Input
            id="verify"
            type="number"
            placeholder="Enter Code..."
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value)}
          />
        </div>
        {otp && !otpVerified && (
          <p className="text-red-500 text-sm">OTP incorrect.</p>
        )}
        {otpVerified && <p className="text-green-600 text-sm">OTP Verified ✅</p>}
        {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

        {/* Password Fields */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cpassword">Confirm Password</Label>
          <Input
            id="cpassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>

      <div className="text-center text-sm">
        Have an account?{" "}
        <Link href="/signin" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
      <div className="text-center text-sm">
        Don&apos;t know your account?{" "}
        <Link href="/" className="underline underline-offset-4">
          Forgot Id / Password
        </Link>
      </div>
    </form>
  );
}
