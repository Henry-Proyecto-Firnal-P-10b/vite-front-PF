import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
      reducers: {
        ordersAction: (state, action) =>{
          state.orders = action.payload          
      }
      }
    });

    export const {ordersAction} = orderSlice.actions
    export default orderSlice.reducer;