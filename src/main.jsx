import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider.jsx";
import ProfileProvider from "./Providers/ProfileProvider.jsx";
import BlogProvider from "./Providers/BlogProvider.jsx";
import EditProvider from "./Providers/EditProvider.jsx";
import AvatarProvider from "./Providers/AvatarProvider.jsx";
import JWTProvider from "./Providers/JWTProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <JWTProvider>
            <AuthProvider>
                <AvatarProvider>
                    <ProfileProvider>
                        <BlogProvider>
                            <EditProvider>
                                <App />
                            </EditProvider>
                        </BlogProvider>
                    </ProfileProvider>
                </AvatarProvider>
            </AuthProvider>
        </JWTProvider>
    </React.StrictMode>
);
