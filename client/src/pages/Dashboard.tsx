import Balance from "../components/cards/Balance";
import { LuShieldCheck, LuWallet } from "react-icons/lu";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import SpendingChart from "../components/dashboard/SpendingChart";
import TransactionCard from "../components/cards/TransactionCard";
import BudgetCard from "../components/cards/BudgetCard";
import BankCard from "../components/cards/BankCard";
import QuickActions from "../components/dashboard/QuickActions";

const finance = [
  {
    title: "Total Balance",
    balance: 12580000,
    percent: "+8.2%",
    icon: <LuWallet />,
    isCurrency: true
  },
  {
    title: "Income",
    balance: 2300000,
    percent: "+12.4%",
    icon: <FiArrowDownLeft />,
    isCurrency: true
  },
  {
    title: "Expenses",
    balance: 740000,
    percent: "-4.1%",
    icon: <FiArrowUpRight />,
    isCurrency: true
  },
  {
    title: "Savings Rate",
    balance: 82,
    percent: "+2.8%",
    icon: <LuShieldCheck />,
    isCurrency: false
  },
];

const Dashboard = () => {
  const balanceInfo = finance;

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Good morning, Divine 👋
        </h1>
        <p className="text-slate-500 dark:text-zinc-400">Here's your financial overview.</p>
      </div>
      <div className="grid-cols-1 grid md:grid-cols-2 gap-6 mb-5">
        {balanceInfo.map((info) => (
          <Balance
            key={info.title}
            title={info.title}
            icon={info.icon}
            percent={info.percent}
            balance={info.balance}
            isCurrency={info.isCurrency}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-5">
        <div className="md:col-span-7">
          <AnalyticsChart />
        </div>

        <div className="md:col-span-5">
          <SpendingChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-5">
        <div className="md:col-span-6">
          <TransactionCard />
        </div>
        <div className="md:col-span-6">
          <BudgetCard />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 md:items-stretch gap-6 mb-5">
        <div className="hidden md:col-span-7">
          <BankCard/>
        </div>
        <div className="md:col-span-5">
          <QuickActions />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
