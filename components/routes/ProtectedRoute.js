// components/ProtectedRoute.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const verifyCookie = Cookies.get("id");

  useEffect(() => {
    // Check if the user is authenticated (you can implement your own logic)
    const isAuthenticated = true; /* Your authentication logic here */

    if (
      !verifyCookie ||
      (typeof verifyCookie === "object" && verifyCookie.name !== "id")
    ) {
      router.push("/signin");
    }
    // if (!isAuthenticated) {
    //   // If not authenticated, redirect to the '/' page
    //   router.push('/');
    // }
  }, []);

  return children;
};

export default ProtectedRoute;
