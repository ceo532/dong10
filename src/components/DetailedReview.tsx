import React, { useState } from 'react';
import { Question, QUESTIONS } from '../data/examData';
import { CheckCircle2, XCircle, Volume2, ArrowLeft, Filter, Sparkles } from 'lucide-react';
import { speakEnglish } from '../utils/speech';

interface DetailedReviewProps {
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onBackToSummary: () => void;
}

export const DetailedReview: React.FC<DetailedReviewProps> = ({
  userAnswers,
  onBackToSummary,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong'>('all');

  const filteredQuestions = QUESTIONS.filter((q) => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (filter === 'correct') return isCorrect;
    if (filter === 'wrong') return !isCorrect;
    return true;
  });

  const correctTotal = QUESTIONS.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
  const wrongTotal = QUESTIONS.length - correctTotal;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToSummary}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về bảng tổng kết điểm</span>
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Giải thích chi tiết 40 câu hỏi
          </h2>
          <p className="text-xs text-slate-500">
            Xem lại để nắm chắc nghĩa từ vựng và mẹo làm bài ngữ pháp
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả ({QUESTIONS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('correct')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Đúng ({correctTotal})
          </button>
          <button
            type="button"
            onClick={() => setFilter('wrong')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'wrong'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            Sai ({wrongTotal})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const userChoice = userAnswers[q.id];
          const isCorrect = userChoice === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-5 md:p-6 shadow-sm border transition-all ${
                isCorrect ? 'border-emerald-200' : 'border-rose-200'
              }`}
            >
              {/* Question metadata badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {q.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {q.part === 'A' ? 'Phần A: Đoán nghĩa từ' : `Phần B: ${q.categoryTitle}`}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đúng</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Chưa đúng</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Passage if Part A */}
              {q.part === 'A' && q.passage && (
                <div className="p-3.5 bg-slate-50 rounded-xl text-slate-700 text-sm md:text-base leading-relaxed mb-3 border border-slate-200/60">
                  <span className="text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                    Ngữ cảnh:
                  </span>
                  {q.passage.replace(/\*\*/g, '')}
                </div>
              )}

              {/* Question text */}
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                  {q.questionText}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (q.targetWord) speakEnglish(q.targetWord);
                    else if (q.sentence) speakEnglish(q.sentence.replace('______', 'blank'));
                  }}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors shrink-0"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
                {(['A', 'B', 'C', 'D'] as const).map((key) => {
                  const isAnswer = q.correctAnswer === key;
                  const isUserChosen = userChoice === key;

                  let cardStyle = 'border-slate-200 bg-slate-50/50 text-slate-700';
                  if (isAnswer) {
                    cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                  } else if (isUserChosen && !isCorrect) {
                    cardStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                  }

                  return (
                    <div
                      key={key}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${cardStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                            isAnswer
                              ? 'bg-emerald-600 text-white'
                              : isUserChosen
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {key}
                        </span>
                        <span>{q.options[key]}</span>
                      </div>
                      {isAnswer && (
                        <span className="text-[11px] font-bold text-emerald-700 uppercase">
                          Đáp án đúng
                        </span>
                      )}
                      {isUserChosen && !isAnswer && (
                        <span className="text-[11px] font-bold text-rose-600 uppercase">
                          Đông chọn
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanations */}
              <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs md:text-sm text-indigo-950 space-y-1.5">
                <div>
                  <strong className="text-indigo-900">Nghĩa / Giải thích ngắn: </strong>
                  <span>{q.shortExplanation}</span>
                </div>
                <div className="text-slate-600 pt-1 border-t border-indigo-100/80">
                  <strong className="text-slate-800">Lời giải chi tiết: </strong>
                  <span>{q.detailedExplanation}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
