import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: "",
  surName: "",
  phone: "",
  password: "",
  address: "",
  neighborhood: "",
  city: "",
  description: "",
  rates: "",
  photoProfile: [],
  photos: [],
  completedProfile: false,
};

export const fetchSitter = createAsyncThunk(
  "sitter/fetchSitter",
  async (id) => {
    try {
      const { data } = await axios.get(
        `/sitters/${id}`
        //`http://localhost:3000/sitters/${id}`
      );
      return data;
    } catch (error) {
      console.error("Error al obtener la información del cuidador:", error);
      throw error;
    }
  }
);

export const sitterSlice = createSlice({
  name: "sitter",
  initialState,
  reducers: {
    sitterInfo: (state, action) => {
      console.log(action.payload);
      const {
        name,
        surName,
        email,
        phone,
        password,
        dateOfBirth,
        rates,
        city,
        neighborhood,
        address,
        description,
        photoProfile,
        photos,
      } = action.payload;

      state.name = name;
      state.surName = surName;
      state.phone = phone;
      state.address = address;
      state.dateOfBirth = dateOfBirth;
      state.neighborhood = neighborhood;
      state.city = city;
      state.description = description;
      state.rates = rates;
      state.email = email;
      state.password = password;
      state.photoProfile = photoProfile;
      state.photos = photos;
    },
    updateSitter: async (state, action) => {
      try {
        const { data } = await axios.put(
          `/sitters/${action.payload.id}`,
          //`http://localhost:3000/sitters/${action.payload.id}`,
          action.payload.updatedSitter
        );
        state.completedProfile = true;
        return data;
      } catch (error) {
        console.error("Error al actualizar el cuidador:", error);
        throw error;
      }
    },
  },
});

export const { sitterInfo, updateSitter } = sitterSlice.actions;
export default sitterSlice.reducer;
