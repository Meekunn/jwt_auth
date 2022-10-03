import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { Box, Flex, useColorModeValue, Text, Stack, Button } from "@chakra-ui/react"
import "@fontsource/dancing-script/700.css"
import "@fontsource/denk-one"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import useSignOut from "../hooks/useSignOut"

const logoFont = "'Dancing Script', cursive;"
const userFont = "'Denk One', sans-serif;"

const Navbar = () => {
	const navigate = useNavigate()
	const { signOut } = useSignOut()
	const { user } = useAuthContext()

	const handleSignOut = () => {
		signOut()
		navigate("/signin")
	}

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
			>
				<Flex flex={{ base: 1 }} justify={"start"}>
					<Text
						fontFamily={logoFont}
						textAlign={"left"}
						color={useColorModeValue("gray.800", "white")}
					>
						JWT_Auth_App
					</Text>
				</Flex>

				<Stack justify={"flex-end"} direction={"row"} spacing={6}>
					{user ? (
						<>
							<Text
								color={useColorModeValue("gray.800", "white")}
								fontFamily={userFont}
							>
								Welcome, {user.email}
							</Text>
							<Button
								display={"inline-flex"}
								fontSize={"sm"}
								fontWeight={600}
								color={"white"}
								bg={"pink.400"}
								_hover={{
									bg: "pink.300",
								}}
								onClick={handleSignOut}
							>
								Sign Out
							</Button>
						</>
					) : (
						<>
							<Button
								fontSize={"sm"}
								fontWeight={600}
								variant={"link"}
								onClick={() => navigate("/signin")}
								_hover={{
									textDecoration: "none",
									transform: "scale(1.1)",
								}}
							>
								Sign In
							</Button>
							<Button
								display={"inline-flex"}
								fontSize={"sm"}
								fontWeight={600}
								color={"white"}
								bg={"pink.400"}
								onClick={() => navigate("/signup")}
								_hover={{
									bg: "pink.300",
								}}
							>
								Sign Up
							</Button>
						</>
					)}
					<ColorModeSwitcher justifySelf="flex-end" />
				</Stack>
			</Flex>
		</Box>
	)
}

export default Navbar
