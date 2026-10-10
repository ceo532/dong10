import React, { useState } from 'react';
import { VOCABULARY_LIST_PART_A, VocabularyItem } from '../data/examData';
import { Volume2, ArrowLeft, Sparkles, Copy, Check, Layers, BookOpen } from 'lucide-react';
import { speakEnglish } from '../utils/speech';

interface VocabularyTableProps {
  onBackToSummary: () => void;
}

export const VocabularyTable: React.FC<VocabularyTableProps> = ({ onBackToSummary }) => {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'table' | 'flashcard'>('table');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCopyTable = () => {
    let text = "DANH SÁCH 20 TỪ VỰNG PHẦN A (ÔN THI LỚP 10 - TRỊNH ĐÔNG)\n\n";
    text += "STT | Từ vựng | Loại từ | Nghĩa tiếng Việt\n";
    text += "----|---------|---------|------------------\n";
    VOCABULARY_LIST_PART_A.forEach((item) => {
      text += `${item.id.toString().padEnd(3)} | ${item.word.padEnd(10)} | ${item.wordType.padEnd(8)} | ${item.meaning}\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentItem = VOCABULARY_LIST_PART_A[currentFlashcardIndex];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToSummary}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về bảng tổng kết điểm</span>
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>20 Từ vựng trọng tâm Phần A</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              Lớp 6–9
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Dành cho giáo viên lưu vào danh sách ôn tập và Đông học thuộc lòng
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                mode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bảng danh sách</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('flashcard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                mode === 'flashcard' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lật thẻ (Flashcard)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyTable}
            className="p-2 text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Sao chép bảng từ vựng"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mode === 'table' ? (
        /* Table View */
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-3 text-center w-12">STT</th>
                  <th className="py-3 px-4">Từ vựng (Vocabulary)</th>
                  <th className="py-3 px-3">Loại từ</th>
                  <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                  <th className="py-3 px-3 text-center w-14">Nghe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {VOCABULARY_LIST_PART_A.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-400 text-xs">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 text-base">
                      <div className="flex items-center gap-2">
                        <span>{item.word}</span>
                        <span className="text-xs font-normal text-slate-400 font-mono">
                          {item.ipa}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${
                          item.wordType === 'Danh từ'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : item.wordType === 'Động từ'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.wordType === 'Tính từ'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {item.wordType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{item.meaning}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => speakEnglish(item.word)}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title={`Phát âm: ${item.word}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Flashcard View */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
            <span>Thẻ {currentFlashcardIndex + 1} / {VOCABULARY_LIST_PART_A.length}</span>
            <span>Chạm vào thẻ để lật xem nghĩa</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[260px] md:min-h-[300px] bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-200 hover:border-indigo-400 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200 transform hover:scale-[1.01]"
          >
            {!isFlipped ? (
              /* Mặt trước: Tiếng Anh */
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {currentItem.wordType}
                </span>
                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  {currentItem.word}
                </div>
                <div className="text-sm font-mono text-slate-500">{currentItem.ipa}</div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakEnglish(currentItem.word);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold rounded-xl transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe phát âm</span>
                  </button>
                </div>
                <div className="text-xs text-slate-400 font-medium pt-3">
                  (Bấm vào đây để xem nghĩa tiếng Việt)
                </div>
              </div>
            ) : (
              /* Mặt sau: Nghĩa tiếng Việt & Ví dụ */
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Nghĩa tiếng Việt:
                </span>
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {currentItem.meaning}
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-700 text-sm max-w-md mx-auto text-left border border-slate-200">
                  <div className="font-semibold text-slate-900">{currentItem.example}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{currentItem.vietnameseExample}</div>
                </div>
                <div className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">
                  💡 Mẹo nhớ: {currentItem.memoryTip}
                </div>
              </div>
            )}
          </div>

          {/* Flashcard navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentFlashcardIndex === 0}
              onClick={() => {
                setIsFlipped(false);
                setCurrentFlashcardIndex((prev) => Math.max(0, prev - 1));
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              Thẻ trước
            </button>
            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2 rounded-xl text-indigo-600 hover:bg-indigo-50 font-bold text-sm transition-colors cursor-pointer"
            >
              {isFlipped ? 'Xem lại từ tiếng Anh' : 'Lật xem nghĩa'}
            </button>
            <button
              type="button"
              disabled={currentFlashcardIndex === VOCABULARY_LIST_PART_A.length - 1}
              onClick={() => {
                setIsFlipped(false);
                setCurrentFlashcardIndex((prev) => Math.min(VOCABULARY_LIST_PART_A.length - 1, prev + 1));
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Thẻ tiếp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
