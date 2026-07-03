let count = 0;
const button = document.getElementById("increaseCount");

button.addEventListener("click", increment);
function increment(){
    count++;
    const countHeading = document.getElementById('Count');
    countHeading.innerText = count;
}