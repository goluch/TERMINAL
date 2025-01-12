import { StrictMode } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from "./components/Navbar/Navbar.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={ <App/> } />
              <Route path="*" element={ <NotFoundPage/> } />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
