import { createSelector } from "reselect"; 

const selectCategoriesReducer = (state)=> state.categories;
// console.log('selectCategoriesReducer',selectCategoriesReducer);

export const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice)=> categoriesSlice.categories
);
// selectCategoriesReducer('selectCategories',selectCategories);

export const selectCategoriesMap = createSelector(
    [selectCategories],(categories)=>categories
    .reduce((acc,category)=>{
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    },{}));

export const selectIsCategoriesLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice)=>categoriesSlice.isLoading
)