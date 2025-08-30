"use client";

import React from "react";
import ErrorHandlingTest from "../../components/ErrorHandlingTest";

export default function TestErrorHandlingPage() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Error Handling Test Page
        </h1>
        <ErrorHandlingTest />
      </div>
    </div>
  );
}
