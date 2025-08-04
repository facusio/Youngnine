import React from "react";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20 px-4 sm:px-6 lg:px-12">
        {children}
      </main>
    </div>
  );
}