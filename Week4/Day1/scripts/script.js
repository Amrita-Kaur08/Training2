var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d;
var _this = this;
var API_URL = "http://localhost:3000/employees";
var employees = [];
// Preloader
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        var preloader = document.getElementById("preloader");
        if (preloader)
            preloader.style.display = "none";
    }, 1500);
});
// Generate random 6-digit ID
function generateRandomID() {
    return Math.floor(100000 + Math.random() * 900000);
}
// Fetch employees
function fetchEmployees() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    employees = _a.sent();
                    renderTable();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to fetch employees", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
fetchEmployees();
// Render employee table
function renderTable() {
    var tableBody = document.getElementById("employeeTableBody");
    if (!tableBody)
        return;
    tableBody.innerHTML = employees
        .map(function (employee) { return "\n        <tr>\n          <td>".concat(employee.id, "</td>\n          <td>").concat(employee.name, "</td>\n          <td>").concat(employee.email, "</td>\n          <td>").concat(employee.address.house, ", ").concat(employee.address.street, ", ").concat(employee.address.city, "</td>\n          <td>").concat(employee.phone, "</td>\n          <td><a href=\"").concat(employee.website, "\" target=\"_blank\">").concat(employee.website, "</a></td>\n          <td>").concat(employee.company, "</td>\n          <td>").concat(employee.role, "</td>\n          <td>\n            <button class=\"edit\" data-id=\"").concat(employee.id, "\">Edit</button>\n            <button class=\"delete\" data-id=\"").concat(employee.id, "\">Delete</button>\n          </td>\n        </tr>\n      "); })
        .join("");
}
// Form validation
function validateForm(name, email, phone, address, website, company, role) {
    var nameRegex = /^[a-zA-Z\s]{3,50}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^[6-9]\d{9}$/;
    var addressParts = address.split(",").map(function (part) { return part.trim(); });
    if (!nameRegex.test(name)) {
        alert("Name must be between 3 and 50 characters and contain only letters.");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Invalid email format!");
        return false;
    }
    if (!phoneRegex.test(phone)) {
        alert("Phone number must be a valid 10-digit Indian number starting with 6-9.");
        return false;
    }
    if (addressParts.length < 3) {
        alert("Address must include House No, Street, and City separated by commas.");
        return false;
    }
    if (!website.trim()) {
        alert("Website cannot be empty.");
        return false;
    }
    if (!company.trim()) {
        alert("Company cannot be empty.");
        return false;
    }
    if (!role) {
        alert("Role must be selected.");
        return false;
    }
    return true;
}
// Add Employee
(_a = document.getElementById("addEmployeeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var id, name, email, address, phone, website, company, role, newEmployee, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                id = generateRandomID();
                name = document.getElementById("addName").value.trim();
                email = document.getElementById("addEmail").value.trim();
                address = document.getElementById("addAddress").value.trim();
                phone = document.getElementById("addPhone").value.trim();
                website = document.getElementById("addwebsite").value.trim();
                company = document.getElementById("addCompany").value.trim();
                role = document.getElementById("addRole").value;
                if (!validateForm(name, email, phone, address, website, company, role))
                    return [2 /*return*/];
                newEmployee = {
                    id: id,
                    name: name,
                    email: email,
                    address: {
                        house: address.split(",")[0].trim(),
                        street: address.split(",")[1].trim(),
                        city: address.split(",")[2].trim(),
                    },
                    phone: phone,
                    website: website,
                    company: company,
                    role: role,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch(API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newEmployee),
                    })];
            case 2:
                _a.sent();
                fetchEmployees();
                closeModal("addEditEmployeeModal");
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error adding employee", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete Employee
(_b = document.getElementById("employeeTableBody")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var target, id, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = event.target;
                if (!target.classList.contains("delete"))
                    return [2 /*return*/];
                id = target.getAttribute("data-id");
                if (!id || !confirm("Are you sure you want to delete this employee?"))
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(id), { method: "DELETE" })];
            case 2:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to delete employee!");
                fetchEmployees();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error deleting employee:", error_3);
                alert("Failed to delete employee! Please try again.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Edit Employee
(_c = document.getElementById("editEmployeeModal")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (event) {
    var target = event.target;
    if (!target.classList.contains("edit"))
        return;
    var id = target.getAttribute("data-id");
    var employee = employees.find(function (emp) { return emp.id.toString() === id; });
    if (!employee)
        return;
    document.getElementById("editId").value = employee.id.toString();
    document.getElementById("editName").value = employee.name;
    document.getElementById("editEmail").value = employee.email;
    document.getElementById("editAddress").value = "".concat(employee.address.house, ", ").concat(employee.address.street, ", ").concat(employee.address.city);
    document.getElementById("editPhone").value = employee.phone;
    document.getElementById("editWebsite").value = employee.website;
    document.getElementById("editCompany").value = employee.company;
    document.getElementById("editRole").value = employee.role;
    openModal("editEmployeeModal");
});
// Update Employee
(_d = document.getElementById("editEmployeeForm")) === null || _d === void 0 ? void 0 : _d.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var id, name, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                id = document.getElementById("editId").value.trim();
                name = document.getElementById("editName").value.trim();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(id), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: name }),
                    })];
            case 2:
                _a.sent();
                fetchEmployees();
                closeModal("editEmployeeModal");
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error updating employee:", error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Modal control functions
function openModal(id) {
    var _a;
    (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.classList.add("show");
}
function closeModal(id) {
    var _a;
    (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.classList.remove("show");
}
