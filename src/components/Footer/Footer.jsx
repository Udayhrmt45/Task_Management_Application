import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        <span>TaskFlow</span> &copy; {currentYear}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
