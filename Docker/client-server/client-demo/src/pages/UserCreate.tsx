import { useNavigate, Link } from "react-router-dom";
import type { UserInput } from "../types/user";
import { createUser } from "../api/userApi";
import UserForm from "../components/UserForm";

export default function UserCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: UserInput) => {
    await createUser(data);
    navigate("/");
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Add User</h1>
      <UserForm submitLabel="Create" onSubmit={handleSubmit} />
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Back to list
      </Link>
    </div>
  );
}
