import React from "react";

const Profile = ({ data }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
        Profile Page
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {data.length > 0 ? (
          data.map((record, index) => (
            <div
              key={index}
              className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {record.name}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {record.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> {record.phone}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Date of Birth:</strong>{" "}
                  {record.dob
                    ? new Date(record.dob).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong>{" "}
                  {`${record.city}, ${record.district}, ${record.province}, ${record.country}`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-lg">No records found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
