// features/idSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface IdState {
  id: number;
}

const initialState: IdState = {
  id: 0, // Default value
};

const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    // Action to update the `id`
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

// Export the action and reducer
export const { setId } = idSlice.actions;
export default idSlice.reducer;
