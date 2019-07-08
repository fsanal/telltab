const INITIAL_STATE = {
    isSignedIn: true,
    userId: "rat",
    secret: "leggomyeggo"
}

export default (state = INITIAL_STATE , action) => {
    switch (action.type) {
        default:
            return state;
    }
};