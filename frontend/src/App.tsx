import { Box, Grid } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import Dashboard from "./pages/Dashboard"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

const App = () => {
	const { user } = useAuthContext()
	return (
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<Routes>
					<Route path="/" element={!user ? <HomePage /> : <Navigate to="/dashboard" />} />
					<Route path="/signin" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
					<Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
					<Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
				</Routes>
			</Grid>
		</Box>
	)
}

export default App
