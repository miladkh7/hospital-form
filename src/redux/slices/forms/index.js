import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    id: 0,
    hospitalName: "",
    province: "",
    city: "",
    floorsUnder: "",
    floorsOn: "",
    createdDate: "",
    designedDate: "",
    serviceDate: "",
    latitude: "35.715298",
    longitude: "51.404343",
    bedsNumber: "",
    impactFactor: "",
    unitPrice: "",
    soilType: "",
    address: "",

    floorsNo: "",
    standardEdition: "",
    controlSystem: "",
    material: "",
    lateralLoadResistantX: "",
    lateralLoadResistantY: "",
    vertical: false,
    plan: false,
    components: [],
    floors:[],
    classification: {},
  },
  reducers: {
    form: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setComponentsList: (state, action) => {
      state.components.push(action.payload)
      // state.todos.components = action.payload;
    },
    removeComponent:(state , action)=>{
      // debugger
      state.components = state.components.filter((_, index) => index !== action.payload);
    },
    clearForm: (state) => {
      state.todos = {
        hospitalName: "",
        floorNumber: "",
        count: "",
        component: "",
        cost: "",
        isEmbraced: "",
        serviceYears: "",
        // ... (other fields)
        components: [],
      };
    },
    floorsNoSetter: (state, action) => {
      state.floorsNo = action.payload;
    },
  },
});

// this is for dispatch
export const { floorsNoSetter, form, setComponentsList, clearForm ,removeComponent} =
  todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;
