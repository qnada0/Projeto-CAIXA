import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DevPanel } from './components/DevPanel';
import { Popup } from './pages/Popup';
import { Trail } from './pages/Trail';
import { Step1 } from './pages/Step1';
import { Mission1 } from './pages/Mission1';
import { Points1 } from './pages/Points1';
import { Step2 } from './pages/Step2';
import { Mission2 } from './pages/Mission2';
import { Points2 } from './pages/Points2';
import { Rewards } from './pages/Rewards';
import { RewardDetail } from './pages/RewardDetail';
import { RedeemSuccess } from './pages/RedeemSuccess';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/popup" element={<Popup />} />
        <Route path="/trail" element={<Trail />} />
        <Route path="/step-1" element={<Step1 />} />
        <Route path="/mission-1" element={<Mission1 />} />
        <Route path="/points-1" element={<Points1 />} />
        <Route path="/step-2" element={<Step2 />} />
        <Route path="/mission-2" element={<Mission2 />} />
        <Route path="/points-2" element={<Points2 />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/reward/:id" element={<RewardDetail />} />
        <Route path="/redeem-success" element={<RedeemSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/popup" replace />} />
      </Routes>
      <DevPanel />
    </BrowserRouter>
  );
}

export default App;
