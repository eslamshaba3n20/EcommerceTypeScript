import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import categories from "./categories/categoriesSlice";
import Products from "./products/productsSlice";
import cart from "./cart/CartSlice";
import wishList from "./wishList/wishListSlice";


// عشان احفظ في لوكال استورتج بس هنا هكيش الكارت بس
const cartPersistConfig = {
  key: 'cart',
  storage,
  whilelist: ['items'], // only cart will be persisted
}
const wishListConfig = {
  key: 'wishList',
  storage,
  whilelist: ['iemsId'], // only cart will be persisted
}

const rootReducer = combineReducers({
  categories,
  Products,
  cart: persistReducer(cartPersistConfig, cart), // persist the cart slice
  wishList: persistReducer(wishListConfig, wishList), // persist the wishList slice
})

// هعملها لو عامل رووت 
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: rootReducer,

  // دا عشان الريداكس مش متوافقه مع بريستيت فتعمل اسكيب وميطلع ايرور بس
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store)
export { store, persistor };


// عشان احفظ في لوكال استورتج حطهل في سطر رقم  16
// بس هعمل الروت لو انا هكيش كذا حاجه زي مثلا كارت و بروداكت الخ
// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   whilelist: ['cart'], // only cart will be persisted
// }