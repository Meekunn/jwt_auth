/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, useEffect } from "react"

interface IContextProvider {
	children: React.ReactNode
}

export const AuthContext = createContext<any>(null)

export const authReducer = (state: any, action: { type: string; payload: any }) => {
	switch (action.type) {
		case "SIGNIN":
			return { user: action.payload }
		case "SIGNOUT":
			return { user: null }
		case "GET_USER":
			return { user: action.payload }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }: IContextProvider) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	})

	useEffect(() => {
		const check = localStorage.getItem("user")
		if (check != null) {
			const user = JSON.parse(check)
			dispatch({ type: "SIGNIN", payload: user })
		}
	}, [])

	console.log("Auth: ", state)

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}
