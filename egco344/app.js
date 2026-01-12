const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data eiei
const students = [
    { id: 'E001', name: 'John Smith', department: 'Computer Science', gpa: 3.85 },
    { id: 'E002', name: 'Sarah Johnson', department: 'Computer Science', gpa: 3.92 },
    { id: 'E003', name: 'Mike Chen', department: 'Electrical Engineering', gpa: 3.78 },
    { id: 'E004', name: 'Emma Davis', department: 'Electrical Engineering', gpa: 3.88 },
    { id: 'E005', name: 'Alex Wilson', department: 'Civil Engineering', gpa: 3.65 },
    { id: 'E006', name: 'Lisa Brown', department: 'Civil Engineering', gpa: 3.72 },
    { id: 'E007', name: 'David Lee', department: 'Mechanical Engineering', gpa: 3.81 },
    { id: 'E008', name: 'Rachel Green', department: 'Mechanical Engineering', gpa: 3.95 }
];

// API: Get all students with GPAs by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        success: true,
        data: groupedByDept
    });
});

// API: Get individual student GPA by student ID
app.get('/api/students/gpa/:studentId', (req, res) => {
    const student = students.find(s => s.id === req.params.studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});