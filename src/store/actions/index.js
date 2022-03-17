import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "../types";

export const addContact = (data) => {

    return {
        type: ADD_CONTACT,
        payload: data
    }
};

export const deleteContact = (data) => {

    return {
        type: DELETE_CONTACT,
        payload: data
    };
}





export const editContact = (data) => {
    return {
        type: EDIT_CONTACT,
        payload: data
    }
};