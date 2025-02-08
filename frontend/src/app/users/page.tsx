import UserList from "./_components/UserList";

export default function UsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserList />
    </div>
  );
}