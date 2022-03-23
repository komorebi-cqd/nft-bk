const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  user: state => state.user.user,
  userInfo: state => state.user.userInfo,
  permission_routes:state => state.permission.routes,
}
export default getters
