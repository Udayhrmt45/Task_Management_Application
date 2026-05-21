import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  preventLeadingSpace,
  removeLeadingSpaces,
  validateLogin,
} from "../utils/validators";
import logoSvg from "../assets/logo.svg";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = removeLeadingSpaces(value);

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    login(formData.name, formData.email);

    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={logoSvg} alt="TaskFlow Logo" className="login-logo" />
          <div className="login-title">
            <h1>TaskFlow</h1>
            <p>Sign in to manage your tasks</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">FULL NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Deepak Kumar"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={preventLeadingSpace}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={preventLeadingSpace}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Min 6 chars, 1 uppercase, 1 number"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={preventLeadingSpace}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="login-btn" id="login-button">
            Sign In →
          </button>
          <p className="login-footnote">
            Password must be 6+ characters with an uppercase letter and a number.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
