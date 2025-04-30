import { Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated");
  return isAuthenticated ? <div><Header/>{children}<Footer/></div> : <Navigate to="/" />;
};

export default ProtectedRoute;
