import { useContext } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../components/Hooks/AxiosPublic/useaxiosPublic';


const Login = () => {
    const { login, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        title: 'Login successful',
                        text: 'Welcome to SyntaxStory!',
                        icon: 'success',
                        confirmButtonText: 'Go to Homepage'
                    })
                    form.reset();
                    navigate("/")
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Try again'
                })
                form.reset();
            });
    };

    const handleGoogle = (e) => {
        e.preventDefault();
        googleLogin()
            .then((res) => {
                const name = res.user?.displayName;
                const email = res.user?.email;
                const userInfo = { name, email }
                if (res.user) {
                    axiosPublic.post("/users", userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: 'Success',
                                    text: 'You have successfully signed up!',
                                    icon: 'success',
                                    confirmButtonText: 'Go to Homepage'
                                })
                                navigate("/")
                            }
                        })
                }
                navigate('/')
            })
            .catch(err => {
                console.lgo(err.message)
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center lg:mt-0 mt-10 px-4">
            <div className="bg-white p-8 rounded shadow-2xl w-full max-w-2xl">
                <h2 className="text-2xl font-extrabold mb-6 text-center">Welcome back in SyntaxStory.</h2>
                <div className="mt-6 flex flex-col space-y-4">
                    <button onClick={handleGoogle} className="flex items-center justify-center text-black font-bold py-2 px-4  rounded-3xl border-2 hover:bg-base-200 ">
                        <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
                    </button>
                    <button className="flex items-center justify-center  text-black font-bold py-2 px-4 rounded-3xl border-2 hover:bg-base-200">
                        <FaFacebook className="mr-2 text-blue-500 text-2xl" /> Sign in with Facebook
                    </button>
                </div>
                <div className='divider'>or</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline rounded-2xl"
                            type="submit"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className='mt-6 text-center font-semibold'>
                    No account? <Link to="/register" className='text-blue-500'>Create one</Link>
                </div>

            </div>
        </div>
    );
};

export default Login;
