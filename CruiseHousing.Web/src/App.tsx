import AppRoutes from "@/routes/AppRoutes";
import { QueryProvider } from "./providers/QueryProvider";

function App() {
    return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
     
}

export default App;
