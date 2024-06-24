import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
    password: string;
}

const Login: FC = () => {
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
                            Sign In to Your Account
                        </h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                                        autoComplete="current-password"
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
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-center text-sm font-medium text-white">
                            Don't have an account?{" "}
                            <a className="text-blue-500 underline" href="/register">
                                Create one here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;