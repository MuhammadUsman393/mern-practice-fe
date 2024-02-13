import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllRoutes } from "./routes/routes";
import { NotesProvider } from "./context/notes-crud";

function App() {
  return (
    <NotesProvider>
      <BrowserRouter>
        <Routes>
          {AllRoutes.map((page, index) => (
            <Route
              key={index}
              path={page?.path}
              element={
                <page.Guard>
                  <page.title />
                </page.Guard>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </NotesProvider>
  );
}

export default App;
