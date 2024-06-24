import { FC } from "react";
import { useForm } from "react-hook-form";

interface FormData {
    userName: string;
    email: string;
    password: string;
}

const Register: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        //TODO: Handle form submission logic here
        console.log(data);
    };

    return (
        <div className="flex min-h-screen bg-black">
            <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md bg-[#500000] py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                            Create Your Account
                        </h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block text-sm font-medium text-white"
                                >
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="userName"
                                        type="text"
                                        {...register("userName", {
                                            required: "Username is required",
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.userName && <span>{errors.userName.message}</span>}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-white"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email", { required: "Email is required" })}
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && <span>{errors.email.message}</span>}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-white"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                        autoComplete="new-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.password && <span>{errors.password.message}</span>}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>

                            {/* <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white font-medium text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div> */}
                        </form>
                        <p className="mt-10 text-center text-sm font-medium text-white">
                            Already have an account?{" "}
                        </p>
                        <a
                            className="flex justify-center items-center text-blue-500 underline"
                            href="/login"
                        >
                            SignIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;