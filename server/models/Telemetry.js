import mongoose from 'mongoose';

const telemetrySchema = new mongoose.Schema(
  {
    stationStatus: { type: String, default: 'NOMINAL' },
    oxygenPurity: { type: String, default: '99.4%' },
    hullIntegrity: { type: String, default: '98.2%' },
    powerGridEfficiency: { type: String, default: '94.8%' },
    signalDownlinkSpeed: { type: String, default: '4.8 Gbps' },
    activeDirectivesCount: { type: Number, default: 5 },
    criticalDirectivesCount: { type: Number, default: 1 },
    crewActiveCount: { type: Number, default: 3 },
    uptimeHours: { type: Number, default: 8420 }
  },
  { timestamps: true }
);

export default mongoose.model('Telemetry', telemetrySchema);
