import {configureStore} from '@reduxjs/toolkit'
import itemsReduser  from './slices/itemsSlice'
import valueReduser  from './slices/valueSlice'
import settingReducer from './slices/settingSlice'

export const store = configureStore({
    reducer: {
        items: itemsReduser,
        value: valueReduser,
        setting: settingReducer,
    },
  })