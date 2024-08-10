import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactsProvider from "./contexts/ContactsContext";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import PrivateRoute from "./utils/PrivateRoutes";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContactsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute className='relative'>
                  <Homepage />
                </PrivateRoute>
              }
            />
          </Routes>
        </ContactsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
