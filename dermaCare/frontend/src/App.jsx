import React, { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Registration successful! Please login.");
        setActiveTab("login");
        setRegisterData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        setMessage("");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPredictionResult(null);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please upload an image first.");
      return;
    }

    setLoading(true);
    setMessage("");
    setPredictionResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPredictionResult(data);
      } else {
        setMessage(data.error || "Prediction failed.");
      }
    } catch (error) {
      setMessage("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLoginData({
      email: "",
      password: "",
    });
    setSelectedFile(null);
    setPreviewUrl("");
    setPredictionResult(null);
    setMessage("");
    setActiveTab("login");
  };

  if (isAuthenticated) {
    return (
      <div className="dashboard">
        <div className="dashboard-top">
          <div>
            <h1>DermaCare Dashboard</h1>
            <p className="welcome-text">
              Welcome, {user?.name || user?.email || "User"}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {message && <p className="message dashboard-message">{message}</p>}

        <div className="dashboard-grid">
          <div className="upload-card">
            <h2>Upload Skin Image</h2>
            <p className="card-text">
              Choose an image from your computer and click analyze.
            </p>

            <form onSubmit={handlePredict}>
              <label className="upload-box">
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                />
                <span>Click here to upload image</span>
              </label>

              {previewUrl && (
                <div className="preview-box">
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                </div>
              )}

              <button type="submit" className="analyze-btn" disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Image"}
              </button>
            </form>
          </div>

          <div className="result-card">
            <h2>Prediction Result</h2>

            {!predictionResult && !loading && (
              <p className="card-text">
                Your prediction result will appear here after image analysis.
              </p>
            )}

            {loading && (
              <p className="loading-text">Please wait... analyzing image.</p>
            )}

            {predictionResult && (
              <div className="result-content">
                <div className="result-highlight">
                  <p className="result-label">Predicted Class</p>
                  <h3>{predictionResult.predicted_class}</h3>
                </div>

                <div className="confidence-box">
                  <p>
                    <strong>Confidence:</strong>{" "}
                    {(predictionResult.confidence * 100).toFixed(2)}%
                  </p>
                </div>

                {predictionResult.all_probabilities && (
                  <div className="probability-list">
                    <h4>All Probabilities</h4>
                    {Object.entries(predictionResult.all_probabilities).map(
                      ([key, value]) => (
                        <div className="probability-item" key={key}>
                          <div className="probability-header">
                            <span>{key}</span>
                            <span>{(value * 100).toFixed(2)}%</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${value * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="brand-box">
        <h1>DermaCare AI</h1>
        <p className="subtitle">
          Smart skin disease detection with a clean and modern interface
        </p>
      </div>

      <div className="glass-card">
        <div className="tabs">
          <button
            type="button"
            className={activeTab === "login" ? "active" : ""}
            onClick={() => {
              setActiveTab("login");
              setMessage("");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={activeTab === "register" ? "active" : ""}
            onClick={() => {
              setActiveTab("register");
              setMessage("");
            }}
          >
            Register
          </button>
        </div>

        {message && <p className="message">{message}</p>}

        {activeTab === "register" ? (
          <form onSubmit={handleRegister}>
            <h2>Create Account</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />

            <button type="submit">Register</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h2>Welcome Back</h2>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;