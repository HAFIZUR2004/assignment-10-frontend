import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© 2025 AI Model Inventory Manager</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="https://github.com/your-client-repo" target="_blank" rel="noreferrer">Client Repo</a>
        <a href="https://github.com/your-server-repo" target="_blank" rel="noreferrer">Server Repo</a>
      </div>
    </footer>
  );
};

export default Footer;
