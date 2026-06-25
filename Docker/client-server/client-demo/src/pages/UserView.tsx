import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { User } from "../types/user";
import { getUser } from "../api/userApi";

export default function UserView() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getUser(id)
      .then(setUser)
      .catch(() => setError("User not found."));
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!user) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">User Details</h1>
      <div className="space-y-2 rounded border border-gray-200 p-4">
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Phone:</span> {user.phone}</p>
        <p className="text-sm text-gray-500">
          Created: {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-4 space-x-3">
        <Link to={`/users/${user._id}/edit`} className="text-amber-600 hover:underline">
          Edit
        </Link>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to list
        </Link>
      </div>
    </div>
  );
}
