require('dotenv').config()
const fs = require('fs');
const path = require( 'path' );

interface Detail {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
}

interface SummaryAverage {
    vendorName: string;
    score: number;
    detail: Detail;
}

const hubspotSrc = path.relative('' , process.env.HUBSPOT_PATH);
const webflowSrc = path.relative('' ,process.env.WEBFLOW_PATH);
const vendors = [{name: 'HubSpot', src: hubspotSrc}, {name: 'Webflow', src: webflowSrc}];

function getData(): void {
    vendors.forEach(vendor => {
        const summaryFile = vendor.src + '/summary.json';
        let data = fs.readFileSync(summaryFile, {encoding:'utf8', flag:'r'});
        data = JSON.parse(data);
        let count = 0;
        let avgScore = 0;
        let avgPerformance = 0;
        let avgAccessibility = 0;
        let avgBestPractices = 0;
        let avgSeo = 0;
        let avgPwa = 0;
        data.forEach((datum: any) => {
            avgScore += datum.score;
            avgPerformance += datum.detail.performance;
            avgAccessibility += datum.detail.accessibility;
            avgBestPractices += datum.detail['best-practices'];
            avgSeo += datum.detail.seo;
            avgPwa += datum.detail.pwa;
            count++;
        });
        avgScore = avgScore/count;
        avgPerformance = avgPerformance/count;
        avgAccessibility = avgAccessibility/count;
        avgBestPractices = avgBestPractices/count;
        avgSeo = avgSeo/count;
        avgPwa = avgPwa/count;
        let summary: SummaryAverage = {
            vendorName: vendor.name,
            score: avgScore,
            detail: {
                performance: avgPerformance,
                accessibility: avgAccessibility,
                bestPractices: avgBestPractices,
                seo: avgSeo,
                pwa: avgPwa
            }
        }
        console.log(summary);
    });
}

getData();