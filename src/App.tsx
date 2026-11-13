import { TimeTrackerPage } from './pages';
import { TimeProvider } from './common/context/time-context';

function App() {

  return (
    <TimeProvider>
      <TimeTrackerPage />
    </TimeProvider>
  )
}

export default App
