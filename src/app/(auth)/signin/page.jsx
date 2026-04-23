'use client'
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const SigninPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("User data: ", userData);
        
        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: "/dashboard",
        });

        console.log('sign in response: ', { data, error });
        
        if (data) {
        toast.success("Sign-in successful!");
    }

    if (error) {
        console.error("Sign-in error details:", {
            message: error.message,
            status: error.status,
            statusText: error.statusText,
            code: error.code,
            error: error.error,
            keys: Object.getOwnPropertyNames(error),
        });
        toast.error(
            error.error?.message ||
            error.message ||
            'Invalid email or password. Please try again!'
        );
    }

    };

    return (
        <>
            <ToastContainer placement="top-center" />
            <div className="w-11/12 mx-auto mt-10 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-lg">
                    A
                </div>
                <span className="text-xl font-semibold tracking-tight text-white">Authentication</span>
            </div>
            <div>
                <div className=" mt-9 pb-3 flex flex-col items-center justify-center px-4 bg-[#0f0f11]">

                    <div className="bg-[#19191e] border border-[#2e2e38] shadow-xl px-8 py-9 rounded-2xl ">

                        <div>
                            <div className="flex flex-col items-start gap-1 pb-4">
                                <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                                <p className="text-sm text-gray-400">Sign in to your account to continue.</p>
                            </div>
                        </div>

                        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                            {/* Email field */}
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Label className="text-white">Email</Label>
                                <Input name="email" placeholder="john@example.com" />
                                <FieldError />
                            </TextField>

                            {/* Password field */}
                            <TextField className="w-full " name="password"
                                isRequired
                                minLength={8}
                                type="password"
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }
                                    return null;
                                }}>
                                <Label className="text-white">Password</Label>
                                <InputGroup>
                                    <InputGroup.Input
                                        name="password"
                                        className="w-full "
                                        placeholder="Enter your password"
                                        type={isVisible ? "text" : "password"}

                                    />
                                    <InputGroup.Suffix className="pr-0">
                                        <Button
                                            isIconOnly
                                            aria-label={isVisible ? "Hide password" : "Show password"}
                                            size="sm"
                                            variant="ghost"
                                            onPress={() => setIsVisible(!isVisible)}
                                        >
                                            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                        </Button>
                                    </InputGroup.Suffix>
                                </InputGroup>
                                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                <FieldError />
                            </TextField>

                            {/* Submit and Reset buttons */}
                            <div className="flex flex-col items-center gap-2">
                                <Button type="submit" className="w-46">
                                    <Check />
                                    Sign In
                                </Button>

                                <div className="divider text-gray-400">Or</div>

                                <p className="text-sm text-center text-gray-400">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                        Create one
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SigninPage;
