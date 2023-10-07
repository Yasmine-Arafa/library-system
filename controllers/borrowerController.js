import * as Borrower from '../models/Borrower.js';

export const createBorrower = async (req, res) => {
    try {
        let newBorrower = await Borrower.create(req.body);

        if(newBorrower.id) { // need to be more specific
            return res.status(200).json(newBorrower);
        }

        return res.status(400).json({ message: "Failed to create the borrower" });
    }
    catch (error) {
        console.error('Error creating borrower:', error);
        return res.status(500).json({ message: "Failed to create the borrower" });
    }
};

export const updateBorrower = async (req, res) => {

    try {
        const { id } = req.params;
        const updatedBorrower = await Borrower.update(id, req.body);

        if (updatedBorrower.id) {
            return res.status(200).json(updatedBorrower);
        } else {
            return res.status(404).json({ message: "Borrower not found" });
        }
    } catch (error) {
        console.error('Error updating borrower:', error);
        return res.status(500).json({ message: "Failed to update the borrower" });
    }

};


export const getBorrower = async (req, res) => {
    try {
        const { id } = req.params;
        const borrower = await Borrower.get(id);

        if (borrower.id) {
            return res.status(200).json(borrower);
        } else {
            return res.status(404).json({ message: "Borrower not found" });
        }
    }
    catch (error) {
        console.error('Error getting borrower:', error);
        return res.status(500).json({ message: "Failed to get the borrower" });
    }
};

export const getAll = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        const response = await Borrower.getAll(page);

        if(response.borrowers.length === 0) {
            return res.status(404).json({ message: "No borrowers found" });
        }
        else if (response.borrowers.length <= 15) {
            return res.status(200).json(response);
        }
        else {
            return res.status(400).json({ message: "Failed to get the borrowers" });
        }

    }
    catch (error) {
        console.error('Error getting borrowers:', error);
        return res.status(500).json({ message: "Failed to get the borrowers" });
    }
};


export const deleteBorrower = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBorrower = await Borrower.deleteBorrower(id);

        if (deletedBorrower.id) {
            return res.status(200).json(deletedBorrower);
        } 
        else {
            return res.status(404).json({ message: "Borrower not found" });
        }
    }
    catch (error) {
        console.error('Error deleting borrower:', error);
        return res.status(500).json({ message: "Failed to delete the borrower" });
    }
};