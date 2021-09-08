import axios from "axios"
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { useHistory } from "react-router-dom"
const AuthContext = React.createContext()

//custom hook that allows components to access context data
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  function signup(user) {
    setCurrentUser(user);
  }

  async function login(email, password) {
    try {
      let data = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password
      })
      console.log(data.body)
      setCurrentUser(data.data)
      localStorage.setItem("token", data.data.token)
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  function logout() {
    localStorage.removeItem("token")
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(async () => {
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   console.log(user);
    // })
    console.log(123)
    let token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      // TODO: get user from token
      let data = await axios.post("http://localhost:8080/api/auth/getuserfromtoken", {
        token
      })
      if (data.data.user) {
        setLoading(false)
        setCurrentUser(data.data.user)
        history.push("/")
      }
    } else {
      setCurrentUser(null);
      setLoading(false)
    }
    // return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}