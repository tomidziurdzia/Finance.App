import { Suspense } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import Link from "next/link";
import Form from "./form";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 lg:p-0">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <Card className="w-full md:w-1/2 rounded-none border-none p-8 lg:p-12 flex flex-col justify-center dark:bg-dark">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Welcome back! Please enter your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <Form />
            </Suspense>
          </CardContent>
          <CardFooter className="mx-auto">
            <p className="text-sm text-secondary text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-gray-700 inline-block"
              >
                Sign up for free
              </Link>
            </p>
          </CardFooter>
        </Card>
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/Image.png"
            width={675}
            height={900}
            alt="Login image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
