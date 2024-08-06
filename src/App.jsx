import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserNav from "./components/Nav/UserNav";
import UserListTable from "./components/Table/ContactTable";
import ContactsProvider from "./contexts/ContactsContext";


const App = () => {
  return (
    <BrowserRouter>
      <ContactsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-95  m-auto">
                {/* <UserNav /> */}
                <UserListTable />
                {/* <AddContactForm /> */}
              </div>
            }
          />
          <Route
            path="/:id"
            element={
              <div className="flex transition-all">
                <UserNav />
                <UserListTable />
              </div>
            }
          />
        </Routes>
      </ContactsProvider>
    </BrowserRouter>
  );
};

export default App;
