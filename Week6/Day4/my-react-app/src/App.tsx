import React, { useState } from "react";
import WithAuth from "./HOC/Auth";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <WithAuth>
      <>
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ padding: "20px", flex: "1" }}>
            <h2>Welcome to the App!</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </main>
        </div>
        <Footer />
      </>
    </WithAuth>
  );
};

export default App;
