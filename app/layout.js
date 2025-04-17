import Footer from "./_Components/Footer";
import Header from "./_Components/Header";
import "./globals.css";
import { UserProvider } from "./_Context/UserContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "LMS Edu Platform",
  description:
    "Learning Management System (LMS), Education Platform for Schools, Teachers, Tutors and Students. Any user can learn from the platform with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <UserProvider>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </UserProvider>
    </html>
  );
}
