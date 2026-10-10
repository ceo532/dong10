import React, { useState } from 'react';
import { Settings, X, Check, Globe, HelpCircle } from 'lucide-react';

interface WebhookSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
  sessionName: string;
  onSaveSessionName: (session: string) => void;
}

export const WebhookSettingsModal: React.FC<WebhookSettingsModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  onSaveWebhookUrl,
  sessionName,
  onSaveSessionName,
}) => {
  const [url, setUrl] = useState(webhookUrl);
  const [session, setSession] = useState(sessionName);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveWebhookUrl(url.trim());
    onSaveSessionName(session.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span>Cài đặt Webhook & Buổi học</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              URL Webhook Google Apps Script (hoặc endpoint nhận điểm)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Dán đường dẫn <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">.../exec</code> vào đây để tự động nhận kết quả nộp bài của Trịnh Đông.
            </p>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Thông tin Buổi học (<code className="text-xs text-indigo-600">buoi</code>)
            </label>
            <input
              type="text"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              placeholder="Tuần __ – Thứ __ (Ví dụ: Tuần 1 – Thứ 2)"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Cơ chế gửi Webhook an toàn</span>
            </div>
            <p>
              • Dữ liệu gửi gồm: <code className="font-mono">buoi</code>, <code className="font-mono">loai</code>, <code className="font-mono">dung</code> (số câu đúng), <code className="font-mono">tong</code> (40), <code className="font-mono">url</code>.
            </p>
            <p>
              • Hệ thống đảm bảo <strong>chỉ gửi đúng 1 lần</strong> khi hoàn thành bài. Làm lại bài hoặc tải lại trang sẽ không gửi thêm.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Đã lưu!</span>
              </>
            ) : (
              <span>Lưu thay đổi</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
