import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useToast } from "@chakra-ui/react"

export const useSignup = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { dispatch } = useAuthContext()
	const toast = useToast()

	const signup = async (email: string, password: string) => {
		setIsLoading(true)

		const response = await fetch("http://localhost:4000/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
			credentials: "include",
		})
		const json = await response.json()

		if (!response.ok) {
			setIsLoading(false)
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
				description: "Sign Up Successful",
				status: "success",
				position: "top-right",
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return { signup, isLoading }
}
