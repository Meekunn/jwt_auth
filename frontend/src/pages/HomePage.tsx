import HomeIllustration from "../assets/Humaaans.png"
import { Image, HStack, VStack, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
	const navigate = useNavigate()

	return (
		<HStack>
			<Image src={HomeIllustration} w={"500px"} h={"500px"} />
			<VStack>
				<Button onClick={() => navigate("/signin")}>Sign In</Button>
				<Button onClick={() => navigate("/signup")}>Sign Up</Button>
			</VStack>
		</HStack>
	)
}

export default HomePage
