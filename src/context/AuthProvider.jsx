// import React, { Children, createContext, useContext, useEffect, useState } from 'react'
// import { userToken } from '../apis/authApi'
// // import { getUserByToken } from '../apis/authApi'
 
// const AuthContext = createContext()

// const AuthProvider = ({children}) => {
//   const [loader,setLoader] = useState(false)
//   const [isLogin,setLogin] = useState(false)
//   const [user,setUser] = useState(null)

//   useEffect(()=>{
//     const token = localStorage.getItem('token')
//     userToken({token}).then((res)=>{
//       setUser(res)
//       setLogin(true)
//     }).catch((err)=>{
//       console.log(err.message)
//       localStorage.removeItem('token')
//       setUser(null)
//       setLogin(false)
//     })
//   },[])
//   return ( 
//     <AuthContext.Provider value={{isLogin,setLogin,user,setUser,loader,setLoader}}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = ()=>{
//   return useContext(AuthContext)
// }

// export default AuthProvider