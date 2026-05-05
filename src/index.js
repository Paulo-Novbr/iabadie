import fs from "fs";
import natural from "natural";

const filePath = "./data/faq.json";

const faq = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const similarityModel = new natural.TfIdf();

faq.forEach((item) => {
  similarityModel.addDocument(item.question);
});

const userQuestion = "Estágio é obrigatório?";

let bestIndex = -1;
let bestScore = 0;

similarityModel.tfidfs(userQuestion, (i, measure) => {
  console.log("i: ", i);
  console.log("measure: ", measure);
  console.log("- - - - -");
  if (measure > bestScore) {
    bestScore = measure;
    bestIndex = i;
  }
});

const bestAnswer = faq[bestIndex].answer;

console.log("Pergunta: ", userQuestion);
console.log("Resposta: ", bestAnswer);
console.log("Score: ", bestScore);
