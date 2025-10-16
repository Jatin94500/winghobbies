import React from "react";

const categories = [
  { title: "RC Planes", img: "/assets/plane1.jpg" },
  { title: "Transmitters", img: "/assets/controller.jpg" },
  { title: "Motors", img: "/assets/battery.jpg" },
  { title: "Accessories", img: "/assets/plane2.jpg" },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={cat.title}
              className="bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-3 text-center font-semibold text-gray-700">
                {cat.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;