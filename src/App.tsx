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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute element={<Login />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
