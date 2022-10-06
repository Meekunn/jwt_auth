import { VStack, Heading, Image } from "@chakra-ui/react"
import DashboardImg from "../assets/Dayflow.png"
import { useAuthContext } from "../hooks/useAuthContext"
import "@fontsource/denk-one"
import Navbar from "../components/Navbar"
import { useEffect } from "react"

const userFont = "'Denk One', sans-serif;"

const Dashboard = () => {
	const { user, dispatch } = useAuthContext()

	useEffect(() => {
		const fetchUserDetails = async () => {
			const response = await fetch("http://localhost:4000/api/auth/dashboard", {
				headers: { Authorization: `Bearer ${user.token}` },
			})
			const json = await response.json()

			if (response.ok) {
				dispatch({ type: "SET_WORKOUTS", payload: json })
			}
		}

		if (user) {
			fetchUserDetails()
		}
	},[ dispatch, user])
	return (
		<>
			<Navbar />
			<VStack>
				{user && <Heading fontFamily={userFont}>Hello, {user.email}</Heading>}
				<Image src={DashboardImg} />
			</VStack>
		</>
	)
}

export default Dashboard
