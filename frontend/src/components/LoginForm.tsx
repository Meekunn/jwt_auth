import {
	FormControl,
	FormLabel,
	VStack,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
	IconButton,
	Stack,
	Checkbox,
	Link,
	useColorModeValue,
	InputRightElement,
	Flex,
	Text,
} from "@chakra-ui/react"
import { useRef, useState, useEffect } from "react"
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import useSignIn from "../hooks/useSignIn"
import { loginFormStyle } from "./style"

const LoginForm = () => {
	const bg = useColorModeValue("gray.50", "#0a1a30")
	const borderColor = useColorModeValue("gray.900", "#0a1a30")
	const inputRef = useRef<HTMLInputElement>(null)
	const { signin, isLoading } = useSignIn()

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [show, setShow] = useState(false)

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await signin(email, password)
	}

	return (
		<VStack
			borderRadius="lg"
			bg={bg}
			px={6}
			py={12}
			gap={5}
			border={2}
			borderStyle={"solid"}
			borderColor={borderColor}
		>
			<form onSubmit={onSubmit} style={loginFormStyle}>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<MdEmail color="gray.300" />
						</InputLeftElement>
						<Input
							ref={inputRef}
							type="email"
							placeholder="johndoe@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="off"
							aria-autocomplete="none"
						/>
					</InputGroup>
				</FormControl>
				<FormControl>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<RiLockPasswordFill color="gray.300" />
						</InputLeftElement>
						<Input
							type={show ? "text" : "password"}
							placeholder="********"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<InputRightElement width="4.5rem">
							<IconButton
								variant="ghost"
								colorScheme="blue"
								color="gray.300"
								aria-label="Toggle Password Visibility"
								bg={"transparent"}
								size="sm"
								onClick={() => setShow(!show)}
								icon={show ? <MdVisibilityOff /> : <MdVisibility />}
							/>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<Stack
					direction={{ base: "column", sm: "row" }}
					align={"start"}
					justify={"space-between"}
					w="100%"
				>
					<Checkbox>Remember me</Checkbox>
					<Link color={"blue.400"} fontSize="md">
						Forgot password?
					</Link>
				</Stack>
				<Button
					type="submit"
					isLoading={isLoading}
					colorScheme={"blue"}
					size="lg"
					bg={"blue.400"}
					color={"white"}
					_hover={{
						bg: "blue.500",
					}}
					w="100%"
				>
					Sign in
				</Button>
			</form>
			<Flex w={"100%"} justify="center" gap={2}>
				<Text fontSize="md">Don&apos;t have an account?</Text>
				<Link color={"blue.400"} fontSize="md" href="/signup">
					Sign Up
				</Link>
			</Flex>
		</VStack>
	)
}

export default LoginForm
