import React from "react";
import axios from "axios";
import { initPi } from "@/lib/piClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export default function PiPayButton() {
  const onPay = async () => {
    const Pi = initPi(true); // Sandbox
    if (!Pi) return alert("Open this site inside Pi Browser.");

    try {
      await Pi.createPayment(
        {
          amount: 1,
          memo: "Freelance Hub test payment",
          metadata: { orderId: Date.now() }
        },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            await axios.post(`${API_BASE}/api/pi/approve`, { paymentId });
          },
          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            await axios.post(`${API_BASE}/api/pi/complete`, { paymentId, txid });
            alert("Payment completed!");
          },
          onCancel: (paymentId: string) => {
            console.log("User cancelled", paymentId);
          },
          onError: (error: any, payment?: any) => {
            console.error("Payment error", error, payment);
            alert(error?.message || "Payment error");
          },
          onIncompletePaymentFound: (payment: any) => {
            console.log("Incomplete:", payment);
          }
        }
      );
    } catch (e:any) {
      console.error(e);
      alert(e?.message || "Payment init error");
    }
  };

  return <button onClick={onPay}>Pay 1π</button>;
}
