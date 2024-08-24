import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Table = ({ data, onDelete, onEdit, currentPage, setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter data based on search query
  const filteredData = data.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-center">
        <div className="w-full max-w-5xl overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th colSpan="7">
                  <div className="flex justify-between items-center px-6 py-3">
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="border border-gray-300 rounded-md p-2 font-semibold placeholder:text-gray-500"
                    />
                  </div>
                </th>
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DOB
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="px-6 py-4">{record.name}</td>
                    <td className="px-6 py-4">{record.email}</td>
                    <td className="px-6 py-4">{record.phone}</td>
                    <td className="px-6 py-4">
                      {record.dob
                        ? new Date(record.dob).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-6 py-4">
                      {`${record.city}, ${record.district}, ${record.province}, ${record.country}`}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onEdit(index)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(index)}
                        className="ml-4 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredData.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredData.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              className="flex justify-center mt-4 space-x-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
