import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Task.jsx";
import Trash from "./pages/Trash.jsx";
import Users from "./pages/Users.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import Layout from "./Layout.jsx";

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        //Protected routes
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
        //general routes
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
