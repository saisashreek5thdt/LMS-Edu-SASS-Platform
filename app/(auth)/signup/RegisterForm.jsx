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
  const { login } = useUser();

  const [userType, setUserType] = useState("");
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!userType) tempErrors.userType = "Please select user type.";
    if (!logo) tempErrors.logo = "Logo is required.";
    if (!name.trim()) tempErrors.name = "Full name is required.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Invalid email address.";
    if (!address.trim()) tempErrors.address = "Address is required.";
    if (!phone.match(/^\d{10,15}$/)) tempErrors.phone = "Phone must be a 10-15 digit number.";
    if (!isOtpSent) tempErrors.otp = "OTP must be verified before registration.";
    if (password.length < 6) tempErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!email || !userType) {
      toast.error("Please enter email and select user type first.");
      return;
    }




    try {
      const logoBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(logo);
      });

      const response = await fetch("/api/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logo: logoBase64, email, userType, name, password, address, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setIsOtpSent(true);
      } else {
        toast.error(data.error || "Failed to generate OTP");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error("An error occurred while generating OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setIsOtpVerified(true);
      } else {
        toast.error(data.error || "OTP verification failed");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      toast.error("An error occurred while verifying OTP");
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let logoBase64 = null;

      // Check if a logo file is provided
      if (logo) {
        logoBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result; // Full Data URL
            if (result && result.includes(",")) {
              resolve(result.split(",")[1]); // Extract Base64 part
            } else {
              reject(new Error("Invalid file format"));
            }
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(logo); // Read the file as a Data URL
        });
      }

      // Prepare the registration payload
      const response = await fetch(`/api/register/${userType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logo: logoBase64, // Send null if no logo is provided
          name,
          email,
          otp,
          password,
          address,
          phone,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);

        // Extract id and userType from the response
        const { id, userType: registeredUserType, logo: returnedLogo } = data;

        // Update user context with the logo
        login({ id, type: registeredUserType, email, logo: returnedLogo });

        // Redirect to the dashboard
        router.push(`/dashboard/${id}/${registeredUserType}`);
      } else {
        toast.error(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("An error occurred during registration.");
    }
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   try {
  //     const logoBase64 = await new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result.split(",")[1]);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(logo);
  //   });
  //     const response = await fetch(`/api/register/${userType}`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         logo: logoBase64,
  //         name,
  //         email,
  //         otp,
  //         password,
  //         address,
  //         phone,
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       {console.log(data)}
  //       const { id, userType: registeredUserType, logo: returnedLogo } = data;
  //       login({ id, type: registeredUserType, email, logo: returnedLogo });
  //       toast.success(data.message);
  //       router.push(`/dashboard/${id}/${registeredUserType}`);
  //     } else {
  //       toast.error(data.error || "Registration failed.");
  //     }
  //   } catch (error) {
  //     console.error("Registration Error:", error);
  //     toast.error("An error occurred during registration.");
  //   }
  // };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleRegister}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register to your account</h1>
        <p className="text-sm text-muted-foreground">Enter your info below to create your account</p>
      </div>

      <div className="grid gap-6">
        {/* User Type */}
        <div className="grid gap-2">
          <Label>Choose User Type</Label>
          <RadioGroup className="grid grid-cols-2" onValueChange={setUserType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="school" id="school" />
              <Label htmlFor="school">School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tutor" id="tutor" />
              <Label htmlFor="tutor">Tutor</Label>
            </div>
          </RadioGroup>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
        </div>

        {/* Logo Upload */}
        <div className="grid gap-2">
          <Label htmlFor="logo">Logo / Image</Label>
          <Input type="file" accept="image/*" onChange={handleLogoChange} />
          {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
        </div>

        {/* Name */}
        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>



        {/* Address */}
        <div className="grid gap-2">
          <Label>Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* Phone */}
        <div className="grid gap-2">
          <Label>Phone Number</Label>
          <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* OTP Verification */}
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" onClick={handleSendOtp}>Send OTP</Button>
          <Input type="number" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        </div>
        {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

        <div className="grid gap-2">
          {!isOtpVerified && (
            <Button
              className="cursor-pointer"
              type="button"
              onClick={handleVerifyOtp}
              disabled={!otp || otp.length !== 6}
            >
              Verify OTP
            </Button>
          )}
          {isOtpVerified && <p className="text-green-600 text-sm">OTP verified</p>}
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
        </div>


        {/* Password */}
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
          <Label>Confirm Password</Label>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <Button type="submit" className="w-full">Register</Button>

        <div className="mt-2 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}