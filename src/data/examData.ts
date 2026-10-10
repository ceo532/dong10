export interface Question {
  id: number;
  part: 'A' | 'B';
  categoryTitle?: string;
  passage?: string; // For Part A
  targetWord?: string; // For Part A
  targetWordType?: 'Danh từ' | 'Động từ' | 'Tính từ' | 'Trạng từ';
  sentence?: string; // For Part B
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  shortExplanation: string; // Nghĩa tiếng Việt (Phần A) hoặc giải thích ngắn (Phần B)
  detailedExplanation: string; // Giải thích ân cần cho Đông
}

export interface VocabularyItem {
  id: number;
  word: string;
  wordType: 'Danh từ' | 'Động từ' | 'Tính từ' | 'Trạng từ';
  meaning: string;
  ipa: string;
  example: string;
  vietnameseExample: string;
  memoryTip: string;
}

export const EXAM_TITLE = "BÀI KIỂM TRA TIẾNG ANH – TRỊNH ĐÔNG";
export const EXAM_DURATION_MINUTES = 40;
export const STUDENT_NAME = "Trịnh Đông";
export const TARGET_EXAM = "Kỳ thi tuyển sinh vào Lớp 10 (Tháng 6/2027)";

export const ANSWER_KEY_STRING = "ACBDABDCABDCABCDABDCABDBCBDACDBACDBACDABC";

export const QUESTIONS: Question[] = [
  // ==========================================
  // PHẦN A: ĐOÁN NGHĨA TỪ TIẾNG ANH TỪ NGỮ CẢNH (CÂU 1 - 20)
  // ==========================================
  {
    id: 1,
    part: 'A',
    targetWord: 'library',
    targetWordType: 'Danh từ',
    passage: 'Cứ sau giờ học buổi chiều, Đông lại ghé vào **library** của trường. Ở đó có rất nhiều sách hay, truyện tranh và không gian vô cùng yên tĩnh để đọc.',
    questionText: 'Từ "library" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'thư viện',
      B: 'căng tin',
      C: 'sân bóng',
      D: 'phòng y tế'
    },
    correctAnswer: 'A',
    shortExplanation: 'thư viện (nơi có nhiều sách truyện và không gian yên tĩnh để đọc)',
    detailedExplanation: 'Đoạn văn nhắc tới "có rất nhiều sách hay, truyện tranh và không gian yên tĩnh để đọc", do đó "library" chính là "thư viện". Căng tin (canteen), sân bóng (football pitch/field) và phòng y tế (medical room) đều không phù hợp.'
  },
  {
    id: 2,
    part: 'A',
    targetWord: 'clean',
    targetWordType: 'Động từ',
    passage: 'Hôm nay là Chủ nhật nên cả nhà Đông cùng nhau làm việc nhà. Đông nhận phần việc **clean** phòng ngủ của mình bằng cách quét nhà và lau bàn học thật ngăn nắp.',
    questionText: 'Từ "clean" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'sơn lại',
      B: 'trang trí',
      C: 'dọn dẹp',
      D: 'khóa cửa'
    },
    correctAnswer: 'C',
    shortExplanation: 'dọn dẹp, lau chùi (làm việc nhà: quét nhà, lau bàn ghế)',
    detailedExplanation: 'Hành động "quét nhà và lau bàn học thật ngăn nắp" là hành động dọn dẹp vệ sinh. Động từ "clean" có nghĩa là dọn dẹp, làm sạch.'
  },
  {
    id: 3,
    part: 'A',
    targetWord: 'delicious',
    targetWordType: 'Tính từ',
    passage: 'Mẹ nấu món phở bò cho cả gia đình ăn sáng. Nước dùng thơm lừng và ai cũng khen món ăn này rất **delicious** nên Đông đã ăn hết sạch hai bát.',
    questionText: 'Từ "delicious" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'cay nồng',
      B: 'ngon miệng',
      C: 'đắt tiền',
      D: 'nguội lạnh'
    },
    correctAnswer: 'B',
    shortExplanation: 'ngon miệng, ngon lành (khen món ăn mẹ nấu thơm lừng, ăn hết 2 bát)',
    detailedExplanation: 'Nước dùng thơm, ai cũng khen và Đông ăn hết sạch 2 bát phở chứng tỏ món ăn phải rất "ngon miệng" (delicious).'
  },
  {
    id: 4,
    part: 'A',
    targetWord: 'uniform',
    targetWordType: 'Danh từ',
    passage: 'Vào sáng thứ Hai đầu tuần, tất cả học sinh trường Đông đều phải mặc **uniform** chỉnh tề. Đó là áo sơ mi trắng có gắn huy hiệu trường và quần tây màu xanh đen.',
    questionText: 'Từ "uniform" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'áo khoác ấm',
      B: 'giày thể thao',
      C: 'cặp sách',
      D: 'đồng phục'
    },
    correctAnswer: 'D',
    shortExplanation: 'đồng phục (áo sơ mi trắng có huy hiệu trường và quần tây quy định)',
    detailedExplanation: 'Đoạn miêu tả quy định sáng thứ Hai học sinh phải mặc áo sơ mi trắng có huy hiệu và quần tây xanh đen giống nhau. Đó chính là "đồng phục" (uniform).'
  },
  {
    id: 5,
    part: 'A',
    targetWord: 'borrow',
    targetWordType: 'Động từ',
    passage: 'Đến giờ kiểm tra Toán nhưng Đông phát hiện mình để quên thước kẻ ở nhà. Cậu liền quay sang bạn Nam ngồi cạnh để **borrow** một chiếc dùng tạm cho tiết học.',
    questionText: 'Từ "borrow" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'mượn',
      B: 'bán',
      C: 'tặng',
      D: 'bẻ gãy'
    },
    correctAnswer: 'A',
    shortExplanation: 'mượn (xin dùng tạm đồ của bạn khi để quên ở nhà)',
    detailedExplanation: 'Vì Đông quên thước và xin Nam cho dùng tạm tiết học rồi trả lại, nên "borrow" mang nghĩa là "mượn".'
  },
  {
    id: 6,
    part: 'A',
    targetWord: 'breakfast',
    targetWordType: 'Danh từ',
    passage: 'Bác sĩ khuyên Đông không nên nhịn ăn trước khi đến trường vào mỗi buổi sớm. Một bữa **breakfast** đầy đủ với bánh mì và một ly sữa tươi sẽ giúp cậu có đủ năng lượng học tập cả buổi.',
    questionText: 'Từ "breakfast" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'bữa trưa',
      B: 'bữa sáng',
      C: 'bữa tối',
      D: 'bữa phụ đêm'
    },
    correctAnswer: 'B',
    shortExplanation: 'bữa sáng (bữa ăn vào mỗi buổi sớm trước khi đến trường)',
    detailedExplanation: 'Đoạn văn nói về việc ăn vào "mỗi buổi sớm trước khi đến trường" với bánh mì và sữa. Đó chính là bữa sáng (breakfast).'
  },
  {
    id: 7,
    part: 'A',
    targetWord: 'friendly',
    targetWordType: 'Tính từ',
    passage: 'Hôm nay lớp đón một bạn học sinh mới chuyển từ quê lên. Bạn ấy rất **friendly**, luôn tươi cười chào hỏi mọi người và sẵn sàng giúp đỡ các bạn khi làm bài nhóm.',
    questionText: 'Từ "friendly" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'nhút nhát',
      B: 'khó tính',
      C: 'nghiêm khắc',
      D: 'thân thiện'
    },
    correctAnswer: 'D',
    shortExplanation: 'thân thiện, cởi mở (luôn tươi cười chào hỏi và nhiệt tình giúp đỡ)',
    detailedExplanation: 'Một người luôn tươi cười chào hỏi và sẵn lòng giúp đỡ bạn bè là người rất "thân thiện" (friendly, xuất phát từ friend = bạn bè).'
  },
  {
    id: 8,
    part: 'A',
    targetWord: 'cook',
    targetWordType: 'Động từ',
    passage: 'Hôm nay mẹ đi làm về muộn nên Đông tự giác vào bếp trổ tài. Cậu chuẩn bị rau, trứng và học cách **cook** một bữa cơm đơn giản cho hai anh em.',
    questionText: 'Từ "cook" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'gọi đồ ăn',
      B: 'rửa bát',
      C: 'nấu ăn',
      D: 'dọn bàn'
    },
    correctAnswer: 'C',
    shortExplanation: 'nấu ăn (vào bếp chuẩn bị rau trứng làm bữa cơm)',
    detailedExplanation: 'Đông vào bếp, chuẩn bị rau trứng để tạo nên bữa cơm, do đó động từ "cook" có nghĩa là "nấu ăn".'
  },
  {
    id: 9,
    part: 'A',
    targetWord: 'market',
    targetWordType: 'Danh từ',
    passage: 'Sáng sớm, Đông đi bộ cùng bà ngoại ra khu **market** gần nhà. Nơi đây bán đầy đủ các loại thịt cá tươi sống, rau củ và trái cây bốn mùa.',
    questionText: 'Từ "market" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'khu chợ',
      B: 'bệnh viện',
      C: 'hiệu sách',
      D: 'rạp chiếu phim'
    },
    correctAnswer: 'A',
    shortExplanation: 'khu chợ (nơi bán các loại thịt cá tươi sống, rau củ, trái cây)',
    detailedExplanation: 'Nơi tập trung buôn bán thực phẩm tươi sống như rau củ, thịt cá hàng ngày chính là "khu chợ" (market).'
  },
  {
    id: 10,
    part: 'A',
    targetWord: 'quickly',
    targetWordType: 'Trạng từ',
    passage: 'Khi tiếng trống tan học vang lên, trời bất ngờ đổ cơn mưa rào mùa hạ. Đông thu dọn sách vở thật **quickly** rồi chạy vội vào khu nhà xe để trú mưa.',
    questionText: 'Từ "quickly" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'chậm chạp',
      B: 'nhanh chóng',
      C: 'im lặng',
      D: 'cẩn thận'
    },
    correctAnswer: 'B',
    shortExplanation: 'nhanh chóng, mau lẹ (thu dọn vội vàng trước cơn mưa rào bất ngờ)',
    detailedExplanation: 'Trời bất ngờ đổ mưa và Đông phải "chạy vội" đi trú mưa, nên cậu phải thu dọn sách vở một cách "nhanh chóng" (quickly).'
  },
  {
    id: 11,
    part: 'A',
    targetWord: 'difficult',
    targetWordType: 'Tính từ',
    passage: 'Bài toán hình học số năm làm cả tổ của Đông phải suy nghĩ suốt nửa tiếng đồng hồ. Thầy giáo cũng thừa nhận đây là một câu hỏi rất **difficult** chỉ dành cho học sinh giỏi.',
    questionText: 'Từ "difficult" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'đơn giản',
      B: 'thú vị',
      C: 'dài dòng',
      D: 'khó khăn'
    },
    correctAnswer: 'D',
    shortExplanation: 'khó khăn, hóc búa (suy nghĩ nửa tiếng, dành riêng cho học sinh giỏi)',
    detailedExplanation: 'Cả tổ phải suy nghĩ nửa tiếng và bài toán dành cho học sinh giỏi chứng tỏ đây là một câu hỏi rất "khó khăn / hóc búa" (difficult).'
  },
  {
    id: 12,
    part: 'A',
    targetWord: 'travel',
    targetWordType: 'Động từ',
    passage: 'Sau kỳ thi tuyển sinh vào lớp 10, gia đình Đông dự định sẽ đi nghỉ hè ở Đà Nẵng. Cả nhà rất hào hứng vì lâu rồi chưa cùng nhau **travel** xa như vậy.',
    questionText: 'Từ "travel" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'xây nhà',
      B: 'chuyển trường',
      C: 'đi du lịch',
      D: 'tăng ca làm việc'
    },
    correctAnswer: 'C',
    shortExplanation: 'đi du lịch, đi chơi xa (dự định đi nghỉ hè ở Đà Nẵng cùng gia đình)',
    detailedExplanation: 'Gia đình Đông dự định đi nghỉ hè xa ở Đà Nẵng, vì vậy động từ "travel" mang nghĩa là "đi du lịch / đi xa".'
  },
  {
    id: 13,
    part: 'A',
    targetWord: 'weather',
    targetWordType: 'Danh từ',
    passage: 'Sáng nay chuẩn bị ra sân bóng đá, Đông ngước nhìn lên bầu trời thấy mây đen kéo đến và gió thổi mạnh. Cậu liền mở điện thoại kiểm tra thông tin **weather** xem hôm nay có mưa hay không.',
    questionText: 'Từ "weather" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'thời tiết',
      B: 'giờ giấc',
      C: 'tin tức thể thao',
      D: 'giá cả vé'
    },
    correctAnswer: 'A',
    shortExplanation: 'thời tiết (thông tin xem trời có mưa gió, nắng hay râm mát)',
    detailedExplanation: 'Đông nhìn mây đen, gió thổi và muốn biết hôm nay có mưa hay không, điều này liên quan trực tiếp đến dự báo "thời tiết" (weather).'
  },
  {
    id: 14,
    part: 'A',
    targetWord: 'listen',
    targetWordType: 'Động từ',
    passage: 'Mỗi khi cảm thấy căng thẳng sau những giờ học bài vất vả, Đông thường bật đài radio nhỏ. Cậu nằm nghỉ trên giường và **listen** những giai điệu êm dịu để tinh thần thoải mái hơn.',
    questionText: 'Từ "listen" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'tắt đi',
      B: 'lắng nghe',
      C: 'sáng tác',
      D: 'tải xuống'
    },
    correctAnswer: 'B',
    shortExplanation: 'lắng nghe (bật radio nằm thưởng thức các giai điệu êm dịu)',
    detailedExplanation: 'Đông bật radio lên và thưởng thức các giai điệu âm nhạc bằng tai, do đó động từ "listen" có nghĩa là "lắng nghe".'
  },
  {
    id: 15,
    part: 'A',
    targetWord: 'hobby',
    targetWordType: 'Danh từ',
    passage: 'Trong tiết học làm quen đầu năm, cô giáo yêu cầu mỗi bạn chia sẻ về hoạt động mình thích làm khi rảnh rỗi. Đông hào hứng giới thiệu rằng vẽ truyện tranh chính là **hobby** lớn nhất của cậu từ nhỏ.',
    questionText: 'Từ "hobby" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'quê quán',
      B: 'kỷ niệm',
      C: 'sở thích',
      D: 'ước mơ nghề nghiệp'
    },
    correctAnswer: 'C',
    shortExplanation: 'sở thích (hoạt động yêu thích làm trong lúc rảnh rỗi như vẽ truyện)',
    detailedExplanation: 'Đoạn văn nói về "hoạt động thích làm khi rảnh rỗi" (vẽ truyện tranh), từ tiếng Anh tương ứng là "hobby" nghĩa là "sở thích".'
  },
  {
    id: 16,
    part: 'A',
    targetWord: 'crowded',
    targetWordType: 'Tính từ',
    passage: 'Vào buổi tối cuối tuần, phố đi bộ quanh hồ Gươm lúc nào cũng chật ních người qua lại. Không gian vô cùng **crowded** khiến Đông và bạn phải nắm chặt tay nhau để tránh bị lạc.',
    questionText: 'Từ "crowded" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'vắng vẻ',
      B: 'nguy hiểm',
      C: 'tối tăm',
      D: 'đông đúc'
    },
    correctAnswer: 'D',
    shortExplanation: 'đông đúc, chật chội (phố đi bộ chật ních người, dễ bị lạc)',
    detailedExplanation: 'Phố "chật ních người qua lại" và phải nắm tay "để tránh bị lạc" miêu tả khung cảnh vô cùng "đông đúc" (crowded, xuất phát từ crowd = đám đông).'
  },
  {
    id: 17,
    part: 'A',
    targetWord: 'buy',
    targetWordType: 'Động từ',
    passage: 'Chiếc bút mực của Đông bị hỏng ngòi nên không thể viết được nữa. Cậu ghé vào quầy tạp hóa đầu ngõ để **buy** một chiếc bút mới giá năm nghìn đồng.',
    questionText: 'Từ "buy" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'mua',
      B: 'vứt bỏ',
      C: 'sửa chữa',
      D: 'bẻ cong'
    },
    correctAnswer: 'A',
    shortExplanation: 'mua (trả tiền ở quầy tạp hóa để lấy cây bút mới)',
    detailedExplanation: 'Đông ghé quầy tạp hóa và trả "giá năm nghìn đồng" để lấy bút mới, hành động này chính là "mua" (buy).'
  },
  {
    id: 18,
    part: 'A',
    targetWord: 'carefully',
    targetWordType: 'Trạng từ',
    passage: 'Trước khi nộp bài kiểm tra học kỳ, thầy giáo dặn học sinh phải rà soát lại từng câu từ đầu đến cuối. Đông dành năm phút đọc lại **carefully** để không mắc lỗi chính tả ngớ ngẩn.',
    questionText: 'Từ "carefully" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'vội vàng',
      B: 'cẩn thận',
      C: 'ồn ào',
      D: 'tự do'
    },
    correctAnswer: 'B',
    shortExplanation: 'cẩn thận, kỹ lưỡng (đọc rà soát từng câu để không mắc lỗi ngớ ngẩn)',
    detailedExplanation: 'Rà soát từng câu để không bị mắc lỗi chính tả đòi hỏi sự "cẩn thận, chu đáo" (carefully).'
  },
  {
    id: 19,
    part: 'A',
    targetWord: 'invite',
    targetWordType: 'Động từ',
    passage: 'Chủ nhật tuần tới là sinh nhật tròn mười lăm tuổi của Đông. Cậu tự tay viết thiệp mừng để **invite** các bạn thân trong lớp đến nhà cùng ăn bánh kem và chung vui.',
    questionText: 'Từ "invite" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'đuổi về',
      B: 'khiển trách',
      C: 'mượn tiền',
      D: 'mời'
    },
    correctAnswer: 'D',
    shortExplanation: 'mời (viết thiệp rủ bạn bè đến dự tiệc sinh nhật)',
    detailedExplanation: 'Đông viết thiệp mừng để rủ bạn bè đến chung vui ngày sinh nhật, do đó động từ "invite" có nghĩa là "mời / mời tham dự".'
  },
  {
    id: 20,
    part: 'A',
    targetWord: 'journey',
    targetWordType: 'Danh từ',
    passage: 'Chuyến tàu hỏa đưa gia đình Đông về thăm quê hương kéo dài suốt sáu tiếng đồng hồ. Mặc dù ngồi lâu khá mệt nhưng đó là một **journey** rất đáng nhớ với nhiều cảnh đẹp hai bên đường.',
    questionText: 'Từ "journey" trong đoạn trên có nghĩa là gì?',
    options: {
      A: 'bức tranh',
      B: 'món quà',
      C: 'chuyến đi',
      D: 'nhà ga'
    },
    correctAnswer: 'C',
    shortExplanation: 'chuyến đi, hành trình (chuyến đi bằng tàu hỏa suốt 6 tiếng về quê)',
    detailedExplanation: 'Đi tàu hỏa suốt 6 tiếng về quê hương và ngắm cảnh đẹp hai bên đường miêu tả một "chuyến đi / cuộc hành trình" (journey).'
  },

  // ==========================================
  // PHẦN B: TỪ VỰNG VÀ NGỮ PHÁP CƠ BẢN (CÂU 21 - 40)
  // ==========================================
  // Nhóm 1: Câu 21-30 Từ vựng & cụm từ/giới từ thông dụng (max 15 từ)
  {
    id: 21,
    part: 'B',
    categoryTitle: 'Từ vựng cơ bản',
    sentence: 'My mother goes to the supermarket to ______ fresh vegetables every morning.',
    questionText: 'My mother goes to the supermarket to ______ fresh vegetables every morning.',
    options: {
      A: 'buy',
      B: 'paint',
      C: 'hear',
      D: 'run'
    },
    correctAnswer: 'A',
    shortExplanation: 'buy (động từ: mua rau tươi ở siêu thị)',
    detailedExplanation: 'Ngữ cảnh đến siêu thị (supermarket) để "mua" (buy) rau củ quả tươi (fresh vegetables). Các từ khác: paint (sơn/vẽ), hear (nghe), run (chạy) không hợp nghĩa.'
  },
  {
    id: 22,
    part: 'B',
    categoryTitle: 'Cụm động từ thông dụng',
    sentence: "I usually wake ______ at six o'clock every day.",
    questionText: "I usually wake ______ at six o'clock every day.",
    options: {
      A: 'on',
      B: 'up',
      C: 'in',
      D: 'to'
    },
    correctAnswer: 'B',
    shortExplanation: 'up (cụm từ cố định: wake up = thức dậy)',
    detailedExplanation: 'Cụm từ "wake up" là cụm động từ cực kỳ phổ biến có nghĩa là thức dậy lúc sáng sớm.'
  },
  {
    id: 23,
    part: 'B',
    categoryTitle: 'Giới từ đi kèm tính từ',
    sentence: 'Lan is very interested ______ reading books in her free time.',
    questionText: 'Lan is very interested ______ reading books in her free time.',
    options: {
      A: 'of',
      B: 'at',
      C: 'for',
      D: 'in'
    },
    correctAnswer: 'D',
    shortExplanation: 'in (cấu trúc cố định: be interested in = thích, quan tâm)',
    detailedExplanation: 'Cấu trúc rất hay thi vào lớp 10: "be interested IN + V-ing/N" nghĩa là hứng thú, yêu thích điều gì (ở đây là đọc sách).'
  },
  {
    id: 24,
    part: 'B',
    categoryTitle: 'Từ vựng lớp học',
    sentence: 'The teacher wrote the new lesson on the ______.',
    questionText: 'The teacher wrote the new lesson on the ______.',
    options: {
      A: 'shoe',
      B: 'spoon',
      C: 'board',
      D: 'blanket'
    },
    correctAnswer: 'C',
    shortExplanation: 'board (danh từ: bảng viết trong lớp học)',
    detailedExplanation: 'Giáo viên viết bài giảng mới lên "bảng" (board / blackboard). Các phương án khác: shoe (chiếc giày), spoon (cái thìa), blanket (cái chăn) không thể viết bài lên.'
  },
  {
    id: 25,
    part: 'B',
    categoryTitle: 'Giới từ chỉ thời gian liên kết',
    sentence: 'Nam listens to music to relax ______ a hard day at school.',
    questionText: 'Nam listens to music to relax ______ a hard day at school.',
    options: {
      A: 'over',
      B: 'after',
      C: 'under',
      D: 'between'
    },
    correctAnswer: 'B',
    shortExplanation: 'after (giới từ: after = sau khi / sau một ngày vất vả)',
    detailedExplanation: 'Nam nghe nhạc thư giãn "sau" (after) một ngày học tập vất vả ở trường. Under (ở dưới), between (ở giữa), over (qua/trên).'
  },
  {
    id: 26,
    part: 'B',
    categoryTitle: 'Từ vựng sức khỏe & thân thể',
    sentence: 'You should brush your ______ twice a day to keep them healthy.',
    questionText: 'You should brush your ______ twice a day to keep them healthy.',
    options: {
      A: 'hair',
      B: 'hands',
      C: 'knees',
      D: 'teeth'
    },
    correctAnswer: 'D',
    shortExplanation: 'teeth (brush teeth = đánh răng; số nhiều của tooth)',
    detailedExplanation: 'Cụm từ "brush teeth" nghĩa là đánh răng 2 lần mỗi ngày. Lưu ý "teeth" là số nhiều của "tooth". Với "hair" người ta dùng "brush hair" (chải tóc) nhưng vế sau dùng đại từ "them" chỉ số nhiều nên "teeth" là chính xác nhất.'
  },
  {
    id: 27,
    part: 'B',
    categoryTitle: 'Từ vựng đồ uống',
    sentence: 'My father often drinks a cup of hot ______ after dinner.',
    questionText: 'My father often drinks a cup of hot ______ after dinner.',
    options: {
      A: 'tea',
      B: 'soup',
      C: 'rice',
      D: 'bread'
    },
    correctAnswer: 'A',
    shortExplanation: 'tea (a cup of hot tea = một tách trà nóng)',
    detailedExplanation: 'Động từ "drinks" (uống) và lượng từ "a cup of..." (một tách...) kết hợp với "tea" (trà). Rice (cơm) và bread (bánh mì) là đồ ăn không dùng với "drinks".'
  },
  {
    id: 28,
    part: 'B',
    categoryTitle: 'Cụm động từ sinh hoạt',
    sentence: "Don't forget to turn ______ the lights before leaving the classroom.",
    questionText: "Don't forget to turn ______ the lights before leaving the classroom.",
    options: {
      A: 'on',
      B: 'in',
      C: 'off',
      D: 'up'
    },
    correctAnswer: 'C',
    shortExplanation: 'off (turn off = tắt đèn, tắt thiết bị điện)',
    detailedExplanation: 'Trước khi rời khỏi lớp học phải "tắt đèn" để tiết kiệm điện. Cụm từ tắt thiết bị điện là "turn off". (Ngược lại "turn on" là bật đèn).'
  },
  {
    id: 29,
    part: 'B',
    categoryTitle: 'Giới từ đi kèm tính từ',
    sentence: 'He is good ______ playing football with his friends.',
    questionText: 'He is good ______ playing football with his friends.',
    options: {
      A: 'with',
      B: 'for',
      C: 'on',
      D: 'at'
    },
    correctAnswer: 'D',
    shortExplanation: 'at (cấu trúc cố định: be good at + V-ing = giỏi làm gì)',
    detailedExplanation: 'Cấu trúc cơ bản lớp 6: "be good at something" nghĩa là giỏi/chơi hay môn thể thao hoặc kỹ năng nào đó (ở đây là đá bóng).'
  },
  {
    id: 30,
    part: 'B',
    categoryTitle: 'Từ vựng địa điểm trường học',
    sentence: 'We play football on the school ______ every Saturday afternoon.',
    questionText: 'We play football on the school ______ every Saturday afternoon.',
    options: {
      A: 'roof',
      B: 'field',
      C: 'kitchen',
      D: 'bedroom'
    },
    correctAnswer: 'B',
    shortExplanation: 'field (school field = sân bóng / sân thể thao của trường)',
    detailedExplanation: 'Học sinh đá bóng (play football) ở "sân trường / sân bãi" (school field/ground). Các nơi khác: roof (mái nhà), kitchen (nhà bếp), bedroom (phòng ngủ) hoàn toàn vô lý.'
  },

  // Nhóm 2: Câu 31-40: 10 chủ điểm ngữ pháp trọng tâm lớp 6–9 (mỗi chủ điểm 1 câu, max 15 từ)
  {
    id: 31,
    part: 'B',
    categoryTitle: 'Thì hiện tại đơn (Present Simple)',
    sentence: 'He ______ to school by bicycle every morning.',
    questionText: 'He ______ to school by bicycle every morning.',
    options: {
      A: 'goes',
      B: 'go',
      C: 'going',
      D: 'went'
    },
    correctAnswer: 'A',
    shortExplanation: 'goes (hiện tại đơn với chủ ngữ số ít He + V-es)',
    detailedExplanation: 'Dấu hiệu "every morning" (mỗi buổi sáng) chỉ thói quen lặp đi lặp lại -> thì hiện tại đơn. Chủ ngữ "He" là ngôi thứ 3 số ít nên động từ thêm -es: "goes".'
  },
  {
    id: 32,
    part: 'B',
    categoryTitle: 'Thì hiện tại tiếp diễn (Present Continuous)',
    sentence: 'Look! The children ______ in the playground right now.',
    questionText: 'Look! The children ______ in the playground right now.',
    options: {
      A: 'play',
      B: 'played',
      C: 'are playing',
      D: 'plays'
    },
    correctAnswer: 'C',
    shortExplanation: 'are playing (hiện tại tiếp diễn: Look! + right now; S số nhiều + are V-ing)',
    detailedExplanation: 'Có dấu hiệu "Look!" (Nhìn kìa!) và "right now" (ngay bây giờ) báo hiệu hành động đang diễn ra -> dùng thì hiện tại tiếp diễn (am/is/are + V-ing). "The children" là danh từ số nhiều (những đứa trẻ) -> dùng "are playing".'
  },
  {
    id: 33,
    part: 'B',
    categoryTitle: 'Thì quá khứ đơn (Past Simple)',
    sentence: 'Yesterday, my family ______ a famous museum in Hanoi.',
    questionText: 'Yesterday, my family ______ a famous museum in Hanoi.',
    options: {
      A: 'visit',
      B: 'visits',
      C: 'visiting',
      D: 'visited'
    },
    correctAnswer: 'D',
    shortExplanation: 'visited (quá khứ đơn với dấu hiệu Yesterday + V-ed)',
    detailedExplanation: 'Dấu hiệu "Yesterday" (ngày hôm qua) chỉ hành động đã xảy ra và kết thúc trong quá khứ -> thì quá khứ đơn. Động từ có quy tắc thêm -ed: "visited".'
  },
  {
    id: 34,
    part: 'B',
    categoryTitle: 'Thì hiện tại hoàn thành (Present Perfect)',
    sentence: 'I have ______ this funny movie three times.',
    questionText: 'I have ______ this funny movie three times.',
    options: {
      A: 'see',
      B: 'seen',
      C: 'saw',
      D: 'seeing'
    },
    correctAnswer: 'B',
    shortExplanation: 'seen (hiện tại hoàn thành: have + V3/ed; see -> saw -> seen)',
    detailedExplanation: 'Cấu trúc thì hiện tại hoàn thành: S + have/has + V3/V-ed (phân từ 2). Động từ bất quy tắc của "see" ở cột 3 là "seen".'
  },
  {
    id: 35,
    part: 'B',
    categoryTitle: 'So sánh hơn tính từ ngắn (Comparative)',
    sentence: 'This blue bicycle is ______ than that red one.',
    questionText: 'This blue bicycle is ______ than that red one.',
    options: {
      A: 'cheaper',
      B: 'cheapest',
      C: 'cheap',
      D: 'more cheap'
    },
    correctAnswer: 'A',
    shortExplanation: 'cheaper (so sánh hơn với tính từ ngắn có "than": adj-er + than)',
    detailedExplanation: 'Có từ so sánh "than" giữa 2 đồ vật (xe xanh và xe đỏ) -> dùng so sánh hơn. Tính từ "cheap" là tính từ ngắn 1 âm tiết, nên thêm đuôi -er thành "cheaper". "Cheapest" là so sánh nhất (cần có "the").'
  },
  {
    id: 36,
    part: 'B',
    categoryTitle: 'Câu điều kiện loại 1 (Conditional Type 1)',
    sentence: 'If it rains tomorrow, we ______ at home.',
    questionText: 'If it rains tomorrow, we ______ at home.',
    options: {
      A: 'stay',
      B: 'stayed',
      C: 'will stay',
      D: 'staying'
    },
    correctAnswer: 'C',
    shortExplanation: 'will stay (câu điều kiện loại 1: If + HTĐ, S + will + V-nguyên thể)',
    detailedExplanation: 'Công thức câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở tương lai: If + S + V(hiện tại đơn), S + will + V(nguyên thể). Vế If đã có "rains", vế chính cần "will stay".'
  },
  {
    id: 37,
    part: 'B',
    categoryTitle: 'Mạo từ a / an / the (Articles)',
    sentence: 'She wants to eat ______ apple after lunch.',
    questionText: 'She wants to eat ______ apple after lunch.',
    options: {
      A: 'a',
      B: 'the',
      C: 'these',
      D: 'an'
    },
    correctAnswer: 'D',
    shortExplanation: 'an (mạo từ "an" đứng trước danh từ đếm được số ít bắt đầu bằng nguyên âm)',
    detailedExplanation: 'Từ "apple" (quả táo) là danh từ số ít, bắt đầu bằng nguyên âm [æ] (chữ a trong mẹo u-e-o-a-i / uể oải) -> dùng mạo từ "an". "A" dùng trước phụ âm.'
  },
  {
    id: 38,
    part: 'B',
    categoryTitle: 'Cấu trúc There is / There are',
    sentence: '______ four books on the table.',
    questionText: '______ four books on the table.',
    options: {
      A: 'There are',
      B: 'There is',
      C: 'There has',
      D: 'There have'
    },
    correctAnswer: 'A',
    shortExplanation: 'There are (dùng "There are" với danh từ số nhiều "four books")',
    detailedExplanation: 'Sau chỗ trống là "four books" (bốn quyển sách) - danh từ số nhiều -> dùng "There are". "There is" chỉ dùng với danh từ số ít (ví dụ: one book).'
  },
  {
    id: 39,
    part: 'B',
    categoryTitle: 'Tính từ sở hữu (Possessive Adjectives)',
    sentence: 'This is my brother. ______ name is Minh.',
    questionText: 'This is my brother. ______ name is Minh.',
    options: {
      A: 'Him',
      B: 'His',
      C: 'He',
      D: 'Her'
    },
    correctAnswer: 'B',
    shortExplanation: 'His (tính từ sở hữu của nam giới: his name = tên của anh ấy)',
    detailedExplanation: 'Đứng trước danh từ "name" cần một tính từ sở hữu. "Brother" là bạn nam -> dùng tính từ sở hữu "His" (của anh ấy/cậu ấy). "Her" là của bạn nữ. "He" là đại từ chủ ngữ.'
  },
  {
    id: 40,
    part: 'B',
    categoryTitle: 'Giới từ chỉ thời gian (Prepositions of Time)',
    sentence: 'The English test will start ______ 8 o\'clock tomorrow morning.',
    questionText: 'The English test will start ______ 8 o\'clock tomorrow morning.',
    options: {
      A: 'in',
      B: 'on',
      C: 'at',
      D: 'for'
    },
    correctAnswer: 'C',
    shortExplanation: 'at (dùng "at" trước mốc giờ cụ thể: at 8 o\'clock)',
    detailedExplanation: 'Quy tắc giới từ thời gian kinh điển: "in năm, in tháng, in mùa - on ngày, on thứ - at giờ không sai". Với mốc giờ chính xác "8 o\'clock" bắt buộc dùng giới từ "at".'
  }
];

export const VOCABULARY_LIST_PART_A: VocabularyItem[] = [
  {
    id: 1,
    word: 'library',
    wordType: 'Danh từ',
    meaning: 'thư viện',
    ipa: '/ˈlaɪbrəri/',
    example: 'I borrow books from the school library.',
    vietnameseExample: 'Tôi mượn sách từ thư viện của trường.',
    memoryTip: 'Chứa từ "libra" giống quyển sách mở ra trên bàn đọc yên tĩnh.'
  },
  {
    id: 2,
    word: 'clean',
    wordType: 'Động từ',
    meaning: 'dọn dẹp, lau chùi (làm sạch)',
    ipa: '/kliːn/',
    example: 'He helps his mother clean the bedroom.',
    vietnameseExample: 'Cậu ấy giúp mẹ dọn dẹp phòng ngủ.',
    memoryTip: 'Khi dọn dẹp (clean) xong thì căn phòng sẽ sáng sủa, sạch tinh tươm.'
  },
  {
    id: 3,
    word: 'delicious',
    wordType: 'Tính từ',
    meaning: 'ngon miệng, thơm ngon',
    ipa: '/dɪˈlɪʃəs/',
    example: 'This beef noodle soup is very delicious.',
    vietnameseExample: 'Món phở bò này rất ngon miệng.',
    memoryTip: 'Ăn món ngon thì ta nói "đê mê" -> delicious (ngon tuyệt cú mèo).'
  },
  {
    id: 4,
    word: 'uniform',
    wordType: 'Danh từ',
    meaning: 'đồng phục',
    ipa: '/ˈjuːnɪfɔːm/',
    example: 'Students must wear school uniform on Mondays.',
    vietnameseExample: 'Học sinh phải mặc đồng phục trường vào các ngày thứ Hai.',
    memoryTip: '"Uni" nghĩa là một, thống nhất -> trang phục mặc thống nhất cả trường là đồng phục.'
  },
  {
    id: 5,
    word: 'borrow',
    wordType: 'Động từ',
    meaning: 'mượn (xin dùng tạm)',
    ipa: '/ˈbɒrəʊ/',
    example: 'Can I borrow your ruler for a minute?',
    vietnameseExample: 'Mình có thể mượn thước kẻ của bạn một lát được không?',
    memoryTip: 'Quên đồ thì quay sang bạn "borrow" mượn tạm rồi nhớ cảm ơn và trả lại.'
  },
  {
    id: 6,
    word: 'breakfast',
    wordType: 'Danh từ',
    meaning: 'bữa ăn sáng',
    ipa: '/ˈbrekfəst/',
    example: 'I usually have bread and milk for breakfast.',
    vietnameseExample: 'Tôi thường ăn bánh mì và uống sữa cho bữa sáng.',
    memoryTip: 'Break (phá vỡ) + fast (nhịn đói qua đêm) -> bữa ăn đầu tiên phá vỡ cơn đói là bữa sáng.'
  },
  {
    id: 7,
    word: 'friendly',
    wordType: 'Tính từ',
    meaning: 'thân thiện, cởi mở',
    ipa: '/ˈfrendli/',
    example: 'The new student is very friendly and kind.',
    vietnameseExample: 'Bạn học sinh mới rất thân thiện và tốt bụng.',
    memoryTip: 'Bắt nguồn từ chữ "friend" (bạn bè) -> tính cách hay làm bạn, dễ mến là thân thiện.'
  },
  {
    id: 8,
    word: 'cook',
    wordType: 'Động từ',
    meaning: 'nấu ăn, nấu nướng',
    ipa: '/kʊk/',
    example: 'My brother learns to cook rice and soup.',
    vietnameseExample: 'Anh trai tôi học cách nấu cơm và canh.',
    memoryTip: 'Đầu bếp hay người nấu ăn là "cooker"? Không, cook vừa là động từ nấu vừa là đầu bếp!'
  },
  {
    id: 9,
    word: 'market',
    wordType: 'Danh từ',
    meaning: 'khu chợ',
    ipa: '/ˈmɑːkɪt/',
    example: 'Grandmother goes to the market to buy fresh fish.',
    vietnameseExample: 'Bà ngoại đi chợ để mua cá tươi.',
    memoryTip: 'Siêu thị là supermarket (chợ siêu to), vậy market đơn giản là khu chợ truyền thống.'
  },
  {
    id: 10,
    word: 'quickly',
    wordType: 'Trạng từ',
    meaning: 'nhanh chóng, mau lẹ',
    ipa: '/ˈkwɪkli/',
    example: 'He packed his bag quickly before it rained.',
    vietnameseExample: 'Cậu ấy gói ghém cặp sách nhanh chóng trước khi trời mưa.',
    memoryTip: 'Quick (nhanh) + đuôi trạng từ -ly = một cách nhanh chóng.'
  },
  {
    id: 11,
    word: 'difficult',
    wordType: 'Tính từ',
    meaning: 'khó khăn, hóc búa',
    ipa: '/ˈdɪfɪkəlt/',
    example: 'Math is a difficult subject for many students.',
    vietnameseExample: 'Toán học là một môn khó với nhiều học sinh.',
    memoryTip: 'Trái nghĩa với "easy" (dễ dàng) là "difficult" (khó khăn).'
  },
  {
    id: 12,
    word: 'travel',
    wordType: 'Động từ',
    meaning: 'đi du lịch, đi xa',
    ipa: '/ˈtrævl/',
    example: 'My family loves to travel to Da Nang in summer.',
    vietnameseExample: 'Gia đình tôi rất thích đi du lịch Đà Nẵng vào mùa hè.',
    memoryTip: 'Xách vali lên và đi trải nghiệm muôn nơi là travel.'
  },
  {
    id: 13,
    word: 'weather',
    wordType: 'Danh từ',
    meaning: 'thời tiết (mưa, nắng, gió...)',
    ipa: '/ˈweðər/',
    example: 'The weather in Hanoi is sunny and warm today.',
    vietnameseExample: 'Thời tiết ở Hà Nội hôm nay nhiều nắng và ấm áp.',
    memoryTip: 'Câu hỏi quen thuộc: "What is the weather like today?" (Hôm nay thời tiết thế nào?)'
  },
  {
    id: 14,
    word: 'listen',
    wordType: 'Động từ',
    meaning: 'lắng nghe',
    ipa: '/ˈlɪsn/',
    example: 'Please listen to the teacher carefully.',
    vietnameseExample: 'Xin vui lòng lắng nghe thầy giáo thật chăm chú.',
    memoryTip: 'Chữ "t" trong listen là âm câm, phát âm nhẹ nhàng là /ˈlɪsn/.'
  },
  {
    id: 15,
    word: 'hobby',
    wordType: 'Danh từ',
    meaning: 'sở thích khi rảnh rỗi',
    ipa: '/ˈhɒbi/',
    example: 'Playing football is his favorite hobby.',
    vietnameseExample: 'Chơi bóng đá là sở thích yêu thích nhất của cậu ấy.',
    memoryTip: 'Hỏi về sở thích: "What is your hobby?" (Sở thích của bạn là gì?)'
  },
  {
    id: 16,
    word: 'crowded',
    wordType: 'Tính từ',
    meaning: 'đông đúc, đông người',
    ipa: '/ˈkraʊdɪd/',
    example: 'The night market is always crowded on weekends.',
    vietnameseExample: 'Chợ đêm lúc nào cũng đông đúc vào các ngày cuối tuần.',
    memoryTip: 'Crowd là đám đông -> crowded là tính từ chỉ nơi chốn chật ních đông người.'
  },
  {
    id: 17,
    word: 'buy',
    wordType: 'Động từ',
    meaning: 'mua sắm',
    ipa: '/baɪ/',
    example: 'I need to buy a new pen at the bookstore.',
    vietnameseExample: 'Tôi cần mua một cây bút mới ở hiệu sách.',
    memoryTip: 'Đưa tiền để nhận món đồ về là "buy" (trái nghĩa với sell - bán).'
  },
  {
    id: 18,
    word: 'carefully',
    wordType: 'Trạng từ',
    meaning: 'cẩn thận, chu đáo',
    ipa: '/ˈkeəfəli/',
    example: 'You must check your test answers carefully.',
    vietnameseExample: 'Em phải kiểm tra lại đáp án bài thi thật cẩn thận.',
    memoryTip: 'Careful (cẩn thận) + ly = làm việc gì đó một cách cẩn trọng, tỉ mỉ.'
  },
  {
    id: 19,
    word: 'invite',
    wordType: 'Động từ',
    meaning: 'mời (mời đến nhà, mời dự tiệc)',
    ipa: '/ɪnˈvaɪt/',
    example: 'He will invite his friends to his birthday party.',
    vietnameseExample: 'Cậu ấy sẽ mời các bạn thân đến tiệc sinh nhật của mình.',
    memoryTip: 'Gửi thiệp mời đám cưới hay sinh nhật là động từ invite (danh từ invitation).'
  },
  {
    id: 20,
    word: 'journey',
    wordType: 'Danh từ',
    meaning: 'chuyến đi, cuộc hành trình',
    ipa: '/ˈdʒɜːni/',
    example: 'The train journey to our hometown took six hours.',
    vietnameseExample: 'Chuyến đi tàu hỏa về quê hương của chúng tôi mất sáu tiếng.',
    memoryTip: 'Hành trình dài trải nghiệm đường dài bằng tàu hay xe khách gọi là journey.'
  }
];

// Sinh văn bản đề thi và đáp án chuẩn theo đúng yêu cầu đề bài
export function generatePlainTextExam(): string {
  let output = `${EXAM_TITLE}\n`;
  output += `Thời gian làm bài: ${EXAM_DURATION_MINUTES} phút\n`;
  output += `Học sinh: ${STUDENT_NAME} | Mục tiêu: ${TARGET_EXAM}\n\n`;

  output += `=== PHẦN A (câu 1–20): ĐOÁN NGHĨA TỪ TIẾNG ANH TỪ NGỮ CẢNH ===\n\n`;
  QUESTIONS.slice(0, 20).forEach(q => {
    output += `Câu ${q.id}: ${q.passage}\n`;
    output += `${q.questionText}\n`;
    output += `A. ${q.options.A}    B. ${q.options.B}    C. ${q.options.C}    D. ${q.options.D}\n\n`;
  });

  output += `=== PHẦN B (câu 21–40): TỪ VỰNG VÀ NGỮ PHÁP CƠ BẢN ===\n\n`;
  output += `--- Từ vựng và cụm từ thông dụng (câu 21–30) ---\n\n`;
  QUESTIONS.slice(20, 30).forEach(q => {
    output += `Câu ${q.id}: ${q.questionText}\n`;
    output += `A. ${q.options.A}    B. ${q.options.B}    C. ${q.options.C}    D. ${q.options.D}\n\n`;
  });

  output += `--- Ngữ pháp cơ bản lớp 6–9 (câu 31–40) ---\n\n`;
  QUESTIONS.slice(30, 40).forEach(q => {
    output += `Câu ${q.id}: ${q.questionText}\n`;
    output += `A. ${q.options.A}    B. ${q.options.B}    C. ${q.options.C}    D. ${q.options.D}\n\n`;
  });

  output += `---------------------------------------------------\n`;
  output += `=== ĐÁP ÁN ===\n\n`;
  output += `a. Chuỗi đáp án đúng 40 ký tự:\n${ANSWER_KEY_STRING}\n\n`;

  output += `b. Bảng chi tiết đáp án và giải thích:\n`;
  output += `Số câu | Đáp án | Nghĩa tiếng Việt (Phần A) hoặc giải thích ngắn (Phần B)\n`;
  output += `-------|--------|--------------------------------------------------------\n`;
  QUESTIONS.forEach(q => {
    const padNum = q.id < 10 ? `Câu  ${q.id}` : `Câu ${q.id}`;
    output += `${padNum} |   ${q.correctAnswer}    | ${q.shortExplanation}\n`;
  });

  output += `\n---------------------------------------------------\n`;
  output += `=== DANH SÁCH 20 TỪ TIẾNG ANH PHẦN A (DÀNH CHO GIÁO VIÊN ÔN TẬP) ===\n\n`;
  output += `Từ | Loại từ | Nghĩa tiếng Việt\n`;
  output += `---|---------|-----------------\n`;
  VOCABULARY_LIST_PART_A.forEach(item => {
    output += `${item.word.padEnd(12)} | ${item.wordType.padEnd(8)} | ${item.meaning}\n`;
  });

  return output;
}
