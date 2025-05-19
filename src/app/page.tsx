import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import CustomerInfo from "@/components/CustomerInfo";

export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <section className="flex flex-1 flex-col md:flex-row">
        <ChatWindow />
        <CustomerInfo />
      </section>
    </main>
  );
}