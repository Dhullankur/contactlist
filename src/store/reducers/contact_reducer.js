import {
    ADD_CONTACT,
    EDIT_CONTACT,
    DELETE_CONTACT
} from "../types";

const DEFAULT_USER_STATE = {

    contacts: localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : []
}

export default function contactsReducer(state = DEFAULT_USER_STATE, action) {

    switch (action.type) {

        case ADD_CONTACT:
            const contacts = [...state.contacts, action.payload];
            localStorage.setItem("contacts", JSON.stringify(contacts));
            return {
                contacts
            }
        case EDIT_CONTACT:
            const updatedContact = [...state.contacts];
            updatedContact.splice(action.payload.index, 1, action.payload);
            localStorage.setItem("contacts", JSON.stringify(updatedContact));
            return {
                contacts: updatedContact
            }
        case DELETE_CONTACT:
            const contactsCopy = [...state.contacts];
            contactsCopy.splice(action.payload, 1);
            localStorage.setItem("contacts", JSON.stringify(contactsCopy));
            return {
                contacts: contactsCopy
            }
        default:
            return state
    }
}