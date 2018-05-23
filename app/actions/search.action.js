export const CHANGE_SEARCHED_TEXT = 'CHANGE_SEARCHED_TEXT';
export const CHANGE_SELECTED_FOOD = 'CHANGE_SELECTED_FOOD';

export const changeSearchedText = searchedText => ({
    type: CHANGE_SEARCHED_TEXT,
    searchedText,
});
 
export const changeSelectedFood = foodId => ({
    type: CHANGE_SELECTED_FOOD,
    foodId,
});