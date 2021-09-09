import './style/home.css'
import Home from './pages/Home'
import AuthContextProvider from './contexts/auth';
function App() {
	return (
		<div>
			<AuthContextProvider>
				<Home />
			</AuthContextProvider>
		</div>
	)
}

export default App