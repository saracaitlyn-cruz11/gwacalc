const subjects = ["Biology", "Chemistry", "Physics", "Math", "English", "Filipino", "Social Science", "PEHM", "Statistics", "Computer Science"];
const gradeOptions = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 4.0, 5.0];

const ranges = [
    { min: 1.000, max: 1.125, val: "1.00" },
    { min: 1.126, max: 1.375, val: "1.25" },
    { min: 1.376, max: 1.625, val: "1.50" },
    { min: 1.626, max: 1.875, val: "1.75" },
    { min: 1.876, max: 2.125, val: "2.00" },
    { min: 2.126, max: 2.375, val: "2.25" },
    { min: 2.376, max: 2.625, val: "2.50" },
    { min: 2.626, max: 2.875, val: "2.75" },
    { min: 2.876, max: 3.500, val: "3.00" },
    { min: 3.501, max: 4.500, val: "4.00" },
    { min: 4.501, max: 5.000, val: "5.00" }
];

const subjectTbody = document.getElementById('subjectRows');
const prevDropdown = document.getElementById('prevGrade');
const currDropdown = document.getElementById('currGrade');

subjects.forEach(name => {
    let row = `<tr>
        <td>${name}</td>
        <td><select class="fancy-select gwa-input">
            ${gradeOptions.map(g => `<option value="${g}">${g.toFixed(2)}</option>`).join('')}
        </select></td>
    </tr>`;
    subjectTbody.innerHTML += row;
});

gradeOptions.forEach(g => {
    prevDropdown.add(new Option(g.toFixed(2), g));
    currDropdown.add(new Option(g.toFixed(2), g));
});

function updateSystem() {
    // how to calculate the gwa
    let sum = 0;
    const allInputs = document.querySelectorAll('.gwa-input');
    allInputs.forEach(i => sum += parseFloat(i.value));
    document.getElementById('gwaDisplay').innerText = (sum / subjects.length).toFixed(3);

    // how to convert the grades
    const average = (parseFloat(prevDropdown.value) + parseFloat(currDropdown.value)) / 2;
    let match = ranges.find(r => average >= r.min && average <= r.max);
    document.getElementById('equivDisplay').innerText = match ? match.val : "--";
}

document.addEventListener('change', updateSystem);
updateSystem(); 