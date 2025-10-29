// Ana uygulama sınıfı
class LabGuideApp {
    constructor() {
        this.currentTopics = [];
        this.filteredTopics = [];
        this.searchTerm = '';
        this.selectedCategory = '';
        this.selectedModule = '';
        
        this.init();
    }

    // Uygulamayı başlat
    init() {
        this.loadAllTopics();
        this.setupEventListeners();
        this.populateFilters();
        this.displayTopics();
        this.updateSearchStats();
    }

    // Tüm konuları yükle
    loadAllTopics() {
        this.currentTopics = getAllTopics();
        this.filteredTopics = [...this.currentTopics];
    }

    // Event listener'ları kur
    setupEventListeners() {
        // Arama input'u
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        clearSearch.addEventListener('click', () => {
            this.clearSearch();
        });

        // Filtreler
        const categoryFilter = document.getElementById('categoryFilter');
        const moduleFilter = document.getElementById('moduleFilter');
        
        categoryFilter.addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
            this.applyFilters();
        });
        
        moduleFilter.addEventListener('change', (e) => {
            this.selectedModule = e.target.value;
            this.applyFilters();
        });

        // Modal event'leri
        const modal = document.getElementById('topicModal');
        const closeModal = document.getElementById('closeModal');
        
        closeModal.addEventListener('click', () => {
            this.closeModal();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // ESC tuşu ile modal'ı kapat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Filtreleri doldur
    populateFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const categories = getCategories();
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Arama işlemi
    handleSearch(term) {
        this.searchTerm = term.toLowerCase().trim();
        
        // Clear button'ı göster/gizle
        const clearBtn = document.getElementById('clearSearch');
        clearBtn.style.display = this.searchTerm ? 'block' : 'none';
        
        this.applyFilters();
    }

    // Aramayı temizle
    clearSearch() {
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearSearch');
        
        searchInput.value = '';
        clearBtn.style.display = 'none';
        this.searchTerm = '';
        
        this.applyFilters();
        searchInput.focus();
    }

    // Filtreleri uygula
    applyFilters() {
        let filtered = [...this.currentTopics];

        // Modül filtresi
        if (this.selectedModule) {
            if (this.selectedModule === 'mikrobiyoloji') {
                filtered = filtered.filter(topic => topic.id <= 69);
            } else if (this.selectedModule === 'biyokimya') {
                filtered = filtered.filter(topic => topic.id >= 70);
            }
        }

        // Kategori filtresi
        if (this.selectedCategory) {
            filtered = filtered.filter(topic => 
                topic.category === this.selectedCategory
            );
        }

        // Arama filtresi
        if (this.searchTerm) {
            filtered = filtered.filter(topic => {
                const titleMatch = topic.title.toLowerCase().includes(this.searchTerm);
                const categoryMatch = topic.category.toLowerCase().includes(this.searchTerm);
                const pageMatch = topic.page.toString().includes(this.searchTerm);
                
                return titleMatch || categoryMatch || pageMatch;
            });
        }

        this.filteredTopics = filtered;
        this.displayTopics();
        this.updateSearchStats();
    }

    // Konuları görüntüle
    displayTopics() {
        const container = document.getElementById('topicsContainer');
        const noResults = document.getElementById('noResults');
        
        // Konteyner'ı temizle
        container.innerHTML = '';
        
        if (this.filteredTopics.length === 0) {
            container.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        noResults.style.display = 'none';
        
        // Konuları oluştur
        this.filteredTopics.forEach((topic, index) => {
            const topicCard = this.createTopicCard(topic, index);
            container.appendChild(topicCard);
        });
    }

    // Konu kartı oluştur
    createTopicCard(topic, index) {
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        // Modül belirleme
        const module = topic.id <= 69 ? 'mikrobiyoloji' : 'biyokimya';
        const moduleText = topic.id <= 69 ? 'Mikrobiyoloji' : 'Biyokimya';
        
        card.innerHTML = `
            <div class="topic-header">
                <h3 class="topic-title">${this.highlightSearchTerm(topic.title)}</h3>
                <span class="topic-page">Sayfa ${topic.page}</span>
            </div>
            <div class="topic-meta">
                <span class="topic-category">${this.highlightSearchTerm(topic.category)}</span>
                <span class="topic-module ${module}">${moduleText}</span>
            </div>
        `;
        
        // Click event'i ekle - Direkt PDF'e git
        card.addEventListener('click', () => {
            this.openPdfAtPage(topic.page, topic.title);
        });
        
        // Keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openPdfAtPage(topic.page, topic.title);
            }
        });
        
        return card;
    }

    // PDF'i belirli sayfada aç
    openPdfAtPage(pageNumber, topicTitle) {
        // PDF URL'sini sayfa numarası ile oluştur
        const pdfUrl = `./belge.pdf#page=${pageNumber}`;
        
        // Yeni sekmede PDF'i aç
        const newWindow = window.open(pdfUrl, '_blank');
        
        // Eğer popup engellenirse kullanıcıya bilgi ver
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // Popup engellenmiş, alternatif yöntem kullan
            this.showPdfAccessModal(pageNumber, topicTitle);
        } else {
            // PDF açıldığında kullanıcıya bildirim göster
            this.showNotification(`"${topicTitle}" konusu için PDF'in ${pageNumber}. sayfası açılıyor...`);
        }
        
        // Analytics için konu görüntüleme kaydı
        this.trackTopicAccess(topicTitle, pageNumber);
    }

    // PDF erişim modal'ı göster (popup engellendiğinde)
    showPdfAccessModal(pageNumber, topicTitle) {
        const modal = document.getElementById('topicModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalPage = document.getElementById('modalPage');
        const modalCategory = document.getElementById('modalCategory');
        const modalDescription = document.getElementById('modalDescription');
        
        // Modal içeriğini PDF erişimi için güncelle
        modalTitle.textContent = topicTitle;
        modalPage.textContent = `Sayfa ${pageNumber}`;
        modalPage.className = 'topic-page';
        modalCategory.textContent = 'PDF Erişimi';
        modalCategory.className = 'topic-category';
        
        modalDescription.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                <h3 style="margin-bottom: 1rem; color: var(--text-primary);">PDF Belgesini Açın</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    "<strong>${topicTitle}</strong>" konusu için PDF belgesinin <strong>${pageNumber}. sayfasına</strong> yönlendirileceksiniz.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="./belge.pdf#page=${pageNumber}" target="_blank" 
                       style="background-color: var(--primary-color); color: white; padding: 0.75rem 1.5rem; 
                              border-radius: var(--radius-md); text-decoration: none; font-weight: 500;
                              transition: var(--transition); display: inline-block;">
                        📖 PDF'i Sayfa ${pageNumber}'da Aç
                    </a>
                    <a href="./belge.pdf" target="_blank" 
                       style="background-color: var(--secondary-color); color: white; padding: 0.75rem 1.5rem; 
                              border-radius: var(--radius-md); text-decoration: none; font-weight: 500;
                              transition: var(--transition); display: inline-block;">
                        📄 PDF'i Baştan Aç
                    </a>
                </div>
                <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-muted);">
                    <strong>İpucu:</strong> PDF açıldıktan sonra Ctrl+G (veya Cmd+G) ile sayfa numarasına gidebilirsiniz.
                </p>
            </div>
        `;
        
        // Modal'ı göster
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Bildirim göster
    showNotification(message) {
        // Mevcut bildirimleri temizle
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Yeni bildirim oluştur
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">📄</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;
        
        // Sayfaya ekle
        document.body.appendChild(notification);
        
        // 5 saniye sonra otomatik kaldır
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Konu erişimini takip et
    trackTopicAccess(topicTitle, pageNumber) {
        // Local storage'da erişim geçmişini tut
        const accessHistory = JSON.parse(localStorage.getItem('topicAccessHistory') || '[]');
        const accessRecord = {
            title: topicTitle,
            page: pageNumber,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('tr-TR')
        };
        
        accessHistory.unshift(accessRecord);
        
        // Son 50 erişimi sakla
        if (accessHistory.length > 50) {
            accessHistory.splice(50);
        }
        
        localStorage.setItem('topicAccessHistory', JSON.stringify(accessHistory));
        
        // Analytics için (varsa)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pdf_access', {
                topic_title: topicTitle,
                page_number: pageNumber
            });
        }
    }

    // Arama terimini vurgula
    highlightSearchTerm(text) {
        if (!this.searchTerm) return text;
        
        const regex = new RegExp(`(${this.escapeRegExp(this.searchTerm)})`, 'gi');
        return text.replace(regex, '<mark style="background-color: #fef3c7; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">$1</mark>');
    }

    // RegExp için özel karakterleri escape et
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Arama istatistiklerini güncelle
    updateSearchStats() {
        const statsElement = document.getElementById('searchStats');
        const total = this.currentTopics.length;
        const filtered = this.filteredTopics.length;
        
        if (this.searchTerm || this.selectedCategory || this.selectedModule) {
            statsElement.textContent = `${filtered} / ${total} konu gösteriliyor`;
            statsElement.style.display = 'block';
        } else {
            statsElement.textContent = `Toplam ${total} konu - Bir konuya tıklayarak PDF'in ilgili sayfasına gidin`;
            statsElement.style.display = 'block';
        }
    }

    // Modal açma (eski versiyon - artık sadece PDF erişim hatası için kullanılıyor)
    openTopicModal(topic) {
        const modal = document.getElementById('topicModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalPage = document.getElementById('modalPage');
        const modalCategory = document.getElementById('modalCategory');
        const modalDescription = document.getElementById('modalDescription');
        
        // Modal içeriğini doldur
        modalTitle.textContent = topic.title;
        modalPage.textContent = `Sayfa ${topic.page}`;
        modalPage.className = 'topic-page';
        modalCategory.textContent = topic.category;
        modalCategory.className = 'topic-category';
        
        // Açıklama metni
        const module = topic.id <= 69 ? 'Mikrobiyoloji' : 'Biyokimya';
        modalDescription.innerHTML = `
            <strong>${module} Laboratuvar Çalışmaları</strong> modülünün 
            <strong>${topic.category}</strong> kategorisindeki bu konu hakkında 
            detaylı bilgi için PDF belgesinin <strong>${topic.page}. sayfasını</strong> inceleyiniz.
            <br><br>
            Bu konuda şunları öğreneceksiniz:
            <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                <li>Teorik bilgiler ve temel kavramlar</li>
                <li>Pratik uygulamalar ve yöntemler</li>
                <li>Laboratuvar güvenliği ve prosedürleri</li>
                <li>İlgili araç gereç ve cihazlar</li>
            </ul>
        `;
        
        // Modal'ı göster
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus yönetimi
        const closeBtn = document.getElementById('closeModal');
        closeBtn.focus();
    }

    // Modal kapatma
    closeModal() {
        const modal = document.getElementById('topicModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Focus'u geri ver
        const searchInput = document.getElementById('searchInput');
        searchInput.focus();
    }

    // Hızlı arama önerileri (gelecekte eklenebilir)
    getSearchSuggestions(term) {
        const suggestions = [];
        const lowerTerm = term.toLowerCase();
        
        // Başlık eşleşmeleri
        this.currentTopics.forEach(topic => {
            if (topic.title.toLowerCase().includes(lowerTerm)) {
                suggestions.push({
                    type: 'title',
                    text: topic.title,
                    topic: topic
                });
            }
        });
        
        // Kategori eşleşmeleri
        const categories = getCategories();
        categories.forEach(category => {
            if (category.toLowerCase().includes(lowerTerm)) {
                suggestions.push({
                    type: 'category',
                    text: category,
                    category: category
                });
            }
        });
        
        return suggestions.slice(0, 5); // İlk 5 öneriyi döndür
    }

    // Erişim geçmişini göster (gelecekte eklenebilir)
    showAccessHistory() {
        const history = JSON.parse(localStorage.getItem('topicAccessHistory') || '[]');
        console.log('Son erişilen konular:', history.slice(0, 10));
        return history;
    }
}

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    // Loading göstergesi
    const container = document.getElementById('topicsContainer');
    container.innerHTML = '<div class="loading">Konular yükleniyor...</div>';
    
    // Kısa bir gecikme ile uygulamayı başlat (smooth loading effect)
    setTimeout(() => {
        new LabGuideApp();
    }, 500);
});

// Performans optimizasyonu için debounce fonksiyonu
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Service Worker kaydı (offline support için - gelecekte eklenebilir)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker dosyası oluşturulduğunda aktif edilebilir
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K ile arama kutusuna focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        searchInput.focus();
        searchInput.select();
    }
    
    // Escape ile modal kapatma (zaten mevcut)
    // / tuşu ile hızlı arama
    if (e.key === '/' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        searchInput.focus();
    }
});

// Tema değiştirme (gelecekte eklenebilir)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Tema tercihini yükle
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// Sayfa yüklendiğinde tema tercihini uygula
// loadThemePreference();

// Print styles (yazdırma için optimizasyon)
window.addEventListener('beforeprint', () => {
    // Modal'ları kapat
    const modal = document.getElementById('topicModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

// Analytics (gelecekte eklenebilir)
function trackSearch(searchTerm) {
    // Google Analytics veya başka bir analytics servisi ile arama terimlerini takip et
    if (typeof gtag !== 'undefined') {
        gtag('event', 'search', {
            search_term: searchTerm
        });
    }
}

function trackTopicView(topicId, topicTitle) {
    // Konu görüntüleme istatistiklerini takip et
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_item', {
            item_id: topicId,
            item_name: topicTitle,
            content_type: 'topic'
        });
    }
}

// Accessibility helpers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// CSS sınıfı screen reader için
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(srOnlyStyle);