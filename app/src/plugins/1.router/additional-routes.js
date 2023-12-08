// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      // TODO: Get type from backend
      const userData = useCookie('userData')
      if (userData)
        return { name: 'calendar' }
      
      return { name: 'login', query: to.query }
    },
  },
]
export const routes = [

]
