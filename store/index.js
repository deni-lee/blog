import nuxtStorage from 'nuxt-storage'

export const state = () => ({
    token: nuxtStorage.localStorage.getData('token')
})

export const mutations = {
    loginvuex(state, n) {
        state.token = n
        nuxtStorage.localStorage.setData('token', this.state.token)
    },
}