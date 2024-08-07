import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserNav from "./components/Nav/UserNav";
import UserListTable from "./components/Table/ContactTable";
import ContactsProvider from "./contexts/ContactsContext";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import PrivateRoute from "./utils/PrivateRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContactsProvider>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div className="w-95 m-auto">
                    <UserListTable />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/:id"
              element={
                <PrivateRoute>
                  <div className="flex transition-all">
                    <UserNav />
                    <UserListTable />
                  </div>
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
