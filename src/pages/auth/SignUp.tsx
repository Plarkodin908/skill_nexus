
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    await signUp(email, password, name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-forest">
      <Link to="/" className="absolute top-4 left-4 text-white hover:text-mint flex items-center gap-2">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>
      
      <div className="mb-8 text-center">
        <img 
          src="/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png" 
          alt="SKILL NEXUS Logo" 
          className="h-20 w-auto mx-auto"
        />
        <h1 className="text-2xl font-bold text-white mt-4">Join Skill Nexus</h1>
      </div>
      
      <Card className="w-full max-w-md bg-forest-light border-mint/20">
        <CardHeader>
          <CardTitle className="text-white">Create an Account</CardTitle>
          <CardDescription className="text-white/70">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-forest border-mint/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-forest border-mint/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-forest border-mint/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-forest border-mint/20 text-white"
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-mint hover:bg-mint/90 text-forest"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-mint/10 pt-4">
          <p className="text-white/70">
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="text-mint hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <p className="mt-8 text-white/50 text-sm">
        By creating an account, you agree to our{" "}
        <Link to="/legal" className="text-mint hover:underline">Terms of Service</Link>
        {" "}and{" "}
        <Link to="/legal" className="text-mint hover:underline">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default SignUp;
