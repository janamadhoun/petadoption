function displayTime(){
    const now = new Date();
    const currTime = now.toLocaleString();
    document.querySelector('#datetime').textContent = currTime;
    setInterval(displayTime, 1000);

}
window.onload = function() {
    displayTime();
    setInterval(displayTime, 1000);
};
