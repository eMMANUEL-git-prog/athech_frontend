"use client";

import { Navbar } from "@/components/navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-black mb-6">About ATHECH</h1>

        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p>
            ATHECH is a comprehensive athlete management platform designed to
            empower athletes, coaches, and organizations to achieve their
            highest potential. Founded in 2024, we've been dedicated to
            revolutionizing how athletes track and manage their performance.
          </p>

          <p>
            Our mission is to provide a centralized platform where athletes can
            monitor their progress, coaches can manage their teams effectively,
            and organizations can streamline their operations. We believe that
            access to the right tools and data can make a significant difference
            in athletic success.
          </p>

          <h2 className="text-3xl font-bold text-black mt-12 mb-4">
            Our Values
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-red-600 font-bold">•</span>
              <span>
                <strong>Excellence:</strong> We strive for excellence in
                everything we do, from product development to customer service.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-600 font-bold">•</span>
              <span>
                <strong>Empowerment:</strong> We empower athletes and coaches
                with the tools they need to succeed.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-600 font-bold">•</span>
              <span>
                <strong>Integrity:</strong> We operate with integrity and
                transparency in all our dealings.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span>
                <strong>Community:</strong> We foster a supportive community
                where athletes and coaches can grow together.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
