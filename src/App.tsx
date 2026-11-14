import { TimeTrackerPage } from './pages';
import { TimeProvider } from './common/context/time-context';
import AppLayout from './layouts/app-layout';

function App() {

  return (
    <TimeProvider>
      <AppLayout>
        <TimeTrackerPage />
      </AppLayout>
    </TimeProvider>
  )
}

export default App
