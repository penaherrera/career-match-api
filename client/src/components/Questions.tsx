'use client';

import { useEffect, useState } from 'react';

interface Answer {
  id: number;
  careerId: number;
  questionId: number;
  content: string;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export default function QuestionsComponent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [careerMatches, setCareerMatches] = useState<Record<number, number>>({});


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch questions
        const response = await fetch('http://localhost:3000/api/v1/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };



  const calculateCareerMatches = () => {
    // Count answers per career
    const careerCounts: Record<number, number> = {};
    const totalQuestions = questions.length;

    // Go through each selected answer
    Object.entries(selectedAnswers).forEach(([questionId, answerId]) => {
      // Find the question and selected answer
      const question = questions.find(q => q.id === parseInt(questionId));
      const selectedAnswer = question?.answers.find(a => a.id === answerId);
      
      if (selectedAnswer) {
        // Count answers for each career
        careerCounts[selectedAnswer.careerId] = (careerCounts[selectedAnswer.careerId] || 0) + 1;
      }
    });

    // Calculate percentage for each career
    const matches: Record<number, number> = {};
    Object.entries(careerCounts).forEach(([careerId, count]) => {
      matches[parseInt(careerId)] = Math.round((count / totalQuestions) * 100);
    });

    return matches;
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredQuestions = questions.filter(q => !selectedAnswers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions. You have ${unansweredQuestions.length} questions remaining.`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Using a hardcoded user ID for testing
      const userIdNum = 1; // Assuming user ID 1 exists in the database
      
      // Calculate career matches before submitting
      const matches = calculateCareerMatches();
      setCareerMatches(matches);
      
      console.log('Career matches:', matches);
      console.log('Selected answers:', selectedAnswers);

      // Submit each answer individually
      for (const answerId of Object.values(selectedAnswers)) {
        const response = await fetch('http://localhost:3000/api/v1/user-answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userIdNum,
            answerId: parseInt(answerId.toString())
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error submitting answer:', errorData);
          throw new Error(`Failed to submit answer: ${errorData.message || response.statusText}`);
        }
      }
      
      // Show results instead of redirecting
      setShowResults(true);
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error submitting answers: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-gray-400">No questions available.</div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Your Career Matches</h1>
          <div className="space-y-4">
            {Object.entries(careerMatches)
              .sort(([, a], [, b]) => (b as number) - (a as number)) // Sort by percentage descending
              .map(([careerId, percentage]) => (
                <div key={careerId} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-medium text-white">Career {careerId}</h2>
                    <span className="text-blue-400 font-semibold">{percentage}% Match</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="mt-8 w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }



  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Career Match Test</h1>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <div className="text-sm text-gray-500">
              Progress: {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-700">{currentQuestion.text}</p>
        
          <div className="space-y-4">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                className={`w-full text-left p-4 rounded-lg border transition-colors text-white ${
                  selectedAnswers[currentQuestion.id] === answer.id
                    ? 'bg-blue-600 border-blue-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {answer.content}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg ${currentQuestionIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion.id]}
                className={`px-4 py-2 rounded-lg ${!selectedAnswers[currentQuestion.id] ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
