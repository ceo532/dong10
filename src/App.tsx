import React, { useState, useEffect, useRef } from 'react';
import {
  QUESTIONS,
  EXAM_TITLE,
  EXAM_DURATION_MINUTES,
  STUDENT_NAME,
  TARGET_EXAM,
  ANSWER_KEY_STRING,
} from './data/examData';
import { SingleQuestionStep } from './components/SingleQuestionStep';
import { ResultSummary } from './components/ResultSummary';
import { DetailedReview } from './components/DetailedReview';
import { VocabularyTable } from './components/VocabularyTable';
import { PrintableDocument } from './components/PrintableDocument';
import { WebhookSettingsModal } from './components/WebhookSettingsModal';
import {
  GraduationCap,
  Clock,
  Settings,
  HelpCircle,
  FileText,
  RotateCcw,
} from 'lucide-react';

const STORAGE_WEBHOOK_URL_KEY = 'trinh_dong_webhook_url';
const STORAGE_SESSION_NAME_KEY = 'trinh_dong_session_name';
const SESSION_SUBMITTED_FLAG = 'trinh_dong_exam_submitted_v1';

export default function App() {
  // Current view mode: 'exam' | 'result' | 'review' | 'vocabulary' | 'print'
  const [viewMode, setViewMode] = useState<
    'exam' | 'result' | 'review' | 'vocabulary' | 'print'
  >('exam');

  // Exam state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer state (40 minutes)
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const [timerActive, setTimerActive] = useState(true);

  // Webhook settings & status
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem(STORAGE_WEBHOOK_URL_KEY) || 'DÁN_URL_/exec_VÀO_ĐÂY';
  });
  const [sessionName, setSessionName] = useState(() => {
    return localStorage.getItem(STORAGE_SESSION_NAME_KEY) || 'Tuần __ – Thứ __';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'success' | 'placeholder' | 'error'>('idle');

  // Guard flags: Send ONCE only per test run, never on reload, never on retake
  const hasSentWebhookRef = useRef(false);
  const isRetakeRef = useRef(false);

  // Timer effect
  useEffect(() => {
    if (!timerActive || isCompleted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, isCompleted, timeLeft]);

  // Check if session was already submitted previously (prevent reload sending)
  useEffect(() => {
    const alreadySent = sessionStorage.getItem(SESSION_SUBMITTED_FLAG);
    if (alreadySent === 'true') {
      hasSentWebhookRef.current = true;
    }
  }, []);

  const saveWebhookUrl = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem(STORAGE_WEBHOOK_URL_KEY, url);
  };

  const saveSessionName = (session: string) => {
    setSessionName(session);
    localStorage.setItem(STORAGE_SESSION_NAME_KEY, session);
  };

  // Grade calculation
  const calculateScore = () => {
    let correct = 0;
    let partA = 0;
    let partB = 0;

    QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
        if (q.part === 'A') partA++;
        else partB++;
      }
    });

    return { correct, partA, partB };
  };

  // Automated scoring & Webhook trigger
  const handleFinishExam = () => {
    setIsCompleted(true);
    setTimerActive(false);
    setViewMode('result');

    // Chấm điểm tự động theo chuỗi đáp án 40 ký tự
    let soCauDung = 0;
    for (let i = 0; i < QUESTIONS.length; i++) {
      const q = QUESTIONS[i];
      if (userAnswers[q.id] === q.correctAnswer) {
        soCauDung++;
      }
    }

    // Gửi webhook theo đúng code mẫu yêu cầu:
    // Chỉ gửi MỘT lần mỗi lượt làm bài, không gửi lại khi tải lại trang
    // Nút "Làm lại" không gửi thêm kết quả lần nữa
    const alreadySubmittedSession = sessionStorage.getItem(SESSION_SUBMITTED_FLAG);

    if (!hasSentWebhookRef.current && !isRetakeRef.current && alreadySubmittedSession !== 'true') {
      hasSentWebhookRef.current = true;
      sessionStorage.setItem(SESSION_SUBMITTED_FLAG, 'true');

      const WEBHOOK = webhookUrl;

      // Giữ nguyên cách gọi như người dùng yêu cầu:
      if (WEBHOOK && WEBHOOK !== 'DÁN_URL_/exec_VÀO_ĐÂY') {
        try {
          fetch(WEBHOOK, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              buoi: sessionName || 'Tuần __ – Thứ __',
              loai: 'Đoán nghĩa từ + Từ vựng/Ngữ pháp',
              dung: soCauDung,
              tong: 40,
              url: window.location.href,
            }),
          })
            .then(() => {
              setWebhookStatus('success');
            })
            .catch((err) => {
              console.error('Webhook error:', err);
              setWebhookStatus('error');
            });
        } catch (e) {
          console.error(e);
          setWebhookStatus('error');
        }
      } else {
        // Webhook URL is still placeholder
        setWebhookStatus('placeholder');
      }
    }
  };

  // Handle single question confirmation
  const handleConfirmAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
    const currentQ = QUESTIONS[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answer,
    }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Reached question 40: finish exam
      handleFinishExam();
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Retake exam: explicitly does not send webhook again
  const handleRetake = () => {
    isRetakeRef.current = true; // Block any further webhook fetch
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setTimeLeft(EXAM_DURATION_MINUTES * 60);
    setTimerActive(true);
    setViewMode('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const { correct, partA, partB } = calculateScore();

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header - Hidden in print */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand & Student info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-indigo-500/20 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-extrabold text-slate-900 leading-tight">
                {EXAM_TITLE}
              </h1>
              <div className="text-[11px] md:text-xs text-slate-500 font-medium">
                Học sinh: <strong className="text-indigo-700">{STUDENT_NAME}</strong> • {TARGET_EXAM}
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Timer (only during exam) */}
            {viewMode === 'exam' && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-xs md:text-sm border transition-colors ${
                  timeLeft <= 300
                    ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            {/* View switcher dropdown / tabs if completed */}
            {isCompleted && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMode('result')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    viewMode === 'result'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Điểm số
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('review')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    viewMode === 'review'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Lời giải
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('vocabulary')}
                  className={`hidden sm:inline-block px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    viewMode === 'vocabulary'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Từ vựng
                </button>
              </div>
            )}

            {/* Quick print view button */}
            <button
              type="button"
              onClick={() => setViewMode('print')}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Xem bản in đề thi"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Webhook settings button */}
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
              title="Cài đặt Webhook & Buổi học"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col justify-center">
        {viewMode === 'exam' && (
          <SingleQuestionStep
            question={QUESTIONS[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS.length}
            selectedAnswer={userAnswers[QUESTIONS[currentQuestionIndex].id]}
            onConfirmAnswer={handleConfirmAnswer}
            onGoBack={handleGoBack}
            canGoBack={currentQuestionIndex > 0}
          />
        )}

        {viewMode === 'result' && (
          <ResultSummary
            correctCount={correct}
            totalQuestions={QUESTIONS.length}
            partACorrect={partA}
            partBCorrect={partB}
            webhookStatus={webhookStatus}
            sessionName={sessionName}
            onRetake={handleRetake}
            onViewDetailedReview={() => setViewMode('review')}
            onViewVocabulary={() => setViewMode('vocabulary')}
            onViewPrintDocument={() => setViewMode('print')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {viewMode === 'review' && (
          <DetailedReview
            userAnswers={userAnswers}
            onBackToSummary={() => setViewMode('result')}
          />
        )}

        {viewMode === 'vocabulary' && (
          <VocabularyTable onBackToSummary={() => setViewMode('result')} />
        )}

        {viewMode === 'print' && (
          <PrintableDocument
            onBack={() => setViewMode(isCompleted ? 'result' : 'exam')}
          />
        )}
      </main>

      {/* Footer - Hidden in print */}
      <footer className="no-print mt-auto py-4 border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Đề thi luyện tập tiếng Anh vào Lớp 10 • Học sinh: <strong>{STUDENT_NAME}</strong> (Tháng 6/2027)
          </span>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Chuỗi đáp án: 40 ký tự</span>
            <span>•</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Cài đặt Webhook
            </button>
          </div>
        </div>
      </footer>

      {/* Webhook Settings Modal */}
      <WebhookSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        webhookUrl={webhookUrl}
        onSaveWebhookUrl={saveWebhookUrl}
        sessionName={sessionName}
        onSaveSessionName={saveSessionName}
      />
    </div>
  );
}
