import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/Login/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 lg:p-0">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <Card className="w-full md:w-1/2 rounded-none border-none p-8 lg:p-12 flex flex-col justify-center dark:bg-dark">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Sign up to get started with your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="mx-auto">
            <p className="text-sm text-secondary">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-gray-700">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/Image.png"
            width={675}
            height={900}
            alt="Register image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
