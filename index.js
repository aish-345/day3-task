// 1️⃣ Import express
const express = require("express");
const app = express();
const PORT = 5000;

// 2️⃣ Middleware to parse JSON bodies
app.use(express.json());

// 3️⃣ In-memory dataset
let students = [
  { id: 1, name: "Arun", department: "CSE", marks: 78 },
  { id: 2, name: "Priya", department: "IT", marks: 85 },
  { id: 3, name: "Karthik", department: "ECE", marks: 72 }
];

// 4️⃣ Test route
app.get("/", (req, res) => {
  res.send("CRUD API with Multiple Update Working ✅");
});

// 5️⃣ READ ALL STUDENTS
app.get("/students", (req, res) => {
  res.json(students);
});

// 6️⃣ READ SINGLE STUDENT
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// 7️⃣ CREATE NEW STUDENT
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body
  };
  students.push(newStudent);
  res.json(newStudent);
});

// 8️⃣ MULTIPLE UPDATE (PUT) — Update all fields
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let studentExists = false;
  students = students.map(student => {
    if (student.id === id) {
      studentExists = true;
      return { ...student, ...req.body }; // Merge existing student with new data
    } else {
      return student;
    }
  });

  if (!studentExists) return res.status(404).json({ message: "Student not found" });

  res.json({
    message: "Student updated successfully",
    updatedStudents: students
  });
});

// 9️⃣ PARTIAL UPDATE (PATCH) — Update only marks
app.patch("/students/:id/marks", (req, res) => {
  const id = parseInt(req.params.id);
  const { marks } = req.body;

  let studentExists = false;
  students = students.map(student => {
    if (student.id === id) {
      studentExists = true;
      return { ...student, marks };
    } else {
      return student;
    }
  });

  if (!studentExists) return res.status(404).json({ message: "Student not found" });

  res.json({ message: "Marks updated successfully" });
});

// 10️⃣ DELETE STUDENT
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const studentLengthBefore = students.length;
  students = students.filter(student => student.id !== id);

  if (students.length === studentLengthBefore)
    return res.status(404).json({ message: "Student not found" });

  res.json({ message: "Student deleted successfully" });
});

// 11️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
