import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, BASE_URL } from "../utils/constants";
import axios from "axios";

const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false,
};

export const getGenres = createAsyncThunk("movies-app/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};
const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);

    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "movies-blog/trending",
  async ({ type }, thunkAPI) => {
    const {
      movies_blog: { genres },
    } = thunkAPI.getState();

    return getRawData(
      `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "movies-blog/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      movies_blog: { genres },
    } = thunkAPI.getState();

    return getRawData(
      `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);


// return getRawData(`${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`)

const MoviesSlice = createSlice({
  name: "movies-blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    movies_blog: MoviesSlice.reducer,
  },
});
export const { setGenres, setMovies } = MoviesSlice.actions;
