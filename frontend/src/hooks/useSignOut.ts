import { useAuthContext } from "./useAuthContext"

const useSignOut = () => {
	const { dispatch } = useAuthContext()

	const signOut = () => {
		localStorage.removeItem("user")
		dispatch({ type: "SIGNOUT" })
	}

	return { signOut }
}

export default useSignOut
