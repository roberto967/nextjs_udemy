import { Home } from './pages/Home';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessageContainer } from './components/MessagesContainer';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <Home />
      </MessageContainer>
    </TaskContextProvider>
  );
}
