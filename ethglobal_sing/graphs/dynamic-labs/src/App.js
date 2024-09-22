import { DynamicContextProvider, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Main from "./Main";  // Login page component
import HomePage from "./homepage";  // Homepage after login
import DisneyProducts from "./disney";  // Disney products page
import Shop from './Shop';  // Create this component

const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "8880402a-de23-4fdb-be4c-86d00f16f259",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <Router>
        <AppRoutes />
      </Router>
    </DynamicContextProvider>
  );
};

const AppRoutes = () => {
  const { user } = useDynamicContext();

  return (
    <Routes>
      {/* If not logged in, show the Main component, otherwise redirect to /home */}
      <Route
        path="/"
        element={!user ? <Main /> : <Navigate to="/home" />}
      />

      {/* HomePage will be displayed after login */}
      <Route
        path="/home"
        element={user ? <HomePage /> : <Navigate to="/" />}
      />

      {/* Shop page */}
      <Route
        path="/shop"
        element={user ? <Shop /> : <Navigate to="/" />}
      />

      {/* Disney products page */}
      <Route
        path="/disney-products"
        element={user ? <DisneyProducts /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
