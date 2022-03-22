import { agencyLogin, rootLogin, queryUserInfo, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null, //用户信息  0是管理用户  1是机构用户
    roles: [],  //
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    //user是0则是管理员 1则是机构用户
    let { user, loginId, password } = userInfo;
    let loginMethod;
    if (user === 0) {
      loginMethod = rootLogin;
    } else {
      loginMethod = agencyLogin;
    }
    return new Promise((resolve, reject) => {
      loginMethod({
        loginId,
        password
      }).then(res => {
        const { data } = res;
        // if (parseInt(data.visitAuthority) === 0) {
        //   commit('SET_ROLES', ['admin'])
        // }else if(parseInt(data.visitAuthority) === 1){
        //   commit('SET_ROLES', ['agency'])
        // }else{
        //   return reject('Permission verification failed.')
        // }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      queryUserInfo().then(res => {
        const { data } = res
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USER', data);
        let roles = [];
        console.log(data,'getInfo:::');
        if (data.institutionName === '元界2') {
          roles = ['admin'];
          commit('SET_ROLES', roles)
        } else if (data.institutionName === '元界') {
          roles = ['agency'];
          commit('SET_ROLES', roles)
        } else {
          return reject('Permission verification failed.')
        }
        console.log(roles,22222);
        resolve(roles)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(11111);
      removeToken() // must remove  token  first
      resetRouter()
      commit('SET_ROLES', [])
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      commit('SET_ROLES', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

