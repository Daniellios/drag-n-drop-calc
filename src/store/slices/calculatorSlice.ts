import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CalculatorState {
  display: string;
  currentNumber: any;
  previousNumber: any;
  operator: string | null;
}

const initialState: CalculatorState = {
  display: "0",
  currentNumber: null,
  previousNumber: null,
  operator: null,
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    clear: (state) => {
      (state.display = "0"),
        (state.currentNumber = null),
        (state.previousNumber = null),
        (state.operator = null);
    },
    operation: (state, action: PayloadAction<string>) => {
      if (state.currentNumber !== null && state.previousNumber === null) {
        state.previousNumber = state.currentNumber;
        state.display = state.previousNumber;
        state.currentNumber = null;
      } else if (state.previousNumber != null) {
        switch (action.payload) {
          case "+":
            state.display = state.previousNumber + state.currentNumber;
            state.currentNumber = state.previousNumber;
            state.display = `${parseFloat(state.display)}`;
            break;
          case "-":
            state.display = `${state.previousNumber - state.currentNumber}`;
            state.currentNumber = state.previousNumber;
            state.display = `${parseFloat(state.display)}`;
            break;
          case "*":
            state.display = `${state.previousNumber * state.currentNumber}`;
            state.currentNumber = state.previousNumber;
            state.display = `${parseFloat(state.display)}`;
            break;
          case "/":
            state.display = `${state.previousNumber / state.currentNumber}`;
            state.currentNumber = state.previousNumber;
            state.display = `${parseFloat(state.display)}`;
            break;
          default:
            state.display = `${state.currentNumber}`;
        }
        state.currentNumber = state.previousNumber;
        state.display = `${parseFloat(state.display)}`;
      } else {
        state.previousNumber = 0;
      }
      state.operator = action.payload;
    },
    enterNumber: (state, action: PayloadAction<string>) => {
      if (
        state.display !== "0" &&
        state.display !== "Не определeно" &&
        state.display !== state.previousNumber
      ) {
        state.display = state.display + action.payload;
      } else {
        state.display = action.payload;
      }
      state.currentNumber = parseFloat(state.display);
    },
    enterDecimal: (state) => {
      if (state.currentNumber % 1 === 0) {
        state.display = state.display + ".";
        state.currentNumber = state.display;
      } else {
        state.currentNumber = state.display;
      }
    },
    calculate: (state) => {
      if (state.operator != null && state.previousNumber != null) {
        switch (state.operator) {
          case "+":
            state.display = state.previousNumber + state.currentNumber;
            state.currentNumber = parseFloat(state.display);
            state.previousNumber = null;
            break;
          case "-":
            state.display = `${state.previousNumber - state.currentNumber}`;
            state.currentNumber = parseFloat(state.display);
            state.previousNumber = null;
            break;
          case "*":
            state.display = `${state.previousNumber * state.currentNumber}`;
            state.currentNumber = parseFloat(state.display);
            state.previousNumber = null;
            break;
          case "/":
            const res = state.previousNumber / state.currentNumber;
            if (res === Infinity) {
              state.display = "Не определeно";
              state.currentNumber = parseFloat(state.display);
              state.previousNumber = null;
            } else {
              state.display = `${res}`;
              state.currentNumber = parseFloat(state.display);
              state.previousNumber = null;
            }
            break;
          default:
            state.display = `${state.currentNumber}`;
        }
      } else if (state.currentNumber != null && state.previousNumber == null) {
        state.display = `${state.currentNumber}`;
      } else {
        state.display = "0";
      }
      state.operator = null;
    },
  },
});

export const { enterDecimal, enterNumber, calculate, clear, operation } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
