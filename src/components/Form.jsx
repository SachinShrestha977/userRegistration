import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .required("Phone number is required"),
  dob: yup.date().required("Date of Birth is required"),
  city: yup.string(),
  district: yup.string(),
  province: yup.string(),
  country: yup.string(),
  profilePicture: yup
    .mixed()
    .required("Profile picture is required")
    .test("fileType", "Only PNG files are allowed", (value) => {
      return value && value[0] && value[0].type === "image/png";
    }),
});

const Form = ({ onAdd, data, editIndex }) => {
  const [countries, setCountries] = useState([]);
  const [imagePreview, setImagePreview] = useState(""); // State for image preview

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: "Nepal", // Set default country to "Nepal"
    },
  });

  useEffect(() => {
    // Fetch countries from API
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const sortedCountries = response.data
        .map((country) => country.name.common)
        .sort();
      setCountries(sortedCountries);
    });

    // Populate form with data if editing
    if (editIndex !== null) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
        if (key === "profilePicture" && data[key]) {
          setImagePreview(data[key]); // Set the image preview if editing
        }
      });
    } else {
      reset(); // Reset form if not editing
      setImagePreview(""); // Clear image preview if not editing
    }
  }, [data, editIndex, reset, setValue]);

  const onSubmit = (formData) => {
    onAdd(formData);
    toast.success("Form submitted successfully!");
    reset();
    setImagePreview(""); // Clear image preview after submission
  };

  // Function to handle file input change and set image preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-lg shadow-lg"
    >
      <ToastContainer />

      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="number"
          {...register("phone")}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* DOB */}
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          {...register("dob")}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.dob && (
          <p className="text-red-600 text-sm">{errors.dob.message}</p>
        )}
      </div>

      {/* Address: City */}
      <div>
        <label className="block text-sm font-medium">City</label>
        <input
          type="text"
          {...register("city")}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.city && (
          <p className="text-red-600 text-sm">{errors.city.message}</p>
        )}
      </div>

      {/* Address: District */}
      <div>
        <label className="block text-sm font-medium">District</label>
        <input
          type="text"
          {...register("district")}
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {errors.district && (
          <p className="text-red-600 text-sm">{errors.district.message}</p>
        )}
      </div>

      {/* Address: Province */}
      <div>
        <label className="block text-sm font-medium">Province</label>
        <select
          {...register("province")}
          className="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Select Province</option>
          {[...Array(7).keys()].map((i) => (
            <option key={i + 1} value={`Province ${i + 1}`}>
              Province {i + 1}
            </option>
          ))}
        </select>
        {errors.province && (
          <p className="text-red-600 text-sm">{errors.province.message}</p>
        )}
      </div>

      {/* Address: Country */}
      <div>
        <label className="block text-sm font-medium">Country</label>
        <select
          {...register("country", { required: "Country is required" })}
          defaultValue="Nepal"
          className="mt-1 block w-full p-2 border rounded-md"
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-600 text-sm">{errors.country.message}</p>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full border border-gray-300"
            />
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            {...register("profilePicture")}
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.profilePicture && (
            <p className="text-red-600 text-sm">
              {errors.profilePicture.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {editIndex !== null ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default Form;
