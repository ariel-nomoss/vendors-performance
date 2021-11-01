require('dotenv').config()
const fs = require('fs');
const path = require( 'path' );

import { getSummaryTemplate, Summary } from './interfaces';

const hubspotMobileSrc = path.relative('' , process.env.HUBSPOT_MOBILE_PATH);
const webflowMobileSrc = path.relative('' ,process.env.WEBFLOW_MOBILE_PATH);
const zestyMobileSrc = path.relative('' ,process.env.ZESTY_MOBILE_PATH);
const singsaverMobileSrc = path.relative('' ,process.env.SINGSAVER_MOBILE_PATH);
const hubspotDesktopSrc = path.relative('' , process.env.HUBSPOT_DESKTOP_PATH);
const webflowDesktopSrc = path.relative('' ,process.env.WEBFLOW_DESKTOP_PATH);
const zestyDesktopSrc = path.relative('' ,process.env.ZESTY_DESKTOP_PATH);
const singsaverDesktopSrc = path.relative('' ,process.env.SINGSAVER_DESKTOP_PATH);

const vendors = [
    {
        name: 'HubSpot Mobile', 
        src: hubspotMobileSrc
    }, 
    {
        name: 'Webflow Mobile', 
        src: webflowMobileSrc
    },
    {
        name: 'Zesty Mobile',
        src: zestyMobileSrc
    },
    {
        name: 'Singsaver Mobile',
        src: singsaverMobileSrc
    },
    {
        name: 'HubSpot Desktop', 
        src: hubspotDesktopSrc
    }, 
    {
        name: 'Webflow Desktop', 
        src: webflowDesktopSrc
    },
    {
        name: 'Zesty Desktop',
        src: zestyDesktopSrc
    },
    {
        name: 'Singsaver Desktop',
        src: singsaverDesktopSrc
    }
];

let vendorsData: Summary[] = [];

function getData(): void {
    vendors.forEach(vendor => {
        let summary = getSummaryTemplate();
        const summaryFile = vendor.src + '/summary.json';
        let data = fs.readFileSync(summaryFile, {encoding:'utf8', flag:'r'});
        data = JSON.parse(data);
        summary.vendorName = vendor.name;
        data.forEach((datum: any) => {
            summary.overallScore.push(datum.score);
            summary.detail.performance.push(datum.detail.performance);
            summary.detail.accessibility.push(datum.detail.accessibility);
            summary.detail.bestPractices.push(datum.detail['best-practices']);
            summary.detail.seo.push(datum.detail.seo);
            summary.detail.pwa.push(datum.detail.pwa);
        });
        fs.readdirSync(vendor.src, { withFileTypes: true }).map((file: any) => {
            if(file.name !== 'summary.json') {
                const filePath = vendor.src + '/' + file.name;
                console.log(file.name);
                let websiteMetrics = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
                websiteMetrics = JSON.parse(websiteMetrics).audits.metrics.details.items[0];
                summary.metrics.firstContentfulPaint.push(websiteMetrics.firstContentfulPaint);
                summary.metrics.firstMeaningfulPaint.push(websiteMetrics.firstMeaningfulPaint);
                summary.metrics.largestContentfulPaint.push(websiteMetrics.largestContentfulPaint);
                summary.metrics.interactive.push(websiteMetrics.interactive);
                summary.metrics.speedIndex.push(websiteMetrics.speedIndex);
                summary.metrics.totalBlockingTime.push(websiteMetrics.totalBlockingTime);
                summary.metrics.maxPotentialFID.push(websiteMetrics.maxPotentialFID);
                summary.metrics.cumulativeLayoutShift.push(websiteMetrics.cumulativeLayoutShift);
                summary.metrics.cumulativeLayoutShiftMainFrame.push(websiteMetrics.cumulativeLayoutShiftMainFrame);
                summary.metrics.totalCumulativeLayoutShift.push(websiteMetrics.totalCumulativeLayoutShift);
            }
        });

        vendorsData.push(summary);
    });
    fs.writeFile('vendors-organised-data.json', JSON.stringify(vendorsData), function (err: any) {
        if (err) return console.log(err);
        console.log('succesfully written');
    });
}

getData();