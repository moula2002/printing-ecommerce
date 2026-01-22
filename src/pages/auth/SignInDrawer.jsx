import { FiX } from "react-icons/fi";

const SignInDrawer = ({ open, onClose, onSignUpClick }) => {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2 text-xl font-bold">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-pink-500 to-indigo-600"></div>
            padmamba
          </div>
          <button onClick={onClose} className="text-2xl text-gray-500">
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold mb-1">Sign In</h2>
          <p className="text-gray-500 mb-8">
            Welcome back to padmamba
          </p>

          <form className="space-y-5">
            <input
              placeholder="Email"
              className="w-full rounded-xl bg-gray-100 px-4 py-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl bg-gray-100 px-4 py-4"
            />

            <button className="w-full py-4 rounded-full bg-indigo-600 text-white text-lg font-semibold">
              Sign In
            </button>
          </form>

          {/* 🔥 IMPORTANT PART */}
          <div className="text-center mt-6 space-y-3">
            <p className="text-gray-600">
              Forgot your password?{" "}
              <span className="text-indigo-600 cursor-pointer font-medium">
                Reset It
              </span>
            </p>

            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <span
                onClick={onSignUpClick}
                className="text-indigo-600 cursor-pointer font-medium"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInDrawer;
