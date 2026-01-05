const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data
const students = [
    { id: 'ENG001', name: 'Alice Johnson', department: 'Civil Engineering', gpa: 3.85 },
    { id: 'ENG002', name: 'Bob Smith', department: 'Mechanical Engineering', gpa: 3.72 },
    { id: 'ENG003', name: 'Carol White', department: 'Electrical Engineering', gpa: 3.90 },
    { id: 'ENG004', name: 'David Lee', department: 'Civil Engineering', gpa: 3.65 },
    { id: 'ENG005', name: 'Eve Brown', department: 'Chemical Engineering', gpa: 3.78 },
    { id: 'ENG006', name: 'Frank Miller', department: 'Mechanical Engineering', gpa: 3.82 },
    { id: 'ENG007', name: 'Grace Chen', department: 'Electrical Engineering', gpa: 3.88 },
    { id: 'ENG008', name: 'Henry Garcia', department: 'Chemical Engineering', gpa: 3.75 }
];

// API: Get all students GPAs grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = {};
    
    students.forEach(student => {
        if (!groupedByDept[student.department]) {
            groupedByDept[student.department] = [];
        }
        groupedByDept[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
    });
    
    res.json(groupedByDept);
});

// API: Get individual student GPA by student ID
app.get('/api/students/:id/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({
        id: student.id,
        name: student.name,
        department: student.department,
        gpa: student.gpa
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});