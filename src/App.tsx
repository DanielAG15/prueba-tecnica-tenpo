import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { RootState } from "./redux/store";
import Login from "./pages/login";
import Home from "./pages/Home";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/" />;
};

const App = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
