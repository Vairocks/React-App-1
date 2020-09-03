import { authHeader } from '../helpers/header_mgm';
import * as ActionTypes from './ActionTypes';
import {baseUrl } from '../shared/baseUrl';
//a function to create action object
import {userService} from '../services/authservices'


export const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(username));
                   // alert(user);
                    //console.log(user);
                   // history.push('/');
                   
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: ActionTypes.LOGIN_REQUEST, payload: user } }
    function success(username) { return { type: ActionTypes.LOGIN_SUCCESS, payload: username } }
    function failure(error) { return { type: ActionTypes.LOGIN_FAILURE, payload: error } }
}

export const logout = () =>
 {  alert("Logout from action creator");
    userService.logout();
    return { type: ActionTypes.LOGOUT };
}

export function register(user) {
    alert(JSON.stringify(user));
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());    
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: ActionTypes.REGISTER_REQUEST,  payload: user } }
    function success(user) { return { type: ActionTypes.REGISTER_SUCCESS,  payload: user } }
    function failure(error) { return { type: ActionTypes.REGISTER_FAILURE,  payload: error } }
}

export const postComment = (dishId, rating,comment ) => (dispatch) =>{

    const newComment = {      
        rating:rating,
        comment:comment
    }
    newComment.date = new Date().toISOString();

    return fetch(`${baseUrl}dishes/${dishId}/comments`,{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(newComment),
        headers: { ...authHeader(), 'Content-Type': 'application/json' },        
    })
    .then(response => {
        if (response.ok) {
           return response;
    }
    else {
        var error = new Error('Error' + response.status+' : '+response.statusText);
        error.response = response;
        throw error;
        }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchDishes()))
    .catch(error => { console.log('Post commments', error.message);
        alert('Your comment could not be posted \nError: '+error.message);})
    }

    export const deleteComment = (dishId, commentId ) => (dispatch) =>{
    
        return fetch(`${baseUrl}dishes/${dishId}/comments/${commentId}`,{
            method: 'DELETE',
            mode: 'cors',   
            headers: authHeader()        
        })
        .then(response => {
            if (response.ok) {
               return response;
        }
        else {
            var error = new Error('Error' + response.status+' : '+response.statusText);
            error.response = response;
            throw error;
            }
        },
        error =>{
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => {alert(`Deleted comment: ${response.json()}`);dispatch(fetchDishes());})
        .catch(error => {alert('Your comment could not be deleted \nError: '+error.message);})}

export const fetchComments = () => (dispatch) => {
    
    const requestOptions = {
        method: 'GET',
    
   // method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
   // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 //   credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
};

    return fetch(baseUrl + 'comments',requestOptions)
    .then(response => {
        if (response.ok) {
            return response;
    }
    else {
        var error = new Error('Error' + response.status+' : '+response.statusText);
        error.response = response;
        throw error;
            }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
    })  
    .then(response => response.json())
    .then(comments=> dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
    }
   

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
    });

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
    });

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments   
    });



export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message) => (dispatch) =>{

    const newFeedback = {
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message,
    }
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'userFeedback',{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
    //    credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
           return response;
    }
    else {
        var error = new Error('Error' + response.status+' : '+response.statusText);
        error.response = response;
        throw error;
        }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => { alert('Thanks for your Response: your feedback id is:- '+response.id);
        return dispatch(addFeedback(response));})
    .catch(error => { console.log('Post commments', error.message);
        alert('Your feedback could not be posted\n  Please try again later \nError: '+error.message);})
    }

    export const addFeedback = (feedback) => ({
        type: ActionTypes.ADD_FEEDBACK,
        payload: feedback   
        });






export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    const requestOptions = {
    method: 'GET',// method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
 //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //  credentials: 'same-origin', // include, *same-origin, omit
    headers: {'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
    },
};

    return fetch(baseUrl + 'dishes',requestOptions)
        .then(response => {
            if (response.ok) {
               return response;
        }
        else {
            var error = new Error('Error' + response.status+' : '+response.statusText);
            error.response = response; 
            throw error;
        }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
        })  
        .then(response => response.json())
        .then(dishes=> dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
    }

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
    });

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
    });

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes   
    });


    



export const fetchPromos = () => (dispatch) => {
  
  
    dispatch(promosLoading(true));
  
    
    const requestOptions = {
        method: 'GET',
    
   // method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
 //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 //   credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
};

    return fetch(baseUrl + 'promotions',requestOptions)
    .then(response => {
        if (response.ok) {
           return response;
    }
    else {
        var error = new Error('Error' + response.status+' : '+response.statusText);
        error.response = response;
        throw error;
        }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(promos=> dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
    }

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
    });

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
    });

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos   
    });


export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    
    const requestOptions = {
        method: 'GET',
    
   // method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
 //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 //   credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
};

    return fetch(baseUrl + 'leaders',requestOptions)
        .then(response => {
            if (response.ok) {
               return response;
        }
        else {
            var error = new Error('Error' + response.status+' : '+response.statusText);
            error.response = response;
            throw error;
        }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
        })  
        .then(response => response.json())
        .then(leaders=> dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
    }
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders   
    });

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
    });

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
    });




//If you see above only two types of work is happening 
//first, is a fetch function (thunk) of a resource is creacted ,so it fetches resource from the server and call the right action object based on scrutiny of server response
//second, as soon as response from server is obtained it is collected as payload with a action type and
//converted into an object known as action object
//action object is nothing just a wrap of action type and payload together.
//It is an action type based on which the reducer decides what to do with the response/payload.