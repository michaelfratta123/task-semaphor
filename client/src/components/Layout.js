// Define a layout component
import Header from "./Header";

const Layout = ({ children, userData, handleLogout }) => {
  // Render the component
  return (
    <div>
      <Header userData={userData} handleLogout={handleLogout} />
      {children}
    </div>
  );
};

export default Layout;
