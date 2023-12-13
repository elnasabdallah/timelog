import { configureStore } from "@reduxjs/toolkit";
import formSliceReducer from "src/features/logtime/logTimeSlice";

export default configureStore({
  reducer: {
    timelogs: formSliceReducer,
  },
});
