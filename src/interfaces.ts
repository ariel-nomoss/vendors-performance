interface Detail {
    performance: number[];
    accessibility: number[];
    bestPractices: number[];
    seo: number[];
    pwa: number[];
}

interface Metrics {
    firstContentfulPaint: number[];
    firstMeaningfulPaint: number[];
    largestContentfulPaint: number[];
    interactive: number[];
    speedIndex: number[];
    totalBlockingTime: number[];
    maxPotentialFID: number[];
    cumulativeLayoutShift: number[];
    cumulativeLayoutShiftMainFrame: number[];
    totalCumulativeLayoutShift: number[];
}

export interface Summary {
    vendorName: string;
    overallScore: number[];
    detail: Detail;
    metrics: Metrics;
}

export function getSummaryTemplate(): Summary {
    return {
        vendorName: '',
        overallScore: [],
        detail: {
            performance: [],
            accessibility: [],
            bestPractices: [],
            seo: [],
            pwa: []
        },
        metrics: {
            firstContentfulPaint: [],
            firstMeaningfulPaint: [],
            largestContentfulPaint: [],
            interactive: [],
            speedIndex: [],
            totalBlockingTime: [],
            maxPotentialFID: [],
            cumulativeLayoutShift: [],
            cumulativeLayoutShiftMainFrame: [],
            totalCumulativeLayoutShift: []
        }
    }
}