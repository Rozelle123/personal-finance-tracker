import React from "react";

export const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return state.map((category) =>
        category.catId === action.payload.catId
          ? {
              ...category,
              details: [
                ...(category.details || []),
                action.payload.transaction,
              ],
            }
          : category
      );

    case "EDIT_TRANSACTION":
      const updatedTransaction = action.payload;

      return state.map((category) =>
        category.catId === updatedTransaction.catId
          ? {
              ...category,
              details: category.details.map((detail) =>
                detail.detId === updatedTransaction.detId
                  ? { ...detail, ...updatedTransaction.transaction }
                  : detail
              ),
            }
          : category
      );

     case "DELETE_TRANSACTION":
     
       return state.map((category) =>
        
         category.catId === action.payload.catId
           ? {
               ...category,
               details: category.details.filter((detail) =>
                 detail.detId !== action.payload.detId                 
               ),
               
             }
           : category
       );

   
  }
};
