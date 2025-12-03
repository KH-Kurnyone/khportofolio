// ----- Running text di hero section
const words = ['Student...', 'Programmer...'];
let currentWord = 0;
let currentChar = 0;
const typingText = document.getElementById('typingText');

function type() {
  const word = words[currentWord];
  typingText.textContent = word.slice(0, currentChar);

  if (currentChar < word.length) {
    currentChar++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500); // Delay sebelum menghapus
  }
}

function erase() {
  const word = words[currentWord];
  typingText.textContent = word.slice(0, currentChar);

  if (currentChar > 0) {
    currentChar--;
    setTimeout(erase, 50);
  } else {
    currentWord = (currentWord + 1) % words.length;
    setTimeout(type, 500); // Delay sebelum mengetik kata berikutnya
  }
}

// Mulai animasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  type();
});

// ----- Header
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.remove('bg-transparent');
    header.classList.add(
      'bg-gradient-to-r',
      'from-indigo-800/80', // transparan
      'to-indigo-950/80', // transparan
      'shadow-md',
      'shadow-gray-800',
      'backdrop-blur-md' // efek blur
    );
  } else {
    header.classList.remove('bg-gradient-to-r', 'from-indigo-800/80', 'to-indigo-950/80', 'shadow-md', 'shadow-gray-800', 'backdrop-blur-md');
    header.classList.add('bg-transparent');
  }
});

// ----- Scroll navbar di header smooth
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = 'homeSection'; // default jika tidak ada section yang terdeteksi
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('border-b-2', 'border-gray-50', 'text-gray-400');
    link.classList.add('hover:border-b-2', 'hover:border-gray-400', 'hover:text-gray-400');

    if (link.getAttribute('href').includes(current)) {
      link.classList.add('border-b-2', 'border-gray-50');
      link.classList.remove('hover:border-b-2', 'hover:border-gray-400', 'hover:text-gray-400');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('DOMContentLoaded', setActiveLink); // set default saat halaman dimuat

document.querySelectorAll('a.nav-link').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// ----- Tab skill dan riwayat pendidikan di section 2
const btnSkills = document.getElementById('btnTabSkills');
const btnEdu = document.getElementById('btnTabEducational');
const btnAnother = document.getElementById('btnTabAnother');

const tabSkills = document.getElementById('tabSkills');
const tabEdu = document.getElementById('tabEducational');
const tabAnother = document.getElementById('tabAnother');

// Kumpulkan semua tab & tombol
const tabs = [tabSkills, tabEdu, tabAnother];
const buttonsTab = [btnSkills, btnEdu, btnAnother];

function switchTab(showTab, activeBtn) {
  // Loop semua tab dan tombol
  tabs.forEach((tab) => {
    if (tab === showTab) {
      tab.classList.remove('opacity-0', 'pointer-events-none', 'h-0', 'overflow-hidden');
      tab.classList.add('opacity-100');
    } else {
      tab.classList.remove('opacity-100');
      tab.classList.add('opacity-0', 'pointer-events-none', 'h-0', 'overflow-hidden');
    }
  });

  buttonsTab.forEach((btn) => {
    if (btn === activeBtn) {
      btn.classList.add('text-indigo-500', 'border-b-2', 'border-indigo-500');
      btn.classList.remove('hover:text-gray-400', 'hover:border-b-2', 'hover:border-gray-400');
    } else {
      btn.classList.remove('text-indigo-500', 'border-b-2', 'border-indigo-500');
      btn.classList.add('hover:text-gray-400', 'hover:border-b-2', 'hover:border-gray-400');
    }
  });
}

// Event listener
if (btnSkills && tabSkills) btnSkills.addEventListener('click', () => switchTab(tabSkills, btnSkills));
if (btnEdu && tabEdu) btnEdu.addEventListener('click', () => switchTab(tabEdu, btnEdu));
if (btnAnother && tabAnother) btnAnother.addEventListener('click', () => switchTab(tabAnother, btnAnother));

// ----- Tab pengalaman (Magang vs Organisasi) di section pengalaman
const btnTabMagang = document.getElementById('btnTabMagang');
const btnTabOrganisasi = document.getElementById('btnTabOrganisasi');
const tabMagang = document.getElementById('tabMagang');
const tabOrganisasi = document.getElementById('tabOrganisasi');

if (btnTabMagang && btnTabOrganisasi && tabMagang && tabOrganisasi) {
  function switchExperience(showTab, hideTab, activeBtn, inactiveBtn) {
    // Tampilkan tab yang dipilih, sembunyikan yang lain
    showTab.classList.remove('hidden');
    hideTab.classList.add('hidden');

    // Update style tombol aktif/non-aktif
    activeBtn.classList.add('text-indigo-500', 'border-b-2', 'border-indigo-500');
    activeBtn.classList.remove('hover:text-gray-400', 'hover:border-b-2', 'hover:border-gray-400');

    inactiveBtn.classList.remove('text-indigo-500', 'border-b-2', 'border-indigo-500');
    inactiveBtn.classList.add('hover:text-gray-400', 'hover:border-b-2', 'hover:border-gray-400');
  }

  btnTabOrganisasi.addEventListener('click', () => switchExperience(tabOrganisasi, tabMagang, btnTabOrganisasi, btnTabMagang));
  btnTabMagang.addEventListener('click', () => switchExperience(tabMagang, tabOrganisasi, btnTabMagang, btnTabOrganisasi));
}

// ----- Carousel quote
const quotes = Array.from({ length: 3 }, (_, i) => document.getElementById(`quote${i + 1}`));
const buttons = Array.from({ length: 3 }, (_, i) => document.getElementById(`btnQuote${i + 1}`));
let currentQuote = 0;

function showQuote(nextIndex) {
  if (nextIndex === currentQuote) return;

  const current = quotes[currentQuote];
  const next = quotes[nextIndex];

  // Mulai fade out yang lama
  current.classList.remove('opacity-100');
  current.classList.add('opacity-0');
  current.classList.add('pointer-events-none');

  // Fade in yang baru
  next.classList.remove('opacity-0');
  next.classList.add('opacity-100');
  next.classList.remove('pointer-events-none');

  // Update indikator bulat
  buttons.forEach((btn, i) => {
    btn.classList.toggle('bg-indigo-600', i === nextIndex);
    btn.classList.toggle('bg-gray-400', i !== nextIndex);
  });

  currentQuote = nextIndex;
}

// Event listener tombol bulat
buttons.forEach((btn, i) => btn.addEventListener('click', () => showQuote(i)));

// Event tombol panah
document.getElementById('btnNext').addEventListener('click', () => {
  const nextIndex = (currentQuote + 1) % quotes.length;
  showQuote(nextIndex);
});

document.getElementById('btnPrevious').addEventListener('click', () => {
  const prevIndex = (currentQuote - 1 + quotes.length) % quotes.length;
  showQuote(prevIndex);
});

// ----- Tab list project di section proyek
const btnProject1 = document.getElementById('btnProject1');
const btnProject2 = document.getElementById('btnProject2');
const tabProject1 = document.getElementById('tabProject1');

btnProject1.addEventListener('click', function () {
  tabProject1.classList.remove('hidden');
  tabProject2.classList.add('hidden');

  // Optional: ubah border tombol aktif
  btnProject1.classList.replace('border-gray-300', 'border-indigo-700');
  btnProject2.classList.replace('border-indigo-700', 'border-gray-300');
});

btnProject2.addEventListener('click', function () {
  tabProject2.classList.remove('hidden');
  tabProject1.classList.add('hidden');

  // Optional: ubah border tombol aktif
  btnProject2.classList.replace('border-gray-300', 'border-indigo-700');
  btnProject1.classList.replace('border-indigo-700', 'border-gray-300');
});

for (let i = 1; i <= 7; i++) {
  const btn = document.getElementById(`btnRow${i}`);
  const content = document.getElementById(`contentRow${i}`);
  const icon = document.getElementById(`iconRow${i}`);

  btn.addEventListener('click', function () {
    for (let j = 1; j <= 7; j++) {
      const otherBtn = document.getElementById(`btnRow${j}`);
      const otherContent = document.getElementById(`contentRow${j}`);
      const otherIcon = document.getElementById(`iconRow${j}`);

      if (j !== i) {
        otherContent.classList.add('hidden');
        otherBtn.classList.remove('text-indigo-700');
        otherIcon.classList.remove('fa-chevron-up');
        otherIcon.classList.add('fa-chevron-down');
      }
    }

    // Toggle the clicked one
    content.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
    btn.classList.toggle('text-indigo-700');
  });
}
