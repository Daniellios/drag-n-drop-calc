import { createSlice } from "@reduxjs/toolkit";
import { CanvasStateType } from "../../types/enums";

export interface uiState {
  canvasState: CanvasStateType;
}

const initialState: uiState = {
  canvasState: CanvasStateType.CONSTRUCTOR,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCanvasAsConstructor: (state) => {
      state.canvasState = CanvasStateType.CONSTRUCTOR;
    },
    setCanvasAsRuntime: (state) => {
      state.canvasState = CanvasStateType.RUNTIME;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCanvasAsRuntime, setCanvasAsConstructor } = uiSlice.actions;

export default uiSlice.reducer;
