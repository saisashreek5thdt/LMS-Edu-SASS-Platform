"use client";
import Link from "next/link";
import React from "react";
import { Blocks } from "lucide-react";
import RegisterForm from "./RegisterForm";

export default function SignUp() {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Blocks className="size-4" />
              </div>
              LMS Edu Platform
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <RegisterForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block"></div>
      </div>
    </>
  )
}
