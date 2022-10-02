/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer } from "react"

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
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }: IContextProvider) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	})

	console.log("Auth: ", state)

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}
