import HomeIllustration from "../assets/Humaaans.png"
import { Image, HStack } from "@chakra-ui/react"
import Navbar from "../components/Navbar"

const HomePage = () => {
	return (
		<>
			<Navbar />
			<HStack>
				<Image src={HomeIllustration} w={"500px"} h={"500px"} />
			</HStack>
		</>
	)
}

export default HomePage
