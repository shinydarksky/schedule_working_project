import './style/home.css'
import Home from './pages/Home'
import AuthContextProvider from './contexts/auth';
import ScheduleContextProvier from './contexts/schedule';
function App() {
	return (
		<div>
			<AuthContextProvider>
				<ScheduleContextProvier>
					<Home />
				</ScheduleContextProvier>
			</AuthContextProvider>
		</div>
	)
}

export default App