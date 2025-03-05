import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Button,
  Container,
} from "@mui/material";
import { toggleDarkMode } from "../redux/slices/themeSlice";
import Characters from "../components/Characters";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Anime Explorer
          </Typography>
          <Switch onChange={() => dispatch(toggleDarkMode())} />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Characters />
    </Container>
  );
};

export default Home;
