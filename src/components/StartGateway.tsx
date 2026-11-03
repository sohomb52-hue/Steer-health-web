import React from 'react';
import { ArrowUpRight, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface StartGatewayProps {
  onEnter: () => void;
}

export const StartGateway: React.FC<StartGatewayProps> = ({ onEnter }) => {
  return (
    <div className="start-gateway" role="dialog" aria-modal="true" aria-labelledby="gateway-title">
      <div className="gateway-orbit gateway-orbit-one" />
      <div className="gateway-orbit gateway-orbit-two" />
      <div className="gateway-grid" />
      <div className="gateway-content">
        <div className="gateway-topline">
          <span className="gateway-mark"><Sparkles className="h-3 w-3" /> steer / clinical content systems</span>
          <span className="gateway-status"><span className="gateway-status-dot" /> evidence workspace online</span>
        </div>
        <div className="gateway-hero">
          <div className="gateway-copy">
            <p className="gateway-kicker">THE EDITORIAL CONTROL ROOM</p>
            <h1 id="gateway-title">Turn clinical evidence<br /><em>into signal.</em></h1>
            <p className="gateway-description">A focused production system for researchers, clinicians, and teams building content that earns attention without losing the source.</p>
            <button type="button" className="gateway-enter" onClick={onEnter}>
              Start a production session <ArrowUpRight className="h-4 w-4" />
            </button>
            <div className="gateway-proof"><ShieldCheck className="h-4 w-4" /><span>Human review gate enforced</span><span className="gateway-divider" /><span>Claim-level provenance</span></div>
          </div>
          <div className="gateway-panel" aria-label="Workspace capabilities">
            <div className="gateway-panel-label">SESSION FLOW / 04</div>
            {['Ingest the paper', 'Validate every claim', 'Compose the deliverable', 'Schedule with confidence'].map((step, index) => (
              <div className="gateway-step" key={step}>
                <span className="gateway-step-index">0{index + 1}</span>
                <span>{step}</span>
                {index < 3 ? <Check className="h-3.5 w-3.5 gateway-check" /> : <span className="gateway-step-line" />}
              </div>
            ))}
            <div className="gateway-panel-foot">Built for calm, defensible momentum.</div>
          </div>
        </div>
        <div className="gateway-footer"><span>STEER / 2026</span><span>READ DEEPLY · MAKE CLEARLY</span></div>
      </div>
    </div>
  );
};
