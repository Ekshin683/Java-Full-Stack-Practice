function greet(){
    setTimeout(() => {
        console.log("Hello");
    },2000)
}

console.log("Start");
greet();
console.log("End");