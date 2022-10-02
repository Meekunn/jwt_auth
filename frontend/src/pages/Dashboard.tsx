import { VStack, Flex, Stack, Button, Heading } from "@chakra-ui/react"
import useSignOut from "../hooks/useSignOut"

const Dashboard = () => {
	const { signOut } = useSignOut()

	const handleSignOut = () => {
		signOut()
	}
	return (
		<VStack>
			<Flex>
				<Button onClick={handleSignOut}>SIGNOUT</Button>
			</Flex>
			<Stack>
				<Heading>Dashboard</Heading>
			</Stack>
		</VStack>
	)
}

export default Dashboard
