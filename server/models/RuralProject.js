import mongoose from "mongoose";

const RuralProjectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: true,
            min: 5,
            max: 100,
        },
        location: {
            type: String,
            required: true,
            max: 50,
        },
        projectType: {
            type: String,
            enum: ['Domestic', 'Commercial'],
            required: true,
        },
        monthlyConsumption: {
            type: Number,
            required: true,
        },
        gridType: {
            type: String,
            enum: ['Off-grid', 'On-grid'],
            required: true,
        },
        estimInitiateDate: {
            type: Date,
            required: true,
        },
        estimEndDate: {
            type: Date,
            required: true,
        },
        estimTotalCost: {
            type: Number,
            required: true,
        },
        imagePath: {
            type: String,
            default: "",
        },
        description: {
            type: String,
        },
        currentAllocation: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            default: "Pending",
            enum: ['Pending', 'In Progress', 'Completed'],
        },
        
    }
);

const RuralProject = mongoose.model("RuralProject", RuralProjectSchema);
export default RuralProject;