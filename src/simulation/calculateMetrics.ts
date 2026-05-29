import { simulationResponse } from "./simulationResponseInterface";

export function calculateMetrics(responses : simulationResponse[], duration : number) {

    console.log(responses[0]);
    
    // Latency Calculation
    const durations = responses.map(response => response.durationMs);
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const avg = (durations.reduce((a, b) => a+b, 0)/durations.length);

    durations.sort((a,b) => a-b);

    const p50 = durations[Math.floor(durations.length * 0.50)];
    const p95 = durations[Math.floor(durations.length * 0.95)];
    const p99 = durations[Math.floor(durations.length * 0.99)];
    
    const successCount = responses.filter(response => response.success).length;
    const failureCount = responses.length - successCount;
    const rps = responses.length / (duration / 1000);

    return {
        Metric : "Seconds / Count",
        scenarioDuration : duration,

        totalRequests : responses.length,
        successCount : successCount,
        failureCount : failureCount,

        minLatency : min,
        avgLatency : avg,
        maxLatency : max,

        p50 : p50,
        p95 : p95,
        p99 : p99,

        requestsPerSecond : rps,
    }
}