import React from "react";
import { fetchDataByGenre, getGenres } from "../store";
import { useDispatch } from "react-redux";
import './SelectGenre.css' 

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <div>
      <select
        className="flex"
        onChange={(e) => {
          dispatch(fetchDataByGenre({ genres, genre: e.target.value, type }));
        }}
        
      >
        {genres.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
