//Variables , I was originally adding them at the bottom no a good idea lol ,
const data = {
    students: 0,
    parents: 0,
    vips: 0
};

// Format current date and time in the event this will be used in the future
function formatDate() {
    const now = new Date();
    return now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hour12: false
    }).replace(/\//g, '-').replace(/:\d{2}:\d{2}/, 'HH');
}

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem("graduationData");
    if (saved) {
        const parsed = JSON.parse(saved);
        data.students = parsed.students || 0;
        data.parents = parsed.parents || 0;
        data.vips = parsed.vips || 0;
    }
    updateUI();
}

// Save data to localStorage cuz I dont want to have a server running yet , so all the data will be saved on the owners device and they can simple share the file later ..
// Or I can come up with a way to sync all the devices on a local network
function saveData() {
    localStorage.setItem("graduationData", JSON.stringify(data));
}

// Update UI with current values
function updateUI() {
    document.getElementById("student-value").textContent = data.students;
    document.getElementById("parent-value").textContent = data.parents;
    document.getElementById("vip-value").textContent = data.vips;
}

// Export to CSV (with timestamp)
//There is something wrong with the timestamp ... no idea where
function exportToCSV() {
    const csvContent = [
        "Category,Value,Last Updated",
        `Students,${data.students},${formatDate()}`,
        `Parents,${data.parents},${formatDate()}`,
        `VIPs,${data.vips},${formatDate()}`
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "graduation_data_temp.csv";
    a.click();
    URL.revokeObjectURL(url);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    loadData(); // Load from localStorage

    // Buttons
    document.getElementById("plus-student").addEventListener("click", () => {
        data.students++;
        saveData();
        updateUI();
    });

    document.getElementById("minus-student").addEventListener("click", () => {
        if (data.students > 0) data.students--;
        saveData();
        updateUI();
    });

    document.getElementById("plus-parent").addEventListener("click", () => {
        data.parents++;
        saveData();
        updateUI();
    });

    document.getElementById("minus-parent").addEventListener("click", () => {
        if (data.parents > 0) data.parents--;
        saveData();
        updateUI();
    });

    document.getElementById("plus-vip").addEventListener("click", () => {
        data.vips++;
        saveData();
        updateUI();
    });

    document.getElementById("minus-vip").addEventListener("click", () => {
        if (data.vips > 0) data.vips--;
        saveData();
        updateUI();
    });

    document.getElementById("export-csv").addEventListener("click", exportToCSV);
});

