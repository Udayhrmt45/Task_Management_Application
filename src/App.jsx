import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
