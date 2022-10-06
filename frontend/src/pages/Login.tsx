import { Heading, Stack } from "@chakra-ui/react"
import LoginForm from "../components/LoginForm"
import Navbar from "../components/Navbar"

const Login = () => {
	return (
		<>
			<Navbar />
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align="center">
					<Heading as="h1" fontSize={"4xl"}>
						Sign in to your Account 🔐
					</Heading>
				</Stack>
				<LoginForm />
			</Stack>
		</>
	)
}

export default Login
