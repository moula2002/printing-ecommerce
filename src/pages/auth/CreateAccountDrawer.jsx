import { FiX } from "react-icons/fi";

const CreateAccountDrawer = ({ open, onClose }) => {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 transform transition-transform duration-300 ${
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
        <div className="px-6 py-8 overflow-y-auto h-[calc(100%-64px)]">
          <h2 className="text-2xl font-bold mb-1">Create an account</h2>
          <p className="text-gray-500 mb-6">
            Order history, discounts and much more
          </p>

          <form className="space-y-4">
            <input
              placeholder="First Name *"
              className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Last Name *"
              className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Company Name"
              className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              placeholder="Email *"
              className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* CHECKBOXES */}
            <div className="space-y-3 text-sm text-gray-600">
              <label className="flex gap-3">
                <input type="checkbox" className="mt-1" />
                <span>
                  I agree to the{" "}
                  <span className="text-indigo-600 cursor-pointer">
                    Terms and Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-indigo-600 cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  *
                </span>
              </label>

              <label className="flex gap-3">
                <input type="checkbox" className="mt-1" />
                <span>
                  Stay up to date with our latest offers, updates and new
                  arrivals
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="text-indigo-600 cursor-pointer">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="text-indigo-600 cursor-pointer">
              Terms of Service
            </span>{" "}
            apply.
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateAccountDrawer;
