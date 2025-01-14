"use client";
import React from "react";
import "./Homepage.css";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Homepage() {
  const { toast } = useToast();

  return (
    <>
      <div className="container">
        <div className="maindiv">
          <div className="header">
            <h1>Result Analysis System</h1>
            <p>
              An interactive platform for detailed student and batch analysis
            </p>
          </div>

          <div className="elements">
            <div className="studentwise">
              <h3>Student Wise Analysis</h3>
              <Link href="/StudentWise">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      description: "Your message has been sent.",
                    });
                  }}
                >
                  View
                </Button>
              </Link>
            </div>

            <div className="batchwise">
              <h3>Batch Wise Analysis</h3>
              <Link href="/BatchWise">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      description: "Your message has been sent.",
                    });
                  }}
                >
                  View
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer">Footer Section</div>
      </div>
    </>
  );
}

export default Homepage;
