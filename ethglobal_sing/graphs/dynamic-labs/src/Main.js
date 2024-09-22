import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/mintlylogo.png" alt="logo" className="w-32"/>
          </div>
          <p className="text-lg mt-2 font-medium text-black">Mintly</p>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-blue-500">Rewarding You for Every Purchase</h1>
        <p className="text-lg mb-16">Web3 spending for <strong className="font-bold text-black">everyone</strong>.</p>
        <DynamicWidget />
      </div>
    </div>
  );
}

export default Main;
