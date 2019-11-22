export const state = () => ({
    token: ''
})

export const mutations = {
    loginvuex(state, n) {
        state.token = n
    },
}