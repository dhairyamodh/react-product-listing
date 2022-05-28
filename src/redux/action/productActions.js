import { productTypes } from "../types";

export const getAllProducts = () => {
  return {
    type: productTypes.GET_ALL_PRODUCTS,
  };
};

export const addProduct = (data) => {

  return {
    type: productTypes.CREATE_PRODUCT,
    payload: {
      data: data,
    },
  };
};

export const updateProduct = (data,) => {
  return {
    type: productTypes.UPDATE_PRODUCT,
    payload: {
      data: data,
    },
  };
};

export const deleteProduct = (data,) => {
  return {
    type: productTypes.DELETE_PRODUCT,
    payload: {
      data: data,
    },
  };
};

export const deleteMulProduct = (data,) => {
  return {
    type: productTypes.DELETE_MUL_PRODUCT,
    payload: {
      data: data,
    },
  };
};
