import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

export default function RegisterForm({ className, ...props }) {
  return (
    <>
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your form below to create to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="logo">Choose User Type</Label>
            <RadioGroup className="p-3 grid grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="school" id="school" />
                <Label htmlFor="school">Schools</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tutor" id="tutor" />
                <Label htmlFor="tutor">Tutors</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="logo">Logo</Label>
            <Input id="logo" type="file" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fname">Full Name</Label>
            <Input
              id="fname"
              type="text"
              placeholder="Enter Your Full Name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="username@example.com"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button type="submit" className="w-full">
              Verify
            </Button>
            <Input
              id="verify"
              type="number"
              placeholder="Enter Code..."
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="cpassword">Confirm Password</Label>
            </div>
            <Input id="cpassword" type="password" required />
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
    </>
  );
}
