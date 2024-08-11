import Header from "@/components/Nav/Header";
import LeftSideBar from "@/components/Nav/LeftSideBar";
import UserListTable from "@/components/Table/ContactTable";

const Homepage = () => {
  return (
    <section>
      <Header />
      <section className="flex max-h-screen overflow-scroll border border-red-600 w-full">
        <LeftSideBar />
        <section className=" w-full px-4">
            <UserListTable />
        </section>
      </section>
    </section>
  );
};

export default Homepage;
