import { Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

interface IProtectedRoute {
	children: JSX.Element
}

const ProtectedRoutes = ({ children }: IProtectedRoute) => {
	const { user } = useAuthContext()

	if (user) {
		return children
	}

	return <Navigate to="/signin" />
}

export default ProtectedRoutes
