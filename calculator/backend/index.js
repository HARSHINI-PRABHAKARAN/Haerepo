const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// API route for calculations
app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;
    
    if (num1 === undefined || num2 === undefined) {
        return res.status(400).json({ error: "Missing numbers" });
    }

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    let result;

    switch (operation) {
        case "+":
            result = number1 + number2;
            break;
        case "-":
            result = number1 - number2;
            break;
        case "*":
            result = number1 * number2;
            break;
        case "/":
            result = number2 !== 0 ? number1 / number2 : "Error";
            break;
        default:
            return res.status(400).json({ error: "Invalid operation" });
    }

    res.json({ result });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
