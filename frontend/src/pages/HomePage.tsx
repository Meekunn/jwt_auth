import HomeIllustration from "../assets/Humaaans.png"
import { Image, Stack } from "@chakra-ui/react"

const HomePage = () => {
	return (
		<Stack>
			<Image src={HomeIllustration} w={"500px"} h={"500px"} />
		</Stack>
	)
}

export default HomePage
