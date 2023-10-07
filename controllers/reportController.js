import * as report from '../models/Report.js';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import fs from 'fs';

// one function to export any data to a CSV file

async function exportData(modelData, fileName) {
    try {

        if (!modelData || modelData.length === 0) {
            return false;
        }

        const headers = Object.keys(modelData[0]);
    
        const csvWriter = createCsvWriter({
            path: './reports/' + fileName + '.csv', // Output file name
            header: headers.map((header) => ({ id: header, title: header })),
        });
        
        await csvWriter.writeRecords(modelData) // Write the data to the CSV file

        console.log('CSV file created successfully');
        return true;

       
    }
    catch (error) {
        return false;
    }

}

export async function getBorrowingProcess(req, res) {
    try {
        // read date range
        const { startDate, endDate } = req.query;

        const borrowingProcess = await report.getBorrows(startDate, endDate);
        if(borrowingProcess.count === 0) {
            return res.status(404).json({ message: "No borrowing process found" });
        }
        const borrows = borrowingProcess.borrowings;

        console.log('borrows: ', borrows);

        // export to csv
        let response = await exportData(borrows, 'borrowingProcess');

        if(response) {
            return res.status(200).json({ message: "CSV exporting completed" });
        }
        else {
            return res.status(400).json({ message: "Failed to export the borrowing process" });
        }
        
    }
    catch {
        console.error('Error getting borrowing process:', error);
        return res.status(500).json({ message: "Failed to get the borrowing process" });
    }
}

export async function exportOverdueBorrows(req, res) {

    const overdueBorrows = await report.getOverdueBorrows();

    if(overdueBorrows.count === 0) {
        return res.status(404).json({ message: "No overdue borrows found" });
    }

    const borrows = overdueBorrows.borrowings;

    console.log('borrows: ', borrows);

    // export to csv
    let response = await exportData(borrows, 'overdueBorrows');

    if(response) {
        return res.status(200).json({ message: "CSV exporting completed" });
    }
    else {
        return res.status(400).json({ message: "Failed to export the overdue borrows" });
    }

}


export async function getBorrowingProcessLastMonth(req, res) {

    try {
        const currentDate = new Date().toISOString();
    
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);     // Get the date from one month ago
        const lastMonthDateString = lastMonthDate.toISOString();

        const borrowingProcess = await report.getBorrows(lastMonthDateString, currentDate);

        if(borrowingProcess.count === 0) {
            return res.status(404).json({ message: "No borrowing process found for the last month" });
        }
        const borrows = borrowingProcess.borrowings;

        console.log('borrows: ', borrows);

        // export to csv
        let response = await exportData(borrows, 'borrowingProcessLastMonth');

        if(response) {
            return res.status(200).json({ message: "CSV exporting completed" });
        }
        else {
            return res.status(400).json({ message: "Failed to export the borrowing process of last month" });
        }
        
    }
    catch {
        console.error('Error getting borrowing process:', error);
        return res.status(500).json({ message: "Failed to get the borrowing process of last month" });
    }

}

