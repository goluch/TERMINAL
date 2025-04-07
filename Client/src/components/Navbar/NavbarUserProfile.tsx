import useUserData from "@hooks/useUserData";

function getUserRoleDisplayValue(role: string): string {
  if (role === "Administrator") return "Administrator";
  if (role === "Moderator") return "Moderator";
  if (role === "Registered") return "Lab Worker";
  if (role === "Guest") return "Guest";

  throw new Error("Invalid role");
}

function getEmailInitials(email: string): string {
  const [first, last] = email.split("@");
  return `${first[0]}${last[0]}`.toUpperCase();
}

function getAvatarColor(email: string): string {
  const hash = email
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 50%, 50%)`;
}

const NavbarUserProfile = () => {
  const { data, status } = useUserData();

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error...</div>;

  return (
    <div className="p-2 bg-white rounded-b-md">
      <div className="flex gap-3 rounded-md p-2 hover:bg-gray-200 hover:cursor-pointer">
        <div
          style={{ backgroundColor: getAvatarColor(data?.email) }}
          className="flex text-white w-10 h-10 rounded-md justify-center items-center"
        >
          <span>{getEmailInitials(data?.email)}</span>
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-sm">{data?.email}</p>
          <p className="text-xs text-gray-500">
            {getUserRoleDisplayValue(data?.role)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarUserProfile;
