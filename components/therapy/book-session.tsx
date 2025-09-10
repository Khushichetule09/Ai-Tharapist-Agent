"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function BookSession() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleBooking = async () => {
    try {
      setIsLoading(true);
      // Simulate booking delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Session Booked!",
        description: "Your therapy session has been confirmed.",
      });

      // Redirect to the therapy session
      router.push("/therapy/343");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Book a Session</h3>
      <p className="text-sm text-muted-foreground">30-minute therapy session</p>
      <Button onClick={handleBooking} disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Book Now"}
      </Button>
    </div>
  );
}
