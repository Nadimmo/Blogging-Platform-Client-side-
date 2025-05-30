import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaPen, FaHome, FaUser, FaList, FaComment, FaCog, FaAd, FaUsers } from 'react-icons/fa';
import useAdmin from '../components/Hooks/useAdmin';
import { IoMdAddCircle } from 'react-icons/io';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin] = useAdmin()
    // console.log(isAdmin)

    return (
        <div className='min-h-screen ]'>
            {/* Mobile Menu Button */}
            <button className='md:hidden p-3 bg-[#EFDCAB] text-white  hover:bg-gray-700 transition duration-300' onClick={() => setIsOpen(!isOpen)}>
                <FaBars size={24} />
            </button>
            <div className='flex min-h-screen'>
                {/* Sidebar */}
                <div className={`bg-[#EFDCAB]  p-5 w-64 space-y-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'} md:block`}>
                    <ul className='space-y-2'>
                        {isAdmin ? <>  {/* Admin Route */}
                            <li><NavLink to='/dashboard/addAuthor' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><IoMdAddCircle /> Add Author</NavLink></li>
                            <li><NavLink to='/dashboard/manageUsers' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaUser /> Manage Users</NavLink></li>
                            <li><NavLink to='/dashboard/manageAllBlogs' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaList /> Manage Blogs</NavLink></li>
                            <li><NavLink to='/dashboard/manageReview' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaComment /> Manage Review</NavLink></li>
                            <li><NavLink to='/dashboard/manageAuthors' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaUsers /> Manage Authors</NavLink></li>
                            <li><NavLink to='/' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#EFDCAB] text-gray-900 hover:text-black transition duration-300'><FaHome /> Home</NavLink></li></> : <> <li><NavLink to='/dashboard/writeBlogs' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaPen /> Write Blogs</NavLink></li>
                            <li><NavLink to='/dashboard/manageBlogs' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaList /> Manage Blogs</NavLink></li>
                            <li><NavLink to='/dashboard/feedback' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaComment /> Send Feedback</NavLink></li>
                            <li><NavLink to='/' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#EFDCAB] text-gray-900 hover:text-black transition duration-300'><FaHome /> Home</NavLink></li></>}
                    </ul>
                </div>

                {/* Dashboard Content */}
                <div className='w-3/4 mx-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;