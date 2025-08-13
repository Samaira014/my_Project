import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ChartBarIcon,
  PhoneIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Seller() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    storeName: "",
    email: "",
    phone: "",
    category: "",
    city: "",
    about: "",
    acceptTerms: false,
  });

  const onChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Thanks, ${form.storeName || "Seller"}! We'll contact you at ${form.email}`);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-20 px-6 text-center shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Become a Seller
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6 opacity-90">
          Start selling your products online and grow your business with our platform.
        </p>
      </motion.section>

      {/* Info + Form */}
      <section className="px-6 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Info Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-8 rounded-2xl shadow-xl border border-yellow-200"
        >
          <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            🚀 Start selling today
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-800">
            Become a <span className="text-yellow-600">Seller</span> & grow your business
          </h1>

          <p className="mt-3 text-slate-600 max-w-xl">
            Join thousands of entrepreneurs selling nationwide with easy logistics,
            secure payments, and powerful growth tools.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition"
            >
              Get Started <ArrowRightIcon className="h-5 w-5" />
            </motion.button>
            <button className="border border-yellow-400 text-yellow-700 px-6 py-3 rounded-xl hover:bg-yellow-50 transition">
              Talk to Sales
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4 text-yellow-500" /> Secure payments
            </li>
            <li className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-yellow-500" /> Analytics dashboard
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-yellow-500" /> 24×7 support
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-yellow-500" /> Easy returns
            </li>
          </ul>
        </motion.div>

        {/* Seller Application Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white border border-yellow-200 shadow-xl rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-slate-800">📋 Apply in 2 minutes</h2>
          <p className="text-slate-500 text-sm">We just need a few details to get you started.</p>

          <input
            type="text"
            placeholder="Store name"
            value={form.storeName}
            onChange={(e) => onChange("storeName", e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 focus:border-yellow-400 focus:ring focus:ring-yellow-100 outline-none"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 focus:border-yellow-400 focus:ring focus:ring-yellow-100 outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 focus:border-yellow-400 focus:ring focus:ring-yellow-100 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 focus:border-yellow-400 focus:ring focus:ring-yellow-100 outline-none"
            >
              <option value="">Select category</option>
              <option value="fashion">Fashion & Accessories</option>
              <option value="electronics">Mobiles & Electronics</option>
              <option value="home">Home & Kitchen</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="grocery">Grocery</option>
            </select>
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 focus:border-yellow-400 focus:ring focus:ring-yellow-100 outline-none"
            />
          </div>

          <textarea
            placeholder="Business address"
            className="w-full border rounded-lg px-4 py-2 border-slate-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100 outline-none"
            rows="3"
            required
          ></textarea>

          <div>
            <label className="block font-medium mb-1 text-slate-700">
              Upload Business License / GST Certificate
            </label>
            <input
              type="file"
              className="w-full border rounded-lg px-4 py-2 border-slate-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100 outline-none"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => onChange("acceptTerms", e.target.checked)}
            />
            Accept terms & policies
          </label>

          <motion.button
            whileHover={{ scale: form.acceptTerms ? 1.03 : 1 }}
            disabled={!form.acceptTerms || loading}
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg w-full shadow-md hover:shadow-lg transition"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </motion.button>
        </motion.form>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-yellow-50 border-t border-yellow-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Sellers", value: "12k+" },
            { label: "Products Listed", value: "150k+" },
            { label: "Monthly Orders", value: "80k+" },
            { label: "Customer Reach", value: "5M+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-yellow-600">{stat.value}</h3>
              <p className="text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">
          Start Selling in 3 Easy Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Register", desc: "Sign up and verify your business details." },
            { step: "2", title: "List Products", desc: "Add your products with images and descriptions." },
            { step: "3", title: "Start Selling", desc: "Go live and start accepting orders instantly." },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500 text-white flex items-center justify-center text-lg font-bold">
                {s.step}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">{s.title}</h3>
              <p className="text-slate-600 mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-yellow-50 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "How much does it cost to sell?", a: "Listing is free. We only charge a small commission per sale." },
              { q: "How do I get paid?", a: "Payments are processed securely and sent directly to your bank account." },
              { q: "Do I need GST?", a: "Yes, a GST certificate is required for selling." },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow p-4"
              >
                <h3 className="font-semibold text-slate-800">{faq.q}</h3>
                <p className="text-slate-600 mt-2">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
