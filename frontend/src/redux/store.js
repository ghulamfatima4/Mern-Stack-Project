// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice"

// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'Ekart',
//   version: 1,
//   storage,
// }
// const rootReducer = combineReducers({
//     user : userSlice
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);


// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })

// // export const persistor = persistStore(store)
// export default store;



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

import {
  persistReducer,
  persistStore,   // ✅ isko add karo
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "Ekart",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);  // ✅ isay uncomment karo
export default store;
