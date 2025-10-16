import React from "react";

const features = [
  { icon: "🚚", title: "Free Shipping", desc: "On all orders above $99" },
  { icon: "🔄", title: "Easy Returns", desc: "7-day return policy" },
  { icon: "🎧", title: "24x7 Support", desc: "Dedicated RC experts" },
];

const FeatureBanner = () => {
  return (
    <section className="bg-blue-50 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-sm py-6 px-4 hover:shadow-md transition"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureBanner;