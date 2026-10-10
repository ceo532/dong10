import React, { useState, useEffect } from 'react';
import { Question } from '../data/examData';
import { Volume2, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { speakEnglish } from '../utils/speech';

interface SingleQuestionStepProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  onConfirmAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  onGoBack: () => void;
  canGoBack: boolean;
}

export const SingleQuestionStep: React.FC<SingleQuestionStepProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onConfirmAnswer,
  onGoBack,
  canGoBack,
}) => {
  // Temporary choice on current step
  const [currentChoice, setCurrentChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(
    selectedAnswer || null
  );
  const [showWarning, setShowWarning] = useState(false);

  // Sync state whenever question changes
  useEffect(() => {
    setCurrentChoice(selectedAnswer || null);
    setShowWarning(false);
  }, [question.id, selectedAnswer]);

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    setCurrentChoice(key);
    setShowWarning(false);
  };

  const handleNextClick = () => {
    if (!currentChoice) {
      setShowWarning(true);
      return;
    }
    onConfirmAnswer(currentChoice);
  };

  const handleAudio = () => {
    if (question.part === 'A' && question.targetWord) {
      speakEnglish(question.targetWord);
    } else if (question.sentence) {
      speakEnglish(question.sentence.replace('______', 'blank'));
    }
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Format passage for Part A to highlight the bold word with nice badge
  const renderPassage = () => {
    if (!question.passage) return null;
    const parts = question.passage.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-normal">
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const word = part.slice(2, -2);
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mx-1 bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300 shadow-xs"
              >
                <span className="underline decoration-indigo-500 decoration-2 underline-offset-4">{word}</span>
                <button
                  type="button"
                  onClick={handleAudio}
                  title="Nghe phát âm từ này"
                  className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-amber-200 rounded-full transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-600 mb-2">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            {question.part === 'A' ? (
              <span className="text-indigo-700 uppercase tracking-wide text-xs md:text-sm font-bold">
                Phần A: Đoán nghĩa từ ngữ cảnh
              </span>
            ) : (
              <span className="text-emerald-700 uppercase tracking-wide text-xs md:text-sm font-bold">
                Phần B: Từ vựng & Ngữ pháp
              </span>
            )}
          </span>
          <span className="text-slate-800 font-bold text-base md:text-lg">
            Câu {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border border-slate-200/80 transition-all">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs md:text-sm font-semibold rounded-full bg-slate-100 text-slate-700">
            {question.part === 'A' ? `Từ loại: ${question.targetWordType || 'Từ vựng'}` : question.categoryTitle}
          </span>
          {question.part === 'B' && (
            <button
              type="button"
              onClick={handleAudio}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-2.5 py-1 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe câu</span>
            </button>
          )}
        </div>

        {/* Passage (if Part A) */}
        {question.part === 'A' && question.passage && (
          <div className="p-4 md:p-5 bg-slate-50/90 rounded-2xl border border-slate-200/70 mb-5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Đoạn văn ngữ cảnh:
            </div>
            {renderPassage()}
          </div>
        )}

        {/* Question sentence */}
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Câu hỏi:
          </div>
          <div className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
            {question.part === 'A' ? (
              question.questionText
            ) : (
              <span className="font-mono text-indigo-950 font-semibold">{question.questionText}</span>
            )}
          </div>
        </div>

        {/* Warning if trying to next without choosing */}
        {showWarning && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-semibold flex items-center gap-2 animate-bounce">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>Đông hãy chọn một đáp án A, B, C hoặc D trước khi bấm chuyển câu nhé!</span>
          </div>
        )}

        {/* 4 Options */}
        <div className="space-y-3">
          {(['A', 'B', 'C', 'D'] as const).map((key) => {
            const isSelected = currentChoice === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(key)}
                className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-150 flex items-center justify-between active:scale-[0.99] cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-md text-indigo-950'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {key}
                  </div>
                  <span className="text-lg md:text-xl font-medium tracking-wide">
                    {question.options[key]}
                  </span>
                </div>

                <div className="shrink-0 ml-2">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
          {canGoBack ? (
            <button
              type="button"
              onClick={onGoBack}
              className="px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-base rounded-2xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNextClick}
            className={`flex-1 sm:flex-initial px-6 py-4 rounded-2xl font-bold text-lg text-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isLastQuestion
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25'
            }`}
          >
            {isLastQuestion ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>Xác nhận & Nộp bài</span>
              </>
            ) : (
              <>
                <span>Xác nhận & Câu tiếp</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
