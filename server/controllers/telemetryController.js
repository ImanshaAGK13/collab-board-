export function getTelemetryStats(req, res) {
  return res.status(200).json({
    success: true,
    telemetry: {
      stationStatus: 'NOMINAL',
      oxygenPurity: '99.4%',
      hullIntegrity: '98.2%',
      powerGridEfficiency: '94.8%',
      signalDownlinkSpeed: '4.8 Gbps',
      activeDirectivesCount: 5,
      criticalDirectivesCount: 1,
      crewActiveCount: 3,
      uptimeHours: 8420
    }
  });
}
