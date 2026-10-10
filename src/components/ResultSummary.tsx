import React, { useState } from 'react';
import {
  Trophy,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ListChecks,
  Printer,
  Send,
  Sparkles,
  AlertTriangle,
  Settings
} from 'lucide-react';
import {
  ANSWER_KEY_STRING,
  STUDENT_NAME,
  TARGET_EXAM,
} from '../data/examData';

interface ResultSummaryProps {
  correctCount: number;
  totalQuestions: number;
  partACorrect: number;
  partBCorrect: number;
  webhookStatus: 'idle' | 'success' | 'placeholder' | 'error';
  sessionName: string;
  onRetake: () => void;
  onViewDetailedReview: () => void;
  onViewVocabulary: () => void;
  onViewPrintDocument: () => void;
  onOpenSettings: () => void;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  correctCount,
  totalQuestions,
  partACorrect,
  partBCorrect,
  webhookStatus,
  sessionName,
  onRetake,
  onViewDetailedReview,
  onViewVocabulary,
  onViewPrintDocument,
  onOpenSettings,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);

  const scoreOn10 = ((correctCount / totalQuestions) * 10).toFixed(1);
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(ANSWER_KEY_STRING);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const getTeacherMessage = () => {
    const score = Number(scoreOn10);
    if (score >= 8.0) {
      return `Thầy/Cô rất tự hào về ${STUDENT_NAME}! Em nắm từ vựng và ngữ pháp rất chắc chắn. Hãy tiếp tục duy trì phong độ này để tự tin bứt phá vào lớp 10 năm 2027 nhé!`;
    }
    if (score >= 6.5) {
      return `Kết quả rất đáng khích lệ, ${STUDENT_NAME}! Em đã nắm được nhiều từ vựng và cấu trúc quan trọng. Chỉ cần ôn kỹ lại vài câu chưa đúng ở Phần B là điểm số sẽ còn cao hơn nữa!`;
    }
    if (score >= 5.0) {
      return `Em đã hoàn thành bài kiểm tra rất cố gắng, ${STUDENT_NAME}! Đừng lo lắng, chúng ta còn hơn 1 năm chuẩn bị. Hãy xem kỹ lời giải chi tiết và học thuộc 20 từ vựng ở Phần A để tích lũy dần nhé!`;
    }
    return `Cố lên ${STUDENT_NAME}! Đây là bài kiểm tra bước đầu để thầy/cô nắm được phần em cần hỗ trợ. Hãy xem lại từng câu sai và ôn luyện 20 từ vựng mục tiêu, từng bước nhỏ sẽ giúp em tiến bộ vững chắc!`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Main Score Hero Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/90 text-center relative overflow-hidden">
        {/* Background gradient flare */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-indigo-50 text-indigo-600 mb-4 shadow-inner">
          <Trophy className="w-9 h-9 md:w-11 md:h-11" />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          KẾT QUẢ BÀI KIỂM TRA
        </h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Học sinh: <strong className="text-slate-800">{STUDENT_NAME}</strong> • {TARGET_EXAM}
        </p>

        {/* Big Numbers */}
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-b from-indigo-50/70 to-slate-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-around gap-4">
          <div>
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Số câu trả lời đúng
            </div>
            <div className="text-4xl md:text-5xl font-black text-indigo-600 tracking-tight mt-1">
              Đúng {correctCount}/{totalQuestions}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Tỷ lệ chính xác: {percentage}%</div>
          </div>

          <div className="hidden sm:block w-px h-16 bg-slate-200" />

          <div>
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Điểm trên thang 10
            </div>
            <div className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tight mt-1">
              {scoreOn10} <span className="text-2xl font-bold text-slate-400">/ 10</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Thang điểm chuẩn tuyển sinh</div>
          </div>
        </div>

        {/* Sub-scores by Part */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Phần A: Đoán nghĩa từ</div>
            <div className="text-lg font-bold text-slate-800 mt-0.5">
              Đúng {partACorrect} / 20 câu
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Phần B: Từ vựng & Ngữ pháp</div>
            <div className="text-lg font-bold text-slate-800 mt-0.5">
              Đúng {partBCorrect} / 20 câu
            </div>
          </div>
        </div>

        {/* Webhook notification status */}
        <div className="mt-5 text-left">
          {webhookStatus === 'success' && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Đã tự động gửi kết quả về webhook</strong> ({sessionName || 'Tuần __ – Thứ __'}) thành công!
                </span>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">1 lần</span>
            </div>
          )}

          {webhookStatus === 'placeholder' && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Đang dùng URL mẫu <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">DÁN_URL_/exec_VÀO_ĐÂY</code>.
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenSettings}
                className="text-xs font-bold text-indigo-700 underline flex items-center gap-1 hover:text-indigo-900 shrink-0"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Dán URL thật</span>
              </button>
            </div>
          )}

          {webhookStatus === 'error' && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Gặp lỗi khi gửi Webhook. Vui lòng kiểm tra lại URL trong phần cài đặt.</span>
            </div>
          )}
        </div>

        {/* Teacher's message */}
        <div className="mt-5 p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Lời nhắn gửi từ giáo viên:</span>
          </div>
          <p className="text-sm md:text-base text-indigo-950 font-medium leading-relaxed">
            "{getTeacherMessage()}"
          </p>
        </div>
      </div>

      {/* Answer key string (40 chars as requested) */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-md border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-bold text-slate-800">
            Chuỗi đáp án chuẩn 40 ký tự (theo yêu cầu):
          </div>
          <button
            type="button"
            onClick={handleCopyKey}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
          >
            {copiedKey ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        </div>
        <div className="p-3 bg-slate-900 rounded-xl text-emerald-400 font-mono text-sm md:text-base tracking-widest break-all font-bold selection:bg-emerald-500 selection:text-black">
          {ANSWER_KEY_STRING}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Gồm 40 ký tự liền nhau đại diện cho 40 câu hỏi (10 A, 10 B, 10 C, 10 D).
        </p>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onViewDetailedReview}
          className="w-full py-4 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ListChecks className="w-5 h-5" />
          <span>Xem đáp án & Giải thích chi tiết</span>
        </button>

        <button
          type="button"
          onClick={onViewVocabulary}
          className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 font-bold text-base shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>20 từ vựng cần ôn tập</span>
        </button>

        <button
          type="button"
          onClick={onViewPrintDocument}
          className="w-full py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Bản in & Xuất đề thi giấy</span>
        </button>

        <button
          type="button"
          onClick={onRetake}
          className="w-full py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <span>Làm lại bài thi (Không gửi lại webhook)</span>
        </button>
      </div>
    </div>
  );
};
