import { useAuthContext } from "./useAuthContext"
import { useToast } from "@chakra-ui/react"

const useSignOut = () => {
	const { dispatch } = useAuthContext()
	const toast = useToast()

	const signOut = async () => {
		const response = await fetch("http://localhost:4000/api/auth/signout", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})
		const json = await response.json()

		if (!response.ok) {
			toast({
				title: "Oops!",
				description: `${json.error}.`,
				status: "error",
				position: "bottom-right",
				duration: 5000,
				isClosable: true,
			})
		}

		if (response.ok) {
			localStorage.removeItem("user")
			dispatch({ type: "SIGNOUT" })
		}
	}

	return { signOut }
}

export default useSignOut
