function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("open");
}

function setActive(element) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
}
