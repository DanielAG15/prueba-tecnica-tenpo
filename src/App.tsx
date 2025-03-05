import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Login from "./pages/login";
import Home from "./pages/Home";
import { JSX } from "react";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? element : <Navigate to="/" replace />;
};

const PublicRoute = ({ element }: { element: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? <Navigate to="/home" replace /> : element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Login />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;
