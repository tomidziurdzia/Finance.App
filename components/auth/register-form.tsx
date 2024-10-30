// components/auth/register-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/Loading/Loading";

export default function RegisterForm() {
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
        name,
        lastname,
      });
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      setIsRedirecting(true);
      router.push("/home");
    } catch (error) {
      toast({
        title: "Registration error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  if (isLoading || isRedirecting) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
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
          type="text"
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
        className="w-full text-gray-800"
        disabled={isLoading}
      >
        Sign up
      </Button>
    </form>
  );
}
