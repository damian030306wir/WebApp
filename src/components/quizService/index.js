const qBank = [

    {
        question: "Ile pomnik ma lat?",
        answers: ["100", "200", "300", "400"],
        correct: "100",
        id: 1,

    },
    {
        question: "Jak test jest",
        answers: ["Mikołaj", "Tomasz", "Arek", "Bartosz"],
        correct: "Mikołaj",
        id: 2,

    },
    {
        question: "Jaką testowea",
        answers: ["test", "fajna", "smutną", "głupią"],
        correct: "test",
        id: 3,

    },
    {
        question: "testowe pytanie2",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 4,

    },
    {
        question: "testowe pytanie3",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 5,

    },
    {
        question: "testowe pytanie4",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 6,
    },
    {
        question: "testowe pytanie5",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 7,
    },
    {
        question: "testowe pytanie6",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 8,
    },

];

export default (n = 5) =>
Promise.resolve(qBank.sort(() => 0.5 - Math.random()).slice(0, n));