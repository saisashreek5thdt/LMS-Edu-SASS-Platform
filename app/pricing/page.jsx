// app/pricing/page.jsx'
"use client";

import { useUser } from "@/app/_Context/UserContext.js";
import PricingSection1 from "../_Components/(Home)/PricingSection1";

export default function PricingPage() {
  const { isLoggedIn,userType,userId} = useUser();// Assuming this context provides logged-in user details

  return (
    <div>
      <PricingSection1
        userType={userType}   
        userId={userId}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}