import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./theme"
import { BrowserRouter } from "react-router-dom"
import * as ReactDOM from "react-dom/client"
import * as React from "react"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"

const container = document.getElementById("root")
if (!container) throw new Error("Failed to find the root element")
const root = ReactDOM.createRoot(container)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
)

serviceWorker.unregister()
reportWebVitals()
