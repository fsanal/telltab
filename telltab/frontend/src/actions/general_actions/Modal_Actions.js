import {
    OPEN_TAG_MODAL,
    CLOSE_TAG_MODAL,
    OPEN_CREATE_POST_MODAL,
    CLOSE_CREATE_POST_MODAL
} from '../types/general_types';

export const openTagModal = () => {
    return {
        type: OPEN_TAG_MODAL,
        payload: true
    }
}

export const closeTagModal = () => {
    return {
        type: CLOSE_TAG_MODAL,
        payload: false
    }
}
