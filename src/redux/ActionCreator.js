import * as ActionTypes from './ActionTypes';

//a function to create action object
export const addComment = (dishId, rating, author,comment ) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

});