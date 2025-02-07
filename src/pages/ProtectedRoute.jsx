import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const Navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated) Navigate("/");
    },
    [isAuthenticated, Navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
