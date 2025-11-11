"use client";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-3">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 py-3 px-6 rounded-xl font-medium"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
