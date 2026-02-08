'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the vector for Plasmodium transmission?',
    options: ['Mosquito (Anopheles)', 'Tick', 'Fly', 'Flea'],
    correct: 0,
  },
  {
    id: 2,
    question: 'Which parasite causes intestinal blockage?',
    options: ['Plasmodium', 'Ascaris lumbricoides', 'Giardia', 'Trypanosoma'],
    correct: 1,
  },
  {
    id: 3,
    question: 'What is the main symptom of hookworm infection?',
    options: ['Fever', 'Anemia', 'Seizures', 'Blindness'],
    correct: 1,
  },
  {
    id: 4,
    question: 'How long does Taenia solium take to mature?',
    options: ['1 week', '2-3 weeks', '8-12 weeks', '6 months'],
    correct: 2,
  },
  {
    id: 5,
    question: 'What is cysticercosis?',
    options: [
      'Tissue infection with tapeworm larvae',
      'Acute intestinal inflammation',
      'Blood stage infection',
      'Skin lesion formation',
    ],
    correct: 0,
  },
]

export default function QuizzesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)

  const question = QUIZ_QUESTIONS[currentQuestion]
  const isAnswered = currentQuestion in selectedAnswers
  const userAnswer = selectedAnswers[currentQuestion]
  const isCorrect = userAnswer === question.correct

  const handleSelectAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: index,
      })
      setAnswered([...answered, currentQuestion])

      if (index === question.correct) {
        setScore(score + 1)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered([])
    setSelectedAnswers({})
    setShowResults(false)
  }

  const progress = Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100)

  if (showResults) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-border/40 bg-card/40 backdrop-blur-sm px-8 py-6 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quiz Results</h1>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl text-center">
            <div className="mb-8">
              <p className="text-6xl font-bold text-primary mb-4">{percentage}%</p>
              <p className="text-2xl font-semibold text-foreground mb-2">
                {percentage >= 80
                  ? 'Excellent! 🎉'
                  : percentage >= 60
                    ? 'Good Job! 👍'
                    : 'Keep Learning 📚'}
              </p>
              <p className="text-muted-foreground">
                You got {score} out of {QUIZ_QUESTIONS.length} questions correct.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <Card
                  key={q.id}
                  className="p-4 border border-border/40 bg-card/50 text-left flex items-center gap-4"
                >
                  {selectedAnswers[idx] === q.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{q.question}</p>
                    <p className="text-xs text-muted-foreground">
                      Your answer: {q.options[selectedAnswers[idx]]}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Dashboard
                </Button>
              </Link>
              <Button onClick={handleRestart} className="flex-1">
                Retake Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/40 backdrop-blur-sm px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Parasite Biology Quiz</h1>
            <p className="text-muted-foreground text-sm mt-1">Test your knowledge</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <Card className="p-8 border border-border/40 bg-gradient-to-br from-card to-card/50 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  variant="outline"
                  className={`w-full justify-start h-auto p-4 text-left transition ${
                    isAnswered && index === question.correct
                      ? 'bg-green-500/20 border-green-500/50 text-foreground'
                      : isAnswered && index === userAnswer && !isCorrect
                        ? 'bg-destructive/20 border-destructive/50 text-foreground'
                        : ''
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Feedback */}
          {isAnswered && (
            <Card className={`p-4 mb-8 border ${isCorrect ? 'bg-green-500/10 border-green-500/50' : 'bg-destructive/10 border-destructive/50'}`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-destructive'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isCorrect
                      ? 'Great job! You got this one right.'
                      : `The correct answer is: ${question.options[question.correct]}`}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="w-full"
            size="lg"
          >
            {currentQuestion === QUIZ_QUESTIONS.length - 1
              ? 'See Results'
              : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  )
}
