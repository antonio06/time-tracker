import { TimeTrackerPage } from './pages';
import { TimeProvider, UserProvider } from './common/context';
import AppLayout from './layouts/app-layout';

function App() {

  return (
    <UserProvider>
      <TimeProvider>
        <AppLayout>
          <TimeTrackerPage />
        </AppLayout>
      </TimeProvider>
    </UserProvider>
  )
}

export default App
