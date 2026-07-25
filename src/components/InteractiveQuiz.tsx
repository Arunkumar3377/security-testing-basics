import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/securityData';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface QuizProps {
  onScoreSave: (score: number) => void;
}

export const InteractiveQuiz: React.FC<QuizProps> = ({ onScoreSave }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onScoreSave(score);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <section id="quiz" className="py-16 sm:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Security Basics Quiz
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Test your knowledge with 10 multiple-choice questions on cybersecurity standards
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-widest hidden sm:inline-block">
            Course Module 08
          </span>
        </div>

        {/* Quiz Main Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl space-y-6">
          
          {!isSubmitted ? (
            /* Quiz Active Taking View */
            <div className="space-y-6">
              
              {/* Quiz Progress Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-blue-400 font-bold">
                    Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-slate-600">|</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-white/5">
                    Topic: {currentQ.topic}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400">
                  {answeredCount} / {QUIZ_QUESTIONS.length} Answered
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-blue-500 transition-all duration-300 shadow-md shadow-blue-500/50"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/10 border-blue-500 text-white font-medium shadow-md shadow-blue-950/50'
                          : 'bg-slate-950 border-white/5 text-slate-300 hover:border-white/20 hover:text-white'
                      }`}
                      id={`quiz-option-${currentQ.id}-${optIdx}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center border ${
                          isSelected ? 'bg-blue-600 text-white font-bold border-blue-400' : 'bg-slate-900 text-slate-400 border-white/5'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quiz Footer Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-white/5 text-xs font-medium text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer"
                >
                  Previous
                </button>

                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/30"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-900/40 cursor-pointer"
                    id="submit-quiz-btn"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Quiz Score & Breakdown View */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Score Header Banner */}
              <div className="text-center p-6 rounded-2xl bg-slate-950 border border-white/5 space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
                <p className="text-4xl font-black text-blue-400 font-mono">
                  {calculateScore()} / {QUIZ_QUESTIONS.length}
                </p>
                <p className="text-xs text-slate-400">
                  {calculateScore() >= 8
                    ? 'Excellent work! You have a solid grasp of security testing basics.'
                    : calculateScore() >= 5
                    ? 'Good job! Review the explanations below to reinforce your knowledge.'
                    : 'Keep learning! Review the core security sections and retake the quiz.'}
                </p>

                <button
                  onClick={handleRestart}
                  className="mt-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/30"
                  id="retake-quiz-btn"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Answers & Explanations List */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Answer Breakdown & Explanations
                </h4>

                <div className="space-y-4">
                  {QUIZ_QUESTIONS.map((q, idx) => {
                    const userChoice = userAnswers[q.id];
                    const isCorrect = userChoice === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border space-y-3 ${
                          isCorrect
                            ? 'bg-slate-950 border-emerald-500/30'
                            : 'bg-slate-950 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h5 className="text-sm font-bold text-white flex items-start gap-2">
                            <span>{idx + 1}.</span>
                            <span>{q.question}</span>
                          </h5>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 shrink-0">
                              <CheckCircle2 className="w-4 h-4" /> Correct
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-mono font-bold text-red-400 shrink-0">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>

                        <div className="text-xs space-y-1 font-mono">
                          <p className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                            Your Answer: {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-400 font-bold">
                              Correct Answer: {q.options[q.correctIndex]}
                            </p>
                          )}
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300 leading-relaxed">
                          <span className="text-blue-400 font-bold">Explanation: </span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
