
const data = {
    students: 0,
    parents: 0,
    vips: 0
};
//Variable - exporting
var button = document.getElementById('export');
//Variables - ID
var st_int = document.getElementById('st_int');
var pr_int = document.getElementById('pr_int');
var vp_int = document.getElementById('vp_int');

function updateUI() {
    document.getElementById("student-value").textContent = data.students;
    document.getElementById("parent-value").textContent = data.parents;
    document.getElementById("vip-value").textContent = data.vips;
}
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