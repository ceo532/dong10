import React, { useState } from 'react';
import {
  QUESTIONS,
  VOCABULARY_LIST_PART_A,
  ANSWER_KEY_STRING,
  EXAM_TITLE,
  EXAM_DURATION_MINUTES,
  STUDENT_NAME,
  TARGET_EXAM,
  generatePlainTextExam
} from '../data/examData';
import { ArrowLeft, Printer, Copy, Check, FileText } from 'lucide-react';

interface PrintableDocumentProps {
  onBack: () => void;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({ onBack }) => {
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const text = generatePlainTextExam();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Action Header - Hidden during print */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 shadow-md border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>Văn bản Đề thi & Bảng đáp án chuẩn</span>
          </h2>
          <p className="text-xs text-slate-500">
            Định dạng văn bản chuẩn mực theo yêu cầu sư phạm, sẵn sàng in PDF hoặc sao chép
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Kèm đáp án & lời giải</span>
          </label>

          <button
            type="button"
            onClick={handleCopyAll}
            className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép toàn bộ</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In đề thi / Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* Actual Printable Paper */}
      <div className="bg-white rounded-3xl p-6 md:p-12 shadow-lg border border-slate-200 text-slate-900 leading-normal print:shadow-none print:border-none print:p-0">
        {/* Document Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900 mb-8">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
            ĐỀ ÔN LUYỆN TUYỂN SINH VÀO LỚP 10
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            {EXAM_TITLE}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-slate-700 mt-2">
            <span>Thời gian làm bài: <strong>{EXAM_DURATION_MINUTES} phút</strong></span>
            <span>•</span>
            <span>Học sinh: <strong>{STUDENT_NAME}</strong></span>
            <span>•</span>
            <span>Kỳ thi: <strong>{TARGET_EXAM}</strong></span>
          </div>
        </div>

        {/* PHẦN A */}
        <div className="mb-10">
          <div className="bg-slate-100 print:bg-transparent p-2.5 rounded-lg mb-4">
            <h2 className="text-base md:text-lg font-bold text-slate-900 uppercase">
              === PHẦN A (câu 1–20): ĐOÁN NGHĨA TỪ TIẾNG ANH TỪ NGỮ CẢNH ===
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Đọc kỹ đoạn văn và chọn nghĩa tiếng Việt chính xác nhất của từ in đậm dựa vào ngữ cảnh.
            </p>
          </div>

          <div className="space-y-6">
            {QUESTIONS.slice(0, 20).map((q) => (
              <div key={q.id} className="print-avoid-break">
                <div className="font-semibold text-slate-900 mb-1">
                  <span className="font-bold">Câu {q.id}:</span>{' '}
                  <span className="font-normal">{q.passage}</span>
                </div>
                <div className="text-sm font-medium text-slate-800 mb-2 italic">
                  {q.questionText}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm pl-4">
                  <div><strong>A.</strong> {q.options.A}</div>
                  <div><strong>B.</strong> {q.options.B}</div>
                  <div><strong>C.</strong> {q.options.C}</div>
                  <div><strong>D.</strong> {q.options.D}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PHẦN B */}
        <div className="mb-10">
          <div className="bg-slate-100 print:bg-transparent p-2.5 rounded-lg mb-4">
            <h2 className="text-base md:text-lg font-bold text-slate-900 uppercase">
              === PHẦN B (câu 21–40): TỪ VỰNG VÀ NGỮ PHÁP CƠ BẢN ===
            </h2>
          </div>

          {/* Câu 21-30 */}
          <div className="mb-6">
            <div className="text-sm font-bold text-slate-700 italic mb-4">
              I. Chọn từ/cụm từ đúng điền vào chỗ trống (câu 21–30):
            </div>
            <div className="space-y-6">
              {QUESTIONS.slice(20, 30).map((q) => (
                <div key={q.id} className="print-avoid-break">
                  <div className="font-semibold text-slate-900 mb-2">
                    <span className="font-bold">Câu {q.id}:</span> {q.questionText}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm pl-4">
                    <div><strong>A.</strong> {q.options.A}</div>
                    <div><strong>B.</strong> {q.options.B}</div>
                    <div><strong>C.</strong> {q.options.C}</div>
                    <div><strong>D.</strong> {q.options.D}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Câu 31-40 */}
          <div>
            <div className="text-sm font-bold text-slate-700 italic mb-4">
              II. Ngữ pháp cơ bản lớp 6–9 (câu 31–40):
            </div>
            <div className="space-y-6">
              {QUESTIONS.slice(30, 40).map((q) => (
                <div key={q.id} className="print-avoid-break">
                  <div className="font-semibold text-slate-900 mb-2">
                    <span className="font-bold">Câu {q.id}:</span> {q.questionText}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm pl-4">
                    <div><strong>A.</strong> {q.options.A}</div>
                    <div><strong>B.</strong> {q.options.B}</div>
                    <div><strong>C.</strong> {q.options.C}</div>
                    <div><strong>D.</strong> {q.options.D}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Đáp án section */}
        {includeAnswers && (
          <div className="print-break-before pt-6 border-t-2 border-dashed border-slate-400 mt-10">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 uppercase">
                === ĐÁP ÁN ===
              </h2>
            </div>

            {/* Chuỗi 40 ký tự */}
            <div className="mb-6">
              <div className="font-bold text-sm text-slate-800 mb-1">
                a. Chuỗi đáp án đúng 40 ký tự liền nhau:
              </div>
              <div className="p-3 bg-slate-100 rounded-lg font-mono text-base font-bold tracking-widest text-slate-900 border border-slate-300">
                {ANSWER_KEY_STRING}
              </div>
            </div>

            {/* Bảng chi tiết */}
            <div className="mb-8">
              <div className="font-bold text-sm text-slate-800 mb-2">
                b. Bảng chi tiết đáp án và nghĩa/giải thích ngắn bằng tiếng Việt:
              </div>
              <div className="border border-slate-300 rounded-lg overflow-hidden text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-xs font-bold text-slate-700">
                      <th className="p-2 border-r border-slate-300 text-center w-16">Số câu</th>
                      <th className="p-2 border-r border-slate-300 text-center w-16">Đáp án</th>
                      <th className="p-2">Nghĩa tiếng Việt (Phần A) hoặc giải thích ngắn (Phần B)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {QUESTIONS.map((q) => (
                      <tr key={q.id}>
                        <td className="p-2 border-r border-slate-200 text-center font-bold">
                          Câu {q.id}
                        </td>
                        <td className="p-2 border-r border-slate-200 text-center font-bold text-indigo-700">
                          {q.correctAnswer}
                        </td>
                        <td className="p-2 text-slate-800">{q.shortExplanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bảng 20 từ vựng Phần A */}
            <div className="print-avoid-break">
              <div className="font-bold text-sm text-slate-800 mb-2 uppercase">
                DANH SÁCH 20 TỪ TIẾNG ANH PHẦN A (DÀNH CHO GIÁO VIÊN ÔN TẬP)
              </div>
              <div className="border border-slate-300 rounded-lg overflow-hidden text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-xs font-bold text-slate-700">
                      <th className="p-2 border-r border-slate-300 text-center w-12">STT</th>
                      <th className="p-2 border-r border-slate-300">Từ vựng</th>
                      <th className="p-2 border-r border-slate-300 w-28">Loại từ</th>
                      <th className="p-2">Nghĩa tiếng Việt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {VOCABULARY_LIST_PART_A.map((item) => (
                      <tr key={item.id}>
                        <td className="p-2 border-r border-slate-200 text-center text-slate-500">
                          {item.id}
                        </td>
                        <td className="p-2 border-r border-slate-200 font-bold text-slate-900">
                          {item.word}
                        </td>
                        <td className="p-2 border-r border-slate-200 font-medium text-slate-700">
                          {item.wordType}
                        </td>
                        <td className="p-2 text-slate-800">{item.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
