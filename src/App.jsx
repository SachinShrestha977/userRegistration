import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Form from "./components/Form";
import Table from "./components/Table";
import Profile from "./components/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const MySwal = withReactContent(Swal);

  const handleAdd = (newRecord) => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = newRecord;
      setData(updatedData);
      setEditIndex(null); // Clear the edit index after update
    } else {
      setData([...data, newRecord]);
    }
  };

  const handleDelete = (index) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((_, i) => i !== index));

        // Adjust the current page if necessary
        if (data.length <= (currentPage - 1) * 5 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        MySwal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const handleEdit = (index) => {
    toast.info("You can edit in above table");
    setEditIndex(index);
  };

  return (
    <Router>
      <ToastContainer />
      <div className="container mx-auto p-4">
        <div className="flex justify-center mb-4"></div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-full max-w-2xl">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                      User Registration
                    </h1>
                    <Form
                      onAdd={handleAdd}
                      data={data[editIndex]}
                      editIndex={editIndex}
                    />
                  </div>
                </div>
                <Table
                  data={data}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
                <div className="flex justify-center">
                  <Link
                    to="/profile"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Go to Profile Page
                  </Link>
                </div>
              </>
            }
          />
          <Route path="/profile" element={<Profile data={data} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
