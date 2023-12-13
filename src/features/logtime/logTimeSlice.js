import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  calculateDuration,
  formatDate,
  getFromlocalStorage,
  getTotalTimeLoggedForToday,
  saveInLocalStorage,
} from "./utils";

const initialState = {
  logs: getFromlocalStorage(),
  activeLog: null,
  openModal: false,
  startTime: null,
  stopTime: null,
  loggedToday: null,
};

export const formSlice = createSlice({
  name: "logTime",
  initialState,
  reducers: {
    logTime: (state, action) => {
      const { duration, start, description, date, end, Id } = action.payload;
      let loggedMinutes;
      if (duration !== "") {
        loggedMinutes = duration * 60;
      } else {
        loggedMinutes = calculateDuration(start, end);
      }

      if (Id === "") {
        state.logs.push({
          Id: uuid(),
          description: description,
          date: date,
          duration: loggedMinutes / 60,
        });
      } else {
        const index = state.logs.map((e) => e.Id).indexOf(Id);
        const exisitnglog = state.logs.filter((item) => item.Id === Id)[0];

        exisitnglog.description = description;
        exisitnglog.date = date;
        exisitnglog.duration = loggedMinutes / 60;

        state.logs[index] = { ...exisitnglog };
      }

      state.openModal = false;
      saveInLocalStorage(state.logs);
    },
    deleteLog: (state, action) => {
      const { Id } = action.payload;
      const index = state.logs.map((e) => e.Id).indexOf(Id);

      state.logs.splice(index, 1);
      saveInLocalStorage(state.logs);
    },
    openModal: (state, action) => {
      if (action.payload) {
        let log = state.logs.find((item) => item.Id === action.payload);
        log.startEnd = false;
        state.activeLog = log;
      }
      state.openModal = true;
    },
    closeModal: (state) => {
      state.openModal = false;
      state.activeLog = null;
    },
    startLogging: (state) => {
      state.startTime = Date.now();
    },
    stopLogging: (state) => {
      const date = new Date();
      //   const duration = Date.now() - state.startTime;
      const msDifference = Math.abs(Date.now() - state.startTime);
      const hoursDifference = msDifference / (1000 * 60 * 60);

      const description = "Tracked";
      state.logs.push({
        Id: uuid(),
        description: description,
        date: formatDate(date),
        duration: hoursDifference.toFixed(3),
      });

      state.startTime = null;
      saveInLocalStorage(state.logs);
    },
    daylogged: (state) => {
      const total = getTotalTimeLoggedForToday(state.logs);
      state.loggedToday = total;
    },
  },
});

export const {
  logTime,
  openModal,
  closeModal,
  deleteLog,
  startLogging,
  stopLogging,
  daylogged,
} = formSlice.actions;
export const today = (state) => state.timelogs.loggedToday;
export const selectlog = (state) => state.timelogs.logs;
export const selectStartTime = (state) => state.timelogs.startTime;
export const selectStopTime = (state) => state.timelogs.stopTime;
export const selectActivelog = (state) => state.timelogs.activeLog;
export const selectOpenModal = (state) => state.timelogs.openModal;

export default formSlice.reducer;
