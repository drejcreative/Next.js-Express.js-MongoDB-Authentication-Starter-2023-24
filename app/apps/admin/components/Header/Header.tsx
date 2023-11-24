import { useUser } from "hooks/useUsers";
import { useAuth } from "@/apps/auth/hooks/useAuth";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <main>
      <h2 className="text-3xl">Hello {user.firstName}</h2>
      <button
        className="shadow-sm px-2 py-4 bg-purple-500 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
};

export default Header;
