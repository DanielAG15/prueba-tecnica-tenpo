import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  setPage,
  setSearchQuery,
  fetchCharacterByName,
} from "../redux/slices/charactersSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

const Characters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    filteredCharacters,
    currentPage,
    totalPages,
    searchQuery,
    status,
    error,
  } = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    if (query.length > 2) {
      dispatch(fetchCharacterByName(query));
    } else {
      dispatch(fetchCharacters(currentPage)); // Si la búsqueda es vacía, volver a la lista original
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Personajes de Anime
      </Typography>

      <TextField
        fullWidth
        label="Buscar personaje..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {status === "loading" && <CircularProgress />}
      {status === "failed" && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {filteredCharacters.map((character) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={character.mal_id}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={character.images.jpg.image_url}
                alt={character.name}
              />
              <CardContent>
                <Typography variant="h6">{character.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Nombre Japonés: {character.name_kanji || "Desconocido"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Favoritos: {character.favorites || 0}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {character.about
                    ? character.about.length > 150
                      ? character.about.substring(0, 150) + "..."
                      : character.about
                    : "Sin descripción"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botones de paginación */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => dispatch(setPage(currentPage - 1))}
          sx={{ mx: 1 }}
        >
          Anterior
        </Button>
        <Typography variant="body1" sx={{ mx: 2 }}>
          Página {currentPage} de {totalPages}
        </Typography>
        <Button
          variant="contained"
          disabled={currentPage === totalPages}
          onClick={() => dispatch(setPage(currentPage + 1))}
          sx={{ mx: 1 }}
        >
          Siguiente
        </Button>
      </div>
    </Container>
  );
};

export default Characters;
