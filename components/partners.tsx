"use client";

import { Award, TrendingUp } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Nike",
    logo: "/eldo.png",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "coa.png",
  },
  {
    id: 3,
    name: "Under Armour",
    logo: "ict.png",
  },
  {
    id: 4,
    name: "Puma",
    logo: "/kra.png",
  },
  {
    id: 5,
    name: "Reebok",
    logo: "/ntsa.png",
  },
  {
    id: 6,
    name: "New Balance",
    logo: "/ak.png",
  },
  {
    id: 7,
    name: "ASICS",
    logo: "/fkf.png",
  },
  {
    id: 8,
    name: "Saucony",
    logo: "/equity.png",
  },
  {
    id: 9,
    name: "Brooks",
    logo: "/saf.png",
  },
  {
    id: 10,
    name: "Mizuno",
    logo: "/kcb.png",
  },
  {
    id: 11,
    name: "Hoka One One",
    logo: "/add.png",
  },
  {
    id: 12,
    name: "On Running",
    logo: "/g4s.png",
  },
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
            <Award className="w-4 h-4" />
            Trusted Partnerships
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Global Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with world-leading athletic brands to bring you the
            best equipment and gear
          </p>
        </div>

        {/* Partners Grid */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-6  hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-16 w-auto object-contain  transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-200 transition-colors">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">12+</h3>
                <p className="text-gray-600">Global Partners</p>
              </div>

              <div className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
                <p className="text-gray-600">Countries Reached</p>
              </div>

              <div className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-200 transition-colors">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">10M+</h3>
                <p className="text-gray-600">Athletes Supported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
