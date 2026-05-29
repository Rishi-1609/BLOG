export interface ScenarioMetrics {

    scenarioDuration? : number,

    totalRequests : number,
    successCount : number,
    failureCount : number,

    minLatency : number,
    avgLatency : number,
    maxLatency : number,

    p50 : number,
    p95 : number,
    p99 : number,

    requestsPerSecond? : number,
}