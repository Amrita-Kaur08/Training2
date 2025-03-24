import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: "200px", padding: "10px", background: "#f4f4f4" }}>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
