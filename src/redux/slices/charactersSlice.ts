import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Character {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  about: any;
  favorites: number;
  name_kanji: string;
  mal_id: number;
  name: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

interface CharactersState {
  characters: Character[];
  filteredCharacters: Character[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  filteredCharacters: [],
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
  status: "idle",
  error: null,
};

// 🔹 Thunk para obtener los personajes por página
export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=20`
      );
      return {
        characters: response.data.data,
        totalPages: response.data.pagination.last_visible_page,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue("Error al obtener los personajes");
    }
  }
);

// 🔹 Thunk para buscar un personaje por nombre
export const fetchCharacterByName = createAsyncThunk(
  "characters/fetchCharacterByName",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/characters?q=${query}&limit=20`
      );
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue("Error al buscar el personaje");
    }
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (action.payload === "") {
        state.filteredCharacters = state.characters;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload.characters;
        state.filteredCharacters = action.payload.characters;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchCharacterByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacterByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredCharacters = action.payload;
      })
      .addCase(fetchCharacterByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setSearchQuery } = charactersSlice.actions;
export default charactersSlice.reducer;
