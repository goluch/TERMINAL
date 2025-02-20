import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SampleMock from "./components/Sample/SampleMock";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sample-details" element={<SampleMock />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
