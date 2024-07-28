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
              <div className="">
                {/* <UserNav /> */}
                <UserListTable />
              </div>
            }
          />
          <Route
            path="/:id"
            element={
              <div className="flex">
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
