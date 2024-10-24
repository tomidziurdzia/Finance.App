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

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        email,
        password,
        name: "",
        lastname: "",
      });
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      setIsRedirecting(true);
      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Registration error",
        description: "Something went wrong. Please try again.",
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
                  Create an account
                </CardTitle>
                <CardDescription>
                  Sign up to get started with your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border border-gray-500 text-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Lastname</Label>
                    <Input
                      id="lastname"
                      type="lastname"
                      placeholder="Enter your lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                      className="border border-gray-500 text-gray-800"
                    />
                  </div>
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
                    className="w-full text-gray-800s"
                    disabled={isLoading}
                  >
                    Sign up
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="mx-auto">
                <p className="text-sm text-secondary">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-gray-700"
                  >
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
      )}
    </>
  );
}
