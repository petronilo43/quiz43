"use client";
import { RESPOSTAS_CORRETAS } from '@/constants/answers';
import { useEffect, useState } from "react";
import {
  Brain,
  Globe,
  Clock,
  Trophy,
  RotateCcw,
  CreditCard,
  Lock,
  CheckCircle,
  Share
} from "lucide-react";

/* ----------------------------------------------------------------------------
   Componentes básicos (Tailwind puros) para substituir shadcn/ui
---------------------------------------------------------------------------- */
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Button
function Button({ variant = "default", size = "md", className, disabled, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };
  const variants = {
    default:
      "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
    outline:
      "border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-inherit",
    secondary:
      "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-inherit",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      className={cx(base, sizes[size], variants[variant], className)}
      disabled={disabled}
      {...props}
    />
  );
}

// Card
function Card({ className, ...props }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
function CardHeader({ className, ...props }) {
  return <div className={cx("p-6", className)} {...props} />;
}
function CardContent({ className, ...props }) {
  return <div className={cx("p-6 pt-0 space-y-4", className)} {...props} />;
}
function CardTitle({ className, ...props }) {
  return (
    <h2
      className={cx(
        "text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100",
        className
      )}
      {...props}
    />
  );
}

// Progress
function Progress({ value, className }) {
  return (
    <div
      className={cx(
        "w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-neutral-900 dark:bg-neutral-100"
        style={{ width: `${Math.max(0, Math.min(100, value || 0))}%` }}
      />
    </div>
  );
}

// Badge
function Badge({ variant = "default", className, ...props }) {
  const variants = {
    default:
      "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary:
      "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-white",
    destructive: "bg-red-600 text-white",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// Input
function Input({ className, ...props }) {
  return (
    <input
      className={cx(
        "w-full h-10 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700",
        className
      )}
      {...props}
    />
  );
}

// Label
function Label({ className, ...props }) {
  return (
    <label
      className={cx(
        "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1",
        className
      )}
      {...props}
    />
  );
}

/* ----------------------------------------------------------------------------
   Lógica do app
---------------------------------------------------------------------------- */

const questions = [
  {
    id: 1,
    question: {
      pt: "Qual número vem a seguir na sequência: 2, 4, 8, 16, ?",
      en: "What number comes next in the sequence: 2, 4, 8, 16, ?",
    },
    options: { pt: ["24", "32", "20", "28"], en: ["24", "32", "20", "28"] },
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 2,
    question: {
      pt: "Se todos os gatos são animais e alguns animais são selvagens, então:",
      en: "If all cats are animals and some animals are wild, then:",
    },
    options: {
      pt: [
        "Todos os gatos são selvagens",
        "Alguns gatos podem ser selvagens",
        "Nenhum gato é selvagem",
        "Todos os animais são gatos",
      ],
      en: [
        "All cats are wild",
        "Some cats may be wild",
        "No cats are wild",
        "All animals are cats",
      ],
    },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 3,
    question: {
      pt: "Qual palavra não pertence ao grupo: Maçã, Banana, Cenoura, Laranja?",
      en: "Which word doesn't belong: Apple, Banana, Carrot, Orange?",
    },
    options: {
      pt: ["Maçã", "Banana", "Cenoura", "Laranja"],
      en: ["Apple", "Banana", "Carrot", "Orange"],
    },
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 4,
    question: {
      pt: "Se A = 1, B = 2, C = 3... qual é o valor de CASA?",
      en: "If A = 1, B = 2, C = 3... what is the value of HOME?",
    },
    options: { pt: ["30", "33", "36", "39"], en: ["52", "47", "43", "38"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 5,
    question: {
      pt: "Complete a analogia: Livro está para Ler assim como Comida está para:",
      en: "Complete the analogy: Book is to Read as Food is to:",
    },
    options: { pt: ["Cozinhar", "Comer", "Comprar", "Guardar"], en: ["Cook", "Eat", "Buy", "Store"] },
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 6,
    question: {
      pt: "Qual é o próximo número: 1, 1, 2, 3, 5, 8, ?",
      en: "What is the next number: 1, 1, 2, 3, 5, 8, ?",
    },
    options: { pt: ["11", "13", "15", "10"], en: ["11", "13", "15", "10"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 7,
    question: {
      pt: "Se você reorganizar as letras de OUVIR, você obtém o nome de:",
      en: "If you rearrange the letters of LISTEN, you get the name of:",
    },
    options: {
      pt: ["Um animal", "Uma cor", "Um órgão do corpo", "Uma ação"],
      en: ["An animal", "A color", "A body part", "An action"],
    },
    correct: 2,
    difficulty: "hard",
  },
  {
    id: 8,
    question: {
      pt: "Quantos triângulos você pode ver nesta figura? ▲▲▲",
      en: "How many triangles can you see in this figure? ▲▲▲",
    },
    options: { pt: ["3", "4", "5", "6"], en: ["3", "4", "5", "6"] },
    correct: 0,
    difficulty: "easy",
  },
  {
    id: 9,
    question: {
      pt: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas são necessárias para fazer 100 produtos em 100 minutos?",
      en: "If 5 machines make 5 products in 5 minutes, how many machines are needed to make 100 products in 100 minutes?",
    },
    options: { pt: ["5", "20", "25", "100"], en: ["5", "20", "25", "100"] },
    correct: 0,
    difficulty: "hard",
  },
  {
    id: 10,
    question: {
      pt: "Qual número está faltando: 2, 6, 12, 20, 30, ?",
      en: "What number is missing: 2, 6, 12, 20, 30, ?",
    },
    options: { pt: ["40", "42", "44", "46"], en: ["40", "42", "44", "46"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 11,
    question: {
      pt: "Complete: Água está para Gelo assim como Vapor está para:",
      en: "Complete: Water is to Ice as Steam is to:",
    },
    options: { pt: ["Nuvem", "Chuva", "Frio", "Calor"], en: ["Cloud", "Rain", "Cold", "Heat"] },
    correct: 0,
    difficulty: "medium",
  },
  {
    id: 12,
    question: {
      pt: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
      en: "If today is Tuesday, what day will it be in 100 days?",
    },
    options: { pt: ["Segunda", "Terça", "Quarta", "Quinta"], en: ["Monday", "Tuesday", "Wednesday", "Thursday"] },
    correct: 3,
    difficulty: "hard",
  },
  {
    id: 13,
    question: {
      pt: "Qual é o oposto de 'sempre'?",
      en: "What is the opposite of 'always'?",
    },
    options: { pt: ["Às vezes", "Nunca", "Raramente", "Frequentemente"], en: ["Sometimes", "Never", "Rarely", "Often"] },
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 14,
    question: {
      pt: "Se A > B e B > C, então:",
      en: "If A > B and B > C, then:",
    },
    options: {
      pt: ["A = C", "A < C", "A > C", "Não é possível determinar"],
      en: ["A = C", "A < C", "A > C", "Cannot be determined"],
    },
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 15,
    question: {
      pt: "Quantos cubos pequenos formam um cubo 3x3x3?",
      en: "How many small cubes make up a 3x3x3 cube?",
    },
    options: { pt: ["9", "18", "27", "36"], en: ["9", "18", "27", "36"] },
    correct: 2,
    difficulty: "medium",
  },
  {
    id: 16,
    question: {
      pt: "Complete a sequência: Z, Y, X, W, ?",
      en: "Complete the sequence: Z, Y, X, W, ?",
    },
    options: { pt: ["V", "U", "T", "S"], en: ["V", "U", "T", "S"] },
    correct: 0,
    difficulty: "easy",
  },
  {
    id: 17,
    question: {
      pt: "Se você tem 6 maçãs e come 2, quantas você tem?",
      en: "If you have 6 apples and eat 2, how many do you have?",
    },
    options: { pt: ["4", "2", "6", "8"], en: ["4", "2", "6", "8"] },
    correct: 0,
    difficulty: "easy",
  },
  {
    id: 18,
    question: {
      pt: "Qual padrão segue: 1, 4, 9, 16, 25, ?",
      en: "What pattern follows: 1, 4, 9, 16, 25, ?",
    },
    options: { pt: ["30", "35", "36", "49"], en: ["30", "35", "36", "49"] },
    correct: 2,
    difficulty: "medium",
  },
  {
    id: 19,
    question: {
      pt: "Se GATO = 4 letras, CACHORRO = 8 letras, então ELEFANTE = ?",
      en: "If CAT = 3 letters, DOG = 3 letters, then ELEPHANT = ?",
    },
    options: { pt: ["6", "7", "8", "9"], en: ["6", "7", "8", "9"] },
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 20,
    question: {
      pt: "Complete: 2, 3, 5, 7, 11, ?",
      en: "Complete: 2, 3, 5, 7, 11, ?",
    },
    options: { pt: ["12", "13", "14", "15"], en: ["12", "13", "14", "15"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 21,
    question: {
      pt: "Se um trem viaja 60 km em 1 hora, quantos km viaja em 90 minutos?",
      en: "If a train travels 60 km in 1 hour, how many km does it travel in 90 minutes?",
    },
    options: { pt: ["80", "90", "100", "120"], en: ["80", "90", "100", "120"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 22,
    question: {
      pt: "Qual forma geométrica tem 3 lados?",
      en: "Which geometric shape has 3 sides?",
    },
    options: { pt: ["Quadrado", "Triângulo", "Círculo", "Retângulo"], en: ["Square", "Triangle", "Circle", "Rectangle"] },
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 23,
    question: {
      pt: "Se você dobrar um papel 3 vezes, quantas seções terá?",
      en: "If you fold a paper 3 times, how many sections will you have?",
    },
    options: { pt: ["6", "8", "9", "12"], en: ["6", "8", "9", "12"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 24,
    question: {
      pt: "Complete a analogia: Dia está para Sol assim como Noite está para:",
      en: "Complete the analogy: Day is to Sun as Night is to:",
    },
    options: { pt: ["Estrelas", "Lua", "Escuridão", "Sono"], en: ["Stars", "Moon", "Darkness", "Sleep"] },
    correct: 1,
    difficulty: "easy",
  },
  {
    id: 25,
    question: {
      pt: "Qual número não pertence: 2, 4, 6, 9, 8?",
      en: "Which number doesn't belong: 2, 4, 6, 9, 8?",
    },
    options: { pt: ["2", "4", "9", "8"], en: ["2", "4", "9", "8"] },
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 26,
    question: {
      pt: "Se A = 5, B = 10, C = 15, qual é o padrão para D?",
      en: "If A = 5, B = 10, C = 15, what is the pattern for D?",
    },
    options: { pt: ["18", "20", "25", "30"], en: ["18", "20", "25", "30"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 27,
    question: {
      pt: "Quantos minutos há em 2,5 horas?",
      en: "How many minutes are in 2.5 hours?",
    },
    options: { pt: ["120", "130", "140", "150"], en: ["120", "130", "140", "150"] },
    correct: 3,
    difficulty: "medium",
  },
  {
    id: 28,
    question: {
      pt: "Se você tem 12 bolas e perde 1/3, quantas restam?",
      en: "If you have 12 balls and lose 1/3, how many remain?",
    },
    options: { pt: ["4", "6", "8", "9"], en: ["4", "6", "8", "9"] },
    correct: 2,
    difficulty: "medium",
  },
  {
    id: 29,
    question: {
      pt: "Complete: 100, 81, 64, 49, ?",
      en: "Complete: 100, 81, 64, 49, ?",
    },
    options: { pt: ["36", "35", "30", "25"], en: ["36", "35", "30", "25"] },
    correct: 0,
    difficulty: "hard",
  },
  {
    id: 30,
    question: {
      pt: "Se AMOR tem 4 letras e PAIXÃO tem 6, quantas tem FELICIDADE?",
      en: "If LOVE has 4 letters and PASSION has 7, how many does HAPPINESS have?",
    },
    options: { pt: ["8", "9", "10", "11"], en: ["8", "9", "10", "11"] },
    correct: 2,
    difficulty: "easy",
  },
  {
    id: 31,
    question: {
      pt: "Qual é o resultado de 15% de 200?",
      en: "What is 15% of 200?",
    },
    options: { pt: ["25", "30", "35", "40"], en: ["25", "30", "35", "40"] },
    correct: 1,
    difficulty: "medium",
  },
  {
    id: 32,
    question: {
      pt: "Se você começar com 1000 e subtrair 10% três vezes consecutivas, qual será o resultado final?",
      en: "If you start with 1000 and subtract 10% three consecutive times, what will be the final result?",
    },
    options: { pt: ["700", "729", "750", "810"], en: ["700", "729", "750", "810"] },
    correct: 1,
    difficulty: "hard",
  },
];

const translations = {
  pt: {
    title: "Teste de QI",
    subtitle: "32 perguntas para avaliar sua inteligência",
    startTest: "Iniciar Teste",
    question: "Pergunta",
    of: "de",
    next: "Próxima",
    previous: "Anterior",
    finish: "Finalizar",
    results: "Resultados",
    yourScore: "Sua Pontuação",
    outOf: "de",
    iqEstimate: "QI Estimado",
    performance: "Desempenho",
    excellent: "Excelente",
    good: "Bom",
    average: "Médio",
    belowAverage: "Abaixo da Média",
    timeSpent: "Tempo Gasto",
    minutes: "minutos",
    restartTest: "Refazer Teste",
    selectLanguage: "Selecionar Idioma",
    portuguese: "Português",
    english: "English",
    paymentTitle: "Acesso aos Resultados",
    paymentSubtitle: "Para ver seus resultados detalhados do teste de QI",
    originalPrice: "Preço original:",
    promotionalPrice: "Preço promocional hoje:",
    cardNumber: "Número do Cartão",
    expiryDate: "Data de Validade",
    cvv: "CVV",
    cardholderName: "Nome do Portador",
    payNow: "Pagar Agora",
    securePayment: "Pagamento 100% Seguro",
    processing: "Processando...",
    paymentSuccess: "Pagamento realizado com sucesso!",
    viewResults: "Ver Resultados",
  },
  en: {
    title: "IQ Test",
    subtitle: "32 questions to assess your intelligence",
    startTest: "Start Test",
    question: "Question",
    of: "of",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    results: "Results",
    yourScore: "Your Score",
    outOf: "out of",
    iqEstimate: "Estimated IQ",
    performance: "Performance",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    belowAverage: "Below Average",
    timeSpent: "Time Spent",
    minutes: "minutes",
    restartTest: "Restart Test",
    selectLanguage: "Select Language",
    portuguese: "Português",
    english: "English",
    paymentTitle: "Access to Results",
    paymentSubtitle: "To view your detailed IQ test results",
    originalPrice: "Original price:",
    promotionalPrice: "Promotional price today:",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    cardholderName: "Cardholder Name",
    payNow: "Pay Now",
    securePayment: "100% Secure Payment",
    processing: "Processing...",
    paymentSuccess: "Payment successful!",
    viewResults: "View Results",
  },
};

export default function IQTest() {
  const [language, setLanguage] = useState("pt");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(32).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [paid, setPaid] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

useEffect(() => {
  if (typeof window === "undefined") return;
  const wasPaid = localStorage.getItem("iq_paid") === "1";
  if (wasPaid) {
    try {
      const saved = localStorage.getItem("iq_answers");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 32) setAnswers(parsed);
      }
      const s = localStorage.getItem("iq_start");
      const e = localStorage.getItem("iq_end");
      if (s) setStartTime(new Date(s));
      if (e) setEndTime(new Date(e));
    } catch {}
    setShowPayment(false);
    setShowResults(true);
  }
}, []);

  
  const t = translations[language];

const handleAnswer = (answerIndex) => {
  // Armazena a resposta do usuário
  const newAnswers = [...userAnswers];
  newAnswers[currentQuestion] = answerIndex;
  setUserAnswers(newAnswers);
  
  // Atualiza também o array answers existente (para compatibilidade)
  const newExistingAnswers = [...answers];
  newExistingAnswers[currentQuestion] = answerIndex;
  setAnswers(newExistingAnswers);
  
  // ✅ AGORA SÓ ARMAZENA A RESPOSTA - NÃO MUDA DE PERGUNTA AUTOMATICAMENTE
};
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    }
  };

const finishTest = () => {
  setEndTime(new Date());
  
  // ✅ CALCULA O RESULTADO FINAL AQUI
  calcularResultado(userAnswers);
  
  // Mostra o pagamento (ou resultados se quiser testar)
  setShowPayment(true);
};
const calcularResultado = (userAnswers) => {
  let acertos = 0;
  
  // Compara cada resposta com o gabarito
  userAnswers.forEach((resposta, index) => {
    if (resposta === RESPOSTAS_CORRETAS[index]) {
      acertos++;
    }
  });
  
  // Calcula o QI (escala 70-130)
  const porcentagemAcertos = (acertos / RESPOSTAS_CORRETAS.length) * 100;
  const qi = Math.round(70 + (porcentagemAcertos * 0.6));
  
  console.log("🎯 RESULTADO FINAL:", { 
    acertos: acertos, 
    total: RESPOSTAS_CORRETAS.length, 
    qi: qi, 
    porcentagem: porcentagemAcertos.toFixed(1) + "%" 
  });
  
  // Salva para usar depois do pagamento
  localStorage.setItem("iq_result", JSON.stringify({
    qi: qi,
    acertos: acertos,
    total: RESPOSTAS_CORRETAS.length,
    porcentagem: porcentagemAcertos.toFixed(1)
  }));
};
const renderResults = (resultado) => {
  if (!resultado) return null;
  
  const getIQCategory = (qi) => {
    if (qi >= 130) return { 
      label: t.excellent, 
      color: "from-purple-600 to-pink-600", 
      emoji: "🧠",
      message: language === "pt" 
        ? "Excelente! Seu QI está no nível superior." 
        : "Excellent! Your IQ is at a superior level."
    };
    if (qi >= 115) return { 
      label: t.good, 
      color: "from-green-600 to-teal-600", 
      emoji: "⭐",
      message: language === "pt" 
        ? "Muito bom! Seu QI está acima da média." 
        : "Very good! Your IQ is above average."
    };
    if (qi >= 85) return { 
      label: t.average, 
      color: "from-blue-600 to-cyan-600", 
      emoji: "📊",
      message: language === "pt" 
        ? "Bom! Seu QI está na média." 
        : "Good! Your IQ is average."
    };
    return { 
      label: t.belowAverage, 
      color: "from-orange-500 to-red-500", 
      emoji: "📈",
      message: language === "pt" 
        ? "Continue praticando para melhorar seu QI!" 
        : "Keep practicing to improve your IQ!"
    };
  };

  const category = getIQCategory(resultado.qi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-6">
          <div className="flex justify-center">
            <Trophy className="h-20 w-20 text-yellow-500" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.results}
          </CardTitle>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {language === "pt" 
              ? "Seu teste de QI foi concluído com sucesso!" 
              : "Your IQ test has been completed successfully!"
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Score Circular */}
          <div className="flex justify-center">
            <div className="relative">
              <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                <div className="w-44 h-44 rounded-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {resultado.qi}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t.iqEstimate}</span>
                </div>
              </div>
              <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}>
                {category.emoji} {category.label}
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {resultado.acertos}/{resultado.total}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                {language === "pt" ? "Acertos" : "Correct Answers"}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {resultado.porcentagem}%
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                {language === "pt" ? "Precisão" : "Accuracy"}
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>{t.performance}</span>
              <span>{resultado.porcentagem}% {language === "pt" ? "completo" : "complete"}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${resultado.porcentagem}%` }}
              ></div>
            </div>
          </div>

          {/* Tempo Gasto */}
          {startTime && endTime && (
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  {t.timeSpent}
                </span>
              </div>
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {Math.floor((endTime - startTime) / 60000)} {t.minutes}
              </div>
            </div>
          )}

          {/* Categoria de QI */}
          <div className={`bg-gradient-to-r ${category.color} text-white p-6 rounded-xl text-center`}>
            <div className="text-2xl font-bold mb-2">
              {category.emoji} {category.label}
            </div>
            <p className="text-sm opacity-90">
              {category.message}
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <Button 
              onClick={restartTest} 
              variant="outline" 
              className="flex-1"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {t.restartTest}
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
              <Share className="mr-2 h-4 w-4" />
              {language === "pt" ? "Compartilhar Resultado" : "Share Results"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

  const startTest = () => {
    setTestStarted(true);
    setStartTime(new Date());
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(32).fill(-1));
    setShowResults(false);
    setShowPayment(false);
    setPaymentSuccess(false);
    setTestStarted(false);
    setStartTime(null);
    setEndTime(null);

  };
async function goToCheckout() {
  try {
    // Salva o que precisa para mostrar o resultado quando voltar do Stripe
    localStorage.setItem("iq_answers", JSON.stringify(answers));
    if (startTime) localStorage.setItem("iq_start", startTime.toISOString());
    localStorage.setItem("iq_end", new Date().toISOString());

    // Chama a rota do servidor que cria a sessão do Stripe
    const res = await fetch("/api/checkout", { method: "POST" });

    // Garante que a resposta é JSON (evita erro 404/HTML da Vercel)
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      const text = await res.text();
      alert("Erro inesperado (resposta não-JSON):\n" + text.slice(0, 400));
      return;
    }

    const data = await res.json();
    if (!res.ok) {
      alert(data?.error || "Erro ao criar checkout.");
      return;
    }

    if (data?.url) {
      window.location.href = data.url; // redireciona para o Stripe
      return;
    }
    alert("Resposta inválida do servidor (sem URL do checkout).");
  } catch (e) {
    alert("Falha ao iniciar o pagamento: " + (e?.message || "erro desconhecido"));
  }
}
  

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) correct++;
    });
    return correct;
  };

  const calculateIQ = (score) => {
    const percentage = (score / 32) * 100;
    if (percentage >= 90) return 140 + Math.floor((percentage - 90) * 2);
    if (percentage >= 80) return 120 + Math.floor((percentage - 80) * 2);
    if (percentage >= 70) return 110 + Math.floor((percentage - 70) * 1);
    if (percentage >= 60) return 100 + Math.floor((percentage - 60) * 1);
    if (percentage >= 50) return 90 + Math.floor((percentage - 50) * 1);
    return 70 + Math.floor(percentage * 0.4);
  };

  const getPerformanceLevel = (score) => {
    const percentage = (score / 32) * 100;
    if (percentage >= 85) return t.excellent;
    if (percentage >= 70) return t.good;
    if (percentage >= 50) return t.average;
    return t.belowAverage;
  };

  const getTimeSpent = () => {
    if (startTime && endTime) {
      const diff = endTime.getTime() - startTime.getTime();
      return Math.floor(diff / 60000);
    }
    return 0;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Brain className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </CardTitle>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {t.subtitle}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-3">
              <Button
                variant={language === "pt" ? "default" : "outline"}
                onClick={() => setLanguage("pt")}
              >
                <Globe className="h-4 w-4 mr-2" />
                {t.portuguese}
              </Button>
              <Button
                variant={language === "en" ? "default" : "outline"}
                onClick={() => setLanguage("en")}
              >
                <Globe className="h-4 w-4 mr-2" />
                {t.english}
              </Button>
            </div>
            <div className="text-center">
              <Button onClick={startTest} size="lg" className="px-8">
                <Brain className="mr-2 h-5 w-5" />
                {t.startTest}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

 if (showPayment) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <CreditCard className="h-16 w-16 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-bold">{t.paymentTitle}</CardTitle>
          <p className="text-neutral-600 dark:text-neutral-400">{t.paymentSubtitle}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Preço */}
          <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-4 rounded-lg text-center">
            <div className="text-sm opacity-90 line-through">{t.originalPrice} €6,80</div>
            <div className="text-2xl font-bold">{t.promotionalPrice} €0,99</div>
          </div>

          {/* Botão pagar (Stripe Checkout) */}
          <Button onClick={goToCheckout} className="w-full px-4 py-2 rounded bg-black text-white">
            Pagar €0,99
          </Button>

          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            Pagamento processado com segurança pela Stripe (Apple Pay/Google Pay quando disponível).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== -1;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === "pt" ? "EN" : "PT"}
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
              <span>
                {t.question} {currentQuestion + 1} {t.of} {questions.length}
              </span>
              <Badge
                variant={
                  currentQ.difficulty === "easy"
                    ? "secondary"
                    : currentQ.difficulty === "medium"
                    ? "default"
                    : "destructive"
                }
              >
                {currentQ.difficulty}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question[language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options[language].map((option, index) => (
                <Button
                  key={index}
                  variant={answers[currentQuestion] === index ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4 whitespace-normal"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={previousQuestion} disabled={currentQuestion === 0}>
            {t.previous}
          </Button>

          <div className="flex gap-2">
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={finishTest}
                disabled={!isAnswered}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              >
                {t.finish}
              </Button>
            ) : (
              <Button onClick={nextQuestion} disabled={!isAnswered}>
                {t.next}
              </Button>
            )}
          </div>
        </div>

        {/* Question Grid */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
          <div className="grid grid-cols-8 gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={
                  index === currentQuestion
                    ? "default"
                    : answers[index] !== -1
                    ? "secondary"
                    : "outline"
                }
                size="sm"
                className="aspect-square p-0"
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

