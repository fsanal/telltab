const INITIAL_STATE = {
    isSignedIn: true,
    userID: "5d2a3675f6809112173e6bf2",
    secret: "leggomyeggo"
}

export default (state = INITIAL_STATE , action) => {
    switch (action.type) {
        default:
            return state;
    }
};