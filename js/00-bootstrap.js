// Fix viewport height cho Android Chrome (address bar)
(function(){
  function setVH(){
    var vh=window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh',vh+'px');
  }
  setVH();
  window.addEventListener('resize',setVH);
  window.addEventListener('orientationchange',function(){setTimeout(setVH,200);});
})();

// Dọn ngay phần tử badge nổi kiểu cũ (#notifBadge, position:fixed đè lên góc
// phải màn hình — đúng chỗ ô thời tiết) nếu trình duyệt còn giữ bản HTML/JS
// cache cũ tạo ra nó trước khi bản vá mới kịp chạy. Chạy sớm nhất có thể,
// không phụ thuộc vào lúc nào có thông báo mới.
(function(){
  function _cleanLegacyBadge(){
    var old=document.getElementById('notifBadge');
    if(old&&old.parentNode) old.parentNode.removeChild(old);
  }
  _cleanLegacyBadge();
  document.addEventListener('DOMContentLoaded',_cleanLegacyBadge);
})();

// Áp dụng ORG_CONFIG vào title sau khi script load
document.addEventListener('DOMContentLoaded',function(){
  if(typeof ORG_CONFIG==='undefined') return;
  document.title='Lịch Làm Việc Số – '+ORG_CONFIG.tenCoQuan;
  // Header viewer
  var els={
    'orgCapVs':ORG_CONFIG.capCoQuan,
    'orgTenVs':ORG_CONFIG.tenCoQuan,
    'orgCapAdmin':ORG_CONFIG.capCoQuan,
    'orgTenAdmin':ORG_CONFIG.tenCoQuan,
    'orgCapTv':ORG_CONFIG.capCoQuan,
    'orgTenTv':ORG_CONFIG.tenCoQuan,
    'orgLogin':ORG_CONFIG.tenCoQuan,
  };
  Object.keys(els).forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.textContent=els[id];
  });
  // Credit — esc() từ js/00-utils.js (load trước)
  var _safeNg = (typeof esc === 'function') ? esc(ORG_CONFIG.nguoiPhuTrach) : ORG_CONFIG.nguoiPhuTrach;
  var _safeDv = (typeof esc === 'function') ? esc(ORG_CONFIG.donVi) : ORG_CONFIG.donVi;
  var _safeSdt= (typeof esc === 'function') ? esc(ORG_CONFIG.soDienThoai) : ORG_CONFIG.soDienThoai;
  var _safeTen= (typeof esc === 'function') ? esc(ORG_CONFIG.tenCoQuan) : ORG_CONFIG.tenCoQuan;
  var credit='✍️ <strong>Ông Hồ Phúc Long</strong>, Chánh Văn phòng HĐND và UBND xã Tây Trà &nbsp;|&nbsp; 📱 <strong>0398.704.755</strong>';
  ['vsCredit','adminCredit','tvGcCredit'].forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.innerHTML=credit;
  });
  // TV gc note
  var gcNote=document.getElementById('tvGcNote');
  if(gcNote) gcNote.innerHTML='📋 <strong>Ghi chú:</strong> Ngoài thời gian đã bố trí, các đồng chí Lãnh đạo '+_safeTen+' xử lý công việc tại cơ quan.';
  // TV wx meta
  var wxMeta=document.getElementById('tvWxMeta');
  if(wxMeta) wxMeta.textContent='📍 '+ORG_CONFIG.tenCoQuan;
});
