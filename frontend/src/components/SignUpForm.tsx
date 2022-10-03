/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	FormControl,
	FormLabel,
	VStack,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
	IconButton,
	Link,
	useColorModeValue,
	InputRightElement,
	Flex,
	Text,
	FormErrorMessage,
	FormHelperText,
} from "@chakra-ui/react"
import { useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { formStyle } from "./style"
import { useSignup } from "../hooks/useSignUp"
import { PASSWORD_REGEX, USEREMAIL_REGEX } from "../regex"

const SignUpForm = () => {
	const bg = useColorModeValue("gray.50", "#0a1a30")
	const borderColor = useColorModeValue("gray.900", "#0a1a30")
	const inputRef = useRef<HTMLInputElement>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const navigate = useNavigate()
	const {
		register,
		watch,
		handleSubmit,
		getValues,
		formState: { errors },
		reset,
	} = useForm<IAuthValue>()

	const { signup, isLoading } = useSignup()
	const [show, setShow] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const onSubmit = handleSubmit(async (data) => {
		const currentForm = formRef.current
		if (currentForm == null) return
		await signup(data.email, data.password)
		reset()
		setTimeout(() => {
			navigate("/signin")
		}, 2000)
	})

	return (
		<VStack
			borderRadius="lg"
			bg={bg}
			px={6}
			py={12}
			border={2}
			borderStyle={"solid"}
			borderColor={borderColor}
		>
			<form ref={formRef} onSubmit={onSubmit} style={formStyle}>
				<FormControl isInvalid={!!errors.email}>
					<FormLabel>Email</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<MdEmail color="gray.300" />
						</InputLeftElement>
						<Input
							{...register("email", {
								required: "Email is Required",
								pattern: {
									value: USEREMAIL_REGEX,
									message: "Invalid Email",
								},
							})}
							autoComplete="off"
							aria-autocomplete="none"
							type="email"
							placeholder="johndoe@email.com"
						/>
					</InputGroup>
					{errors.email ? (
						<FormErrorMessage fontSize="xs" textAlign="left">
							{errors.email && errors?.email.message}
						</FormErrorMessage>
					) : (
						<FormHelperText opacity={0}>johndoe@email.com</FormHelperText>
					)}
				</FormControl>
				<FormControl isInvalid={!!errors.password}>
					<FormLabel>Password</FormLabel>

					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<RiLockPasswordFill color="gray.300" />
						</InputLeftElement>
						<Input
							{...register("password", {
								required: "Password is Required",
								pattern: {
									value: PASSWORD_REGEX,
									message:
										"8 to 24 characters, must include uppercase and lowercase letters, a number and a special character (!@#$%).",
								},
							})}
							type={show ? "text" : "password"}
							placeholder="********"
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
					{errors.password ? (
						<FormErrorMessage fontSize="xs" textAlign="left">
							{errors.password && errors?.password.message}
						</FormErrorMessage>
					) : (
						<FormHelperText opacity={0}>Password</FormHelperText>
					)}
				</FormControl>
				<FormControl isInvalid={!!errors.confirm}>
					<FormLabel>Confirm Password</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<RiLockPasswordFill color="gray.300" />
						</InputLeftElement>
						<Input
							{...register("confirm", { required: "Confirm your Password" })}
							type={showConfirm ? "text" : "password"}
							placeholder="********"
						/>
						<InputRightElement width="4.5rem">
							<IconButton
								variant="ghost"
								colorScheme="blue"
								color="gray.300"
								aria-label="Toggle Password Visibility"
								bg={"transparent"}
								size="sm"
								onClick={() => setShowConfirm(!showConfirm)}
								icon={showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
							/>
						</InputRightElement>
					</InputGroup>
					{errors.confirm ? (
						<FormErrorMessage fontSize="xs" textAlign="left">
							{errors.confirm && errors?.confirm.message}
						</FormErrorMessage>
					) : (
						<FormHelperText opacity={0}>Confirm Password</FormHelperText>
					)}
					{watch("confirm") !== watch("password") && getValues("confirm") ? (
						<Text fontSize="xs" color="red" textAlign="left">
							Your passwords do no match
						</Text>
					) : (
						<Text fontSize="xs" color="red" textAlign="left" opacity={0}>
							Confirm Password
						</Text>
					)}
				</FormControl>
				<Button
					colorScheme={"blue"}
					size="lg"
					bg={"blue.400"}
					color={"white"}
					_hover={{
						bg: "blue.500",
					}}
					w="100%"
					isLoading={isLoading}
					loadingText="Signing Up"
					type="submit"
				>
					Sign Up
				</Button>
				<Flex w={"100%"} justify="center" gap={2} pt={2}>
					<Text fontSize="md">Have an account?</Text>
					<Link color={"blue.400"} fontSize="md" href="/">
						Sign In
					</Link>
				</Flex>
			</form>
		</VStack>
	)
}

export default SignUpForm
