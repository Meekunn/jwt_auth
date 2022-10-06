import { Heading, Stack } from "@chakra-ui/react"
import SignUpForm from "../components/SignUpForm"
import Navbar from "../components/Navbar"

const SignUp = () => {
	return (
		<>
			<Navbar />
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w="80%">
				<Stack align="center">
					<Heading as="h1" fontSize={"4xl"}>
						Sign Up 😎
					</Heading>
				</Stack>
				<SignUpForm />
			</Stack>
		</>
	)
}

export default SignUp
