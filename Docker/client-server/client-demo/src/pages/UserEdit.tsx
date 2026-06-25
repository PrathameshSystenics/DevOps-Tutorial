import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import type { UserInput } from "../types/user";
import { getUser, updateUser } from "../api/userApi";
import UserForm from "../components/UserForm";

export default function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initial, setInitial] = useState<UserInput | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getUser(id)
      .then((u) => setInitial({ name: u.name, email: u.email, phone: u.phone }))
      .catch(() => setError("User not found."));
  }, [id]);

  const handleSubmit = async (data: UserInput) => {
    if (!id) return;
    await updateUser(id, data);
    navigate("/");
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!initial) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Edit User</h1>
      <UserForm initial={initial} submitLabel="Update" onSubmit={handleSubmit} />
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Back to list
      </Link>
    </div>
  );
}
