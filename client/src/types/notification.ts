export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "payment" | "pending" | "security";
}

export const notifications: Notification[] = [
  {
    id: 1,
    title: "Payment Received",
    message: "₦200,000 was credited to your account.",
    time: "2 hours ago",
    type: "payment",
  },
  {
    id: 2,
    title: "Transaction Pending",
    message: "Your PHED payment is currently processing.",
    time: "Yesterday",
    type: "pending",
  },
  {
    id: 3,
    title: "Security Update",
    message: "Your account security settings were updated.",
    time: "2 days ago",
    type: "security",
  },
];
