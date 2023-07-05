import { Country } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CountryState = {
    countries: Country[];
};

const initialState = {
    countries: [],
} as CountryState;

export const country = createSlice({
    name: "country",
    initialState,
    reducers: {
        reset: () => initialState,
        setCountries: (state, action: PayloadAction<Country[]>) => {
            state.countries = action.payload;
        },
    },
});

export const {
    reset,
    setCountries,
} = country.actions;

export default country.reducer;
