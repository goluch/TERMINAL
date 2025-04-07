const NavbarUserProfile = () => {
  return (
    <div className="p-2 bg-white rounded-b-md">
      <div className="flex gap-3 rounded-md p-2 hover:bg-gray-200 hover:cursor-pointer">
        <div className="bg-neutral text-neutral-content w-12 h-10 rounded-lg flex justify-center items-center">
          <span>GG</span>
        </div>
        <div className="flex flex-col justify-start w-full">
          <p className="text-sm w-full">Gracjan Grzech</p>
          <p className="text-xs text-gray-500">Lab worker</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarUserProfile;
