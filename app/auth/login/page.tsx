"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast({
        title: "Successful login",
        description: "You have successfully logged in.",
      });
      setIsRedirecting(true); // Set the redirecting state
      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Login error",
        description: "Incorrect email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isLoading || isRedirecting ? (
        <Loading />
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 lg:p-0">
          <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
            <Card className="w-full md:w-1/2 rounded-none border-none p-8 lg:p-12 flex flex-col justify-center dark:bg-dark">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  Welcome back
                </CardTitle>
                <CardDescription>
                  Welcome back! Please enter your details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border border-gray-500 text-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border border-gray-500 text-gray-800"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full dark:bg-primary text-gray-800"
                    disabled={isLoading}
                  >
                    Sign in
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="mx-auto">
                <p className="text-sm text-secondary text-center">
                  Don’t have an account?{" "}
                  <Link
                    href="/auth/register"
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
      )}
    </>
  );
}
