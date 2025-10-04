    const readline = require("readline");

let employees = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\n--- Employee Management System ---");
  console.log("1. Add Employee");
  console.log("2. View Employees");
  console.log("3. Search Employee");
  console.log("4. Delete Employee");
  console.log("5. Exit");
  rl.question("Choose an option: ", (choice) => {
    switch (choice) {
      case "1":
        addEmployee();
        break;
      case "2":
        viewEmployees();
        break;
      case "3":
        searchEmployee();
        break;
      case "4":
        deleteEmployee();
        break;
      case "5":
        rl.close();
        break;
      default:
        console.log("Invalid option!");
        showMenu();
    }
  });
}

function addEmployee() {
  rl.question("Enter Employee Name: ", (name) => {
    rl.question("Enter Employee ID: ", (id) => {
      employees.push({ id, name });
      console.log("✅ Employee added successfully!");
      showMenu();
    });
  });
}

function viewEmployees() {
  console.log("\nAll Employees:");
  employees.forEach((emp, index) => {
    console.log(`${index + 1}. ${emp.id} - ${emp.name}`);
  });
  showMenu();
}

function searchEmployee() {
  rl.question("Enter Employee ID to search: ", (id) => {
    const emp = employees.find((e) => e.id === id);
    emp ? console.log(`Found: ${emp.id} - ${emp.name}`) : console.log("❌ Not found!");
    showMenu();
  });
}

function deleteEmployee() {
  rl.question("Enter Employee ID to delete: ", (id) => {
    employees = employees.filter((e) => e.id !== id);
    console.log("✅ Employee deleted if existed.");
    showMenu();
  });
}

showMenu();
