// App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";

const Root = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

const Home = lazy(() => import("./routs/home/Home"));
const Files = lazy(() => import("./routs/files/Files"));
const Dashboard = lazy(() => import("./routs/dashboard/Dashboard"));
// const Authentication = lazy(() =>
//   import("./routs/authentication/Authentication")
// );

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/files" element={<Files />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}


export default App;