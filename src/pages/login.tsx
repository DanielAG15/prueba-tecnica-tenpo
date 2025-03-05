import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import logo from "../assets/logo.png";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user && window.location.pathname === "/") {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(loginUser({ email, password })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/home");
      }
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: "100%", textAlign: "center" }}
      >
        <img
          src={logo}
          alt="Logo Anime Explorer"
          width="150"
          style={{ marginBottom: "10px" }}
        />
        <Typography variant="h4" fontWeight="bold" color="primary">
          ¡Bienvenido a Anime Explorer!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Descubre y explora miles de personajes de anime.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          {status === "loading" ? (
            <CircularProgress sx={{ mt: 2 }} />
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Iniciar Sesión
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
