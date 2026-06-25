import { Routes, Route, Link } from "react-router-dom";
import UsersList from "./pages/UsersList";
import UserView from "./pages/UserView";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-gray-800">
            User Management
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/users/new" element={<UserCreate />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
        </Routes>
      </main>
    </div>
  );
}
