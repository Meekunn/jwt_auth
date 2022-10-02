import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useToast } from "@chakra-ui/react"

const useSignIn = () => {
	// const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const { dispatch } = useAuthContext()
	const toast = useToast()

	const signin = async (email: string, password: string) => {
		setIsLoading(true)
		// setError("")

		const response = await fetch("http://localhost:4000/api/auth/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		})
		const json = await response.json()

		if (!response.ok) {
			setIsLoading(false)
			// setError(json.error)
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
			localStorage.setItem("user", JSON.stringify(json))
			dispatch({ type: "SIGNIN", payload: json })
			setIsLoading(false)
			toast({
				title: "Success",
				description: "Sign In Successful",
				status: "success",
				position: "top-right",
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return { signin, isLoading }
}

export default useSignIn