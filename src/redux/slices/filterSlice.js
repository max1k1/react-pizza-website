import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortOptionList: [
    { name: 'Rating: From hight to low', option: 'rating' },
    { name: 'Rating: From low to hight', option: '-rating' },
    { name: 'Price: From hight to low', option: 'price' },
    { name: 'Price: From low to hight', option: '-price' },
    { name: 'Alphabetically: From hight to low', option: 'tittle' },
    { name: 'Alphabetically: From low to hight', option: '-tittle' },
  ],
  sortOption: 0,
  categories: ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'],
  activeCategory: 0,
  currentPage: 1,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload.optionId;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action) => {
      state.activeCategory = Number(action.payload.activeCategory);
      state.currentPage = Number(action.payload.currentPage);
      state.sortOption = action.payload.sortOption;
    },
  },
});

export const { setSortOption, setActiveCategory, setCurrentPage, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
