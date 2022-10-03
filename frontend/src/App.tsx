import { Box, Grid } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProtectedRoutes from "./HOC/ProtectedRoutes"
import Dashboard from "./pages/Dashboard"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

const App = () => {
	return (
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signin" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoutes>
								<Dashboard />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</Grid>
		</Box>
	)
}

export default App
