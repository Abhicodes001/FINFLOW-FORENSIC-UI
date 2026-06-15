import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CaseWorkspace from './pages/CaseWorkspace';
import FundFlowGraph from './pages/FundFlowGraph';
import DocumentIngestion from './pages/DocumentIngestion';
import ReportGeneration from './pages/ReportGeneration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/case/:id" element={<CaseWorkspace />} />
        <Route path="/case/:id/graph" element={<FundFlowGraph />} />
        <Route path="/case/:id/ingestion/:fileId" element={<DocumentIngestion />} />
        <Route path="/case/:id/report" element={<ReportGeneration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
