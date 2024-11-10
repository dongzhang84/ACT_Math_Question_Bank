// Define the number of problems to select for each category
const selectionCounts = {
    15: {
      "Number & Quantity": 3,
      "Algebra": 3,
      "Functions": 3,
      "Geometry": 3,
      "Statistics & Probability": 3,
      },
    30: {
      "Number & Quantity": 6,
      "Algebra": 6,
      "Functions": 6,
      "Geometry": 6,
      "Statistics & Probability": 6,
    }
};

// Add function to get quiz length
function getQuizLength() {
  const quizLength = sessionStorage.getItem('quizLength');
  if (!quizLength) {
      console.log('Quiz length not set yet.');
      return null; // Or some default behavior
  }
  console.log('Quiz length from sessionStorage:', quizLength);
  return parseInt(quizLength);
}


// Function to get multiple random items from an array
function getRandomItems(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// CHANGED: Updated generateProblemList function
function generateProblemList(topicCategories) {
  const quizLength = getQuizLength();
  console.log('Quiz length in generateProblemList:', quizLength);
  const currentSelectionCounts = selectionCounts[quizLength];
  let allSelectedProblems = [];
  for (const [category, problems] of Object.entries(topicCategories)) {
      const counts = currentSelectionCounts[category];
      const selectedProblems = getRandomItems(problems, counts);
      allSelectedProblems = allSelectedProblems.concat(selectedProblems);
  }
  return shuffleArray(allSelectedProblems);
}


// NEW FUNCTION: Generate problem list for a specific topic
function generateProblemList_topic(topicCategories) {
  const quizLength = getQuizLength();  // Get quiz length from sessionStorage
  const selectedTopic = sessionStorage.getItem('selectedTopic');  // Get selected topic from sessionStorage
  
  console.log('Quiz length in generateProblemList:', quizLength, 'Selected Topic:', selectedTopic);

  // Ensure the selected topic exists in the categories
  if (!selectedTopic || !topicCategories[selectedTopic]) {
      console.error('Selected topic is invalid or not found in topicCategories');
      return [];
  }
  // Get the problems for the selected topic
  const problems = topicCategories[selectedTopic];
  const selectedProblems = getRandomItems(problems, quizLength);  // Randomly select problems based on quiz length
  
  return shuffleArray(selectedProblems);  // Return the shuffled selected problems
}

// Function to get the correct path to prob_categories.json
// function getJsonPath() {
//   return window.location.pathname.includes('/problems/') ? '../prob_categories.json' : 'prob_categories.json';
// }
function getJsonPath() {
  const path = window.location.pathname;
  return (path.includes('/problems/') || path.includes('/practice/')  || path.includes('/solutions/')) 
    ? '../prob_categories.json' 
    : 'prob_categories.json';
}


// Function to get the correct path to prob_categories.json
function fetchAndGenerateProblemList() {
  // Check if ProblemList already exists in sessionStorage
  const storedProblemList = sessionStorage.getItem('ProblemList');
  if (storedProblemList) {
    window.ProblemList = JSON.parse(storedProblemList);
    console.log('ProblemList retrieved from session storage:', window.ProblemList);
    return Promise.resolve(window.ProblemList);
  }

  const jsonPath = getJsonPath();
  // return fetch(jsonPath)
  //   .then(response => response.json())
  //   .then(topicCategories => {
  //     window.ProblemList = generateProblemList(topicCategories);
  //     // Store ProblemList in sessionStorage
  //     sessionStorage.setItem('ProblemList', JSON.stringify(window.ProblemList));
  //     console.log('ProblemList generated and stored:', window.ProblemList);
  //     return window.ProblemList;
  //   })
  //   .catch(error => {
  //     console.error(`Error loading or parsing ${jsonPath}:`, error);
  //     window.ProblemList = [];
  //     return window.ProblemList;
  //   });
  return fetch(jsonPath)
  .then(response => response.json())
  .then(topicCategories => {
      // Check if quizLength is set
      const quizLength = getQuizLength();
      if (!quizLength) {
          console.log('Quiz length not set, delaying ProblemList generation.');
          return [];  // Return an empty array or handle as needed
      }

      // If quizLength is set, generate the problem list
      window.ProblemList = generateProblemList(topicCategories);
      
      // Store ProblemList in sessionStorage
      sessionStorage.setItem('ProblemList', JSON.stringify(window.ProblemList));
      console.log('ProblemList generated and stored:', window.ProblemList);
      return window.ProblemList;
  })
  .catch(error => {
      console.error(`Error loading or parsing ${jsonPath}:`, error);
      window.ProblemList = [];
      return window.ProblemList;
  });

}


function fetchAndGenerateProblemList_topic() {
  // Check if ProblemList already exists in sessionStorage
  const storedProblemList = sessionStorage.getItem('ProblemList_topic');
  if (storedProblemList) {
    window.ProblemList = JSON.parse(storedProblemList);
    console.log('ProblemList retrieved from session storage (topic):', window.ProblemList);
    return Promise.resolve(window.ProblemList);
  }
  
  const jsonPath = getJsonPath();
  
  return fetch(jsonPath)
  .then(response => response.json())
  .then(topicCategories => {
      // Check if quizLength is set
      const quizLength = getQuizLength();
      if (!quizLength) {
          console.log('Quiz length not set, delaying ProblemList generation.');
          return [];  // Return an empty array or handle as needed
      }
  
      // If quizLength is set, generate the problem list for the selected topic
      window.ProblemList = generateProblemList_topic(topicCategories);
  
      // Store ProblemList in sessionStorage
      sessionStorage.setItem('ProblemList_topic', JSON.stringify(window.ProblemList));
      console.log('ProblemList (topic) generated and stored:', window.ProblemList);
      return window.ProblemList;
    })
    .catch(error => {
      console.error(`Error loading or parsing ${jsonPath}:`, error);
      window.ProblemList = [];
      return window.ProblemList;
    });
  }
  
  // Function to get the current ProblemList or generate a new one if it doesn't exist
  function getProblemList() {
    if (window.ProblemList && window.ProblemList.length > 0) {
      return Promise.resolve(window.ProblemList);
    } else {
      return fetchAndGenerateProblemList();
    }
  }

// Function to get the current ProblemList or generate a new one if it doesn't exist
function getProblemList() {
  if (window.ProblemList && window.ProblemList.length > 0) {
    return Promise.resolve(window.ProblemList);
  } else {
    return fetchAndGenerateProblemList();
  }
}


// NEW FUNCTION: Get the current problem list for a topic or generate a new one if it doesn't exist
function getProblemList_topic() {
  if (window.ProblemList && window.ProblemList.length > 0) {
    return Promise.resolve(window.ProblemList);
  } else {
    return fetchAndGenerateProblemList_topic();
  }
}

// Function to get the next problem number
function getNextProblemNumber() {
  return getProblemList().then(problemList => {
    const currentIndex = parseInt(sessionStorage.getItem('currentQuestionIndex') || '0');
    if (currentIndex < problemList.length) {
      const nextProblem = problemList[currentIndex];
      sessionStorage.setItem('currentQuestionIndex', (currentIndex + 1).toString());
      return nextProblem;
    } else {
      // Quiz is finished
      return null;
    }
  });
}


function loadNextQuestion() {

  // Check if this is a topic-specific quiz
  const selectedTopic = sessionStorage.getItem('selectedTopic');

  console.log('Selected Topic:', selectedTopic);
  
  let problemListPromise;
  if (selectedTopic) {
      // If a topic is selected, use the topic-specific problem list
      problemListPromise = getProblemList_topic();
  } else {
      // Otherwise, use the general problem list
      problemListPromise = getProblemList();
  }

  problemListPromise.then(problemList => {
      let currentIndex = parseInt(localStorage.getItem('currentQuestionIndex') || '0');
      
      if (currentIndex >= problemList.length) {
          window.location.href = '../quizEnd.html';
          return;
      }
      
      let nextProblemNumber = problemList[currentIndex];
      let nextQuestionFile = `${nextProblemNumber.toString()}.html`;
      
      // Check if we're already in the problems directory
      if (window.location.href.includes('/problems/')) {
          window.location.href = nextQuestionFile;
      } else {
          window.location.href = 'problems/' + nextQuestionFile;
      }
      
      markQuestionAsSeen(nextQuestionFile);
      currentIndex++;
      localStorage.setItem('currentQuestionIndex', currentIndex.toString());
  });
}

// // Initialize ProblemList when the script loads
// getProblemList().then(() => {
//   window.dispatchEvent(new Event('ProblemListReady'));
// });


// Check if selectedTopic exists in sessionStorage
const selectedTopic = sessionStorage.getItem('selectedTopic');
console.log('Selected Topic for list retrieve:', selectedTopic);

// If selectedTopic exists, use getProblemList_topic, otherwise use getProblemList
if (selectedTopic) {
    getProblemList_topic().then(() => {
        window.dispatchEvent(new Event('ProblemListReady'));
    });
} else {
    getProblemList().then(() => {
        window.dispatchEvent(new Event('ProblemListReady'));
    });
}

// Make functions globally available
// window.getNextProblemNumber = getNextProblemNumber;

// window.resetQuiz = () => {
//   sessionStorage.removeItem('ProblemList');
//   sessionStorage.removeItem('currentQuestionIndex');
//   window.ProblemList = null;
//   return getProblemList();
// };