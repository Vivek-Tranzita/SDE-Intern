// pelindrome

const pelindrome=(word:string):string =>{
    return word.split("").reverse().join("");
}


const s=pelindrome("vivek");
console.log(s)