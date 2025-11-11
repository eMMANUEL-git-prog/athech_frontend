"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId") || "";

  const [formData, setFormData] = useState({
    eventName: "",
    amount: 15000, // fixed amount
    paymentMethod: "card", // default
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    mpesaNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", formData);
    alert(
      `Payment of Ksh ${formData.amount} submitted via ${formData.paymentMethod}!`
    );
    // Here you would call your backend/payment API
  };

  return (
    <div className="min-h-[calc(100vh-73px)] p-6 bg-gray-50 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Event Payment</h1>

        {/* Event Name */}
        <div>
          <label className="block mb-1 font-medium">Event</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Enter event name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Fixed Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount (Ksh)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="card">Card</option>
            <option value="mpesa">M-Pesa</option>
          </select>
        </div>

        {/* Conditional fields */}
        {formData.paymentMethod === "card" ? (
          <>
            <div>
              <label className="block mb-1 font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Expiry</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">CVC</label>
                <input
                  type="text"
                  name="cardCVC"
                  value={formData.cardCVC}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className="block mb-1 font-medium">M-Pesa Number</label>
            <input
              type="text"
              name="mpesaNumber"
              value={formData.mpesaNumber}
              onChange={handleChange}
              placeholder="07XX XXX XXX"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <Button
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Ksh 15000"}
        </Button>
      </form>
    </div>
  );
}
