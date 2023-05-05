import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../Slices/taskSlice' // import slice and passed in reducer 

const store = configureStore(
    {
        reducer:{
              tasks: tasksReducer          
        }
    }
)

export default store;