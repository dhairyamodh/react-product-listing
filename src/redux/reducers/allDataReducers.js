import { productTypes } from "../types";

const initialstate = {
  categories: [{
    cateId: 1,
    categoryName: "cate 1"
  }],
  products: []
};

const allDataReducer = (state = initialstate, action) => {

  switch (action.type) {
    case productTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: initialstate.products,
      };

    case productTypes.CREATE_PRODUCT:
      console.log('action', action.payload.data);
      return {
        ...state,
        products: [...state.products, action.payload.data],
      };

    case productTypes.UPDATE_PRODUCT:
      const objIndex = state.products.findIndex((obj => obj.id == action.payload.data.id));
      state.products[objIndex] = action.payload.data
      return {
        ...state,
        products: state.products,
      };

    case productTypes.DELETE_PRODUCT:
      const filter = state.products.filter((obj) => obj.id !== action.payload.data.id);
      state.products = filter
      return {
        ...state,
        products: state.products,
      };

    case productTypes.DELETE_MUL_PRODUCT:
      state.products = state.products.filter(each => {
        return !action.payload.data.includes(each.id)
      });
      return {
        ...state,
        products: state.products
      };


    default:
      return state;
  }
};

export default allDataReducer;
