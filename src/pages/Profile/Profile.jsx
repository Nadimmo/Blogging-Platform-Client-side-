import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useMyBlogs from "../../components/Hooks/useMyBlogs";
import Swal from "sweetalert2";
import useAxiosPublic from "../../components/Hooks/AxiosPublic/useaxiosPublic";
import useProfile from "../../components/Hooks/useProfile";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { refetch, userData } = useProfile()
    const { myBlogs } = useMyBlogs();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        bio: "",
        designation: "",
    });

    // Create Profile Pop-up
    const handleCreateProfile = () => {
        Swal.fire({
            title: "Create Profile",
            html: `
                <input id="name" class="swal2-input" placeholder="Full Name" value="${profile.name}">
                <input id="email" class="swal2-input" placeholder="Email" value="${profile.email}" disabled>
                <input id="bio" class="swal2-input" placeholder="Bio">
                <input id="designation" class="swal2-input" placeholder="Designation">
            `,
            showCancelButton: true,
            confirmButtonText: "Submit",
            preConfirm: () => {
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const bio = document.getElementById("bio").value;
                const designation = document.getElementById("designation").value;

                if (!name || !email || !bio || !designation) {
                    Swal.showValidationMessage("All fields are required!");
                    return false;
                }

                return { name, email, bio, designation };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const newProfile = result.value;
                setProfile(newProfile);

                axiosPublic.post('/profile', newProfile)
                    .then((res) => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Profile Created Successfully!",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            refetch()
                        }
                    })
                    .catch((err) => {
                        console.error("Error creating profile:", err);
                        Swal.fire("Error", "Failed to create profile. Please try again!", "error");
                    });
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-28 min-h-screen">
            {/* Profile Header */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg"
                />
                {/* //data form database */}
                {userData.map(pro => <> <h2 className="text-2xl font-bold mt-3">{pro.name}</h2>
                    <p className="text-gray-600">{pro.email}</p>
                    <p className="text-gray-700 mt-2">{pro.bio || "No bio added yet"}</p>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm mt-2">
                        {pro.designation || "Blogger"}
                    </span>

                    <div className="flex space-x-4 mt-4">
                        <Link to="/dashboard/writeBlogs">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                                Dashboard
                            </button>
                        </Link>

                        {pro.bio ? <Link to={`/editProfile/${pro._id}`} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                            Edit Profile
                        </Link>
                            :
                            <button
                                onClick={handleCreateProfile}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Create Profile
                            </button>}
                    </div>

                </>
                )}


            </div>

            {/* User Blogs */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Your Blog Posts</h3>
                <div className="space-y-4">
                    {myBlogs.length > 0 ? (
                        myBlogs.map((blog) => (
                            <div key={blog.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-bold">{blog.title}</h4>
                                <p className="text-gray-600 text-sm">{blog.date_time}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">You haven't written any blogs yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
