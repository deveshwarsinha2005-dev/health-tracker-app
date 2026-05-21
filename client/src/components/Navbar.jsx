import { FaBell } from "react-icons/fa";

export default function Navbar({
  profileImage,
}) {

  // SAFE USER FETCH
  const loggedInUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    ) || {};

  // LOGOUT FUNCTION
  const handleLogout = () => {

    // CLEAR SESSION
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "loggedInUser"
    );

    localStorage.removeItem(
      "userEmail"
    );

    // OPTIONAL:
    // Clears old cached dashboard state
    sessionStorage.clear();

    // REDIRECT
    window.location.href =
      "/login";

  };

  return (

    <div className="flex justify-end items-center mb-10">

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* NOTIFICATION */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:scale-110 transition-all duration-300 cursor-pointer shadow-xl">

          <FaBell className="text-yellow-400 text-xl" />

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg border border-white/20 p-3 px-5 rounded-2xl shadow-2xl">

          <img
            src={
              profileImage ||

              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
            }
            alt="profile"
            className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
          />

          <div>

            <h3 className="font-bold text-white text-xl">

              {loggedInUser.name ||
                "User"}

            </h3>

            <p className="text-gray-400 text-sm">

              Premium Member

            </p>

          </div>

        </div>

        {/* LOGOUT BUTTON */}
        <button

          onClick={handleLogout}

          className="bg-red-500 hover:bg-red-400 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-white shadow-xl"

        >

          Logout

        </button>

      </div>

    </div>

  );

}