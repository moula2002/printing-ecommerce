import React from "react";

function MyOrder() {
  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>

        {/* Empty Order UI */}
        <p className="text-gray-500">You have no orders yet.</p>

        {/* Later we will show orders here */}
      </div>
    </div>
  );
}

export default MyOrder;
