// Mikrobiyoloji ve Biyokimya Laboratuvar Konuları Veritabanı
const topicsData = {
  mikrobiyoloji: {
    title: "MİKROBİYOLOJİ LABORATUVAR ÇALIŞMALARI",
    topics: [
      { id: 1, title: "Mikrobiyoloji Laboratuvarı", page: 22, category: "Genel Bilgiler" },
      { id: 2, title: "Mikrobiyolojinin Alt Bilim Dalları", page: 22, category: "Genel Bilgiler" },
      { id: 3, title: "Mikroorganizma Çeşitleri", page: 23, category: "Mikroorganizmalar" },
      { id: 4, title: "Parazitler", page: 24, category: "Mikroorganizmalar" },
      { id: 5, title: "Mantarlar", page: 24, category: "Mikroorganizmalar" },
      { id: 6, title: "Virüsler", page: 25, category: "Mikroorganizmalar" },
      { id: 7, title: "Prionlar", page: 25, category: "Mikroorganizmalar" },
      { id: 8, title: "Tıbbi Mikrobiyoloji Laboratuvarı", page: 25, category: "Laboratuvar Yapısı" },
      { id: 9, title: "Mikrobiyoloji Laboratuvarı Bölümleri", page: 26, category: "Laboratuvar Yapısı" },
      { id: 10, title: "Mikrobiyoloji Laboratuvarında Kullanılan Araç Gereç", page: 27, category: "Araç Gereç" },
      { id: 11, title: "Mikrobiyoloji Laboratuvarında Kullanılan Cam Araç Gereç", page: 27, category: "Araç Gereç" },
      { id: 12, title: "Mikrobiyoloji Laboratuvarında Kullanılan Diğer Araç Gereç", page: 29, category: "Araç Gereç" },
      { id: 13, title: "Mikrobiyoloji Laboratuvarında Kullanılan Cihazlar", page: 30, category: "Cihazlar" },
      { id: 14, title: "Mikroskop", page: 30, category: "Cihazlar" },
      { id: 15, title: "Santrifüj", page: 32, category: "Cihazlar" },
      { id: 16, title: "Otoklav", page: 32, category: "Cihazlar" },
      { id: 17, title: "Mikrobiyoloji Laboratuvarında Kullanılan Diğer Cihazlar", page: 32, category: "Cihazlar" },
      { id: 18, title: "Uygulama: Steril Kabinde Çalışmaya Yardım Etme", page: 35, category: "Uygulamalar" },
      { id: 19, title: "Mikrobiyoloji Laboratuvar Çalışmalarında Dikkat Edilmesi Gerekenler", page: 37, category: "Güvenlik" },
      { id: 20, title: "Tıbbi Mikrobiyoloji Laboratuvarı Kültür Örnek Türleri", page: 38, category: "Örnekler" },
      { id: 21, title: "Numune Kabul Kriterleri", page: 39, category: "Örnekler" },
      { id: 22, title: "Numune Ret Kriterleri", page: 39, category: "Örnekler" },
      { id: 23, title: "Uygulama: Mikrobiyoloji Laboratuvarı Kabul ve Ret Kriterleri Uygulamasına Yardım Etme", page: 40, category: "Uygulamalar" },
      { id: 24, title: "Mikrobiyolojik Örnek Türleri", page: 43, category: "Örnek Türleri" },
      { id: 25, title: "Kan Kültürü", page: 43, category: "Örnek Türleri" },
      { id: 26, title: "İdrar Örneği", page: 43, category: "Örnek Türleri" },
      { id: 27, title: "Dışkı (Gaita) Kültürü", page: 44, category: "Örnek Türleri" },
      { id: 28, title: "Boğaz-Nazofarenks Kültürü", page: 44, category: "Örnek Türleri" },
      { id: 29, title: "Burun Kültürü", page: 45, category: "Örnek Türleri" },
      { id: 30, title: "Balgam Kültürü", page: 45, category: "Örnek Türleri" },
      { id: 31, title: "Yara / Doku / Abse Kültürü", page: 46, category: "Örnek Türleri" },
      { id: 32, title: "BOS Kültürü", page: 46, category: "Örnek Türleri" },
      { id: 33, title: "Uygulama: Mikrobiyoloji Laboratuvar Ortamını Çalışmaya Hazır Hâle Getirme", page: 47, category: "Uygulamalar" },
      { id: 34, title: "Mikrobiyoloji Analizleri", page: 49, category: "Analizler" },
      { id: 35, title: "Besi Yeri Hazırlama", page: 49, category: "Besi Yerleri" },
      { id: 36, title: "Besi Yeri Bileşimine Giren Maddeler", page: 49, category: "Besi Yerleri" },
      { id: 37, title: "Besi Yerlerinin Sınıflandırılması", page: 50, category: "Besi Yerleri" },
      { id: 38, title: "Besi Yeri Hazırlama Yöntemleri", page: 52, category: "Besi Yerleri" },
      { id: 39, title: "Besi Yeri Hazırlama Aşamaları", page: 52, category: "Besi Yerleri" },
      { id: 40, title: "Mikroorganizma Kültürü Yapma ve Mikroskobik İncelemeye Hazırlık", page: 55, category: "Kültür Yöntemleri" },
      { id: 41, title: "Alınan Örneği Aktarmaya Hazırlama", page: 55, category: "Kültür Yöntemleri" },
      { id: 42, title: "Besi Yerine Ekim Yöntemleri", page: 56, category: "Kültür Yöntemleri" },
      { id: 43, title: "Uygulama: Plak Besi Yerine Tek Koloni Ekimi", page: 59, category: "Uygulamalar" },
      { id: 44, title: "Mikrobiyolojik İnkübasyon Yöntemleri", page: 62, category: "İnkübasyon" },
      { id: 45, title: "Mikrobiyolojik Hazırlık Hazırlama Yöntemleri", page: 64, category: "Preparat Hazırlama" },
      { id: 46, title: "Mikrobiyolojik Preparat Boyama Yöntemleri", page: 65, category: "Preparat Hazırlama" },
      { id: 47, title: "Uygulama: Direkt Klinik Örnekten Mikrobiyolojik Preparat Hazırlama", page: 66, category: "Uygulamalar" },
      { id: 48, title: "Laboratuvar Temizliği ve Atık Yönetimi", page: 68, category: "Temizlik ve Güvenlik" },
      { id: 49, title: "Laboratuvarların Temizliği", page: 68, category: "Temizlik ve Güvenlik" },
      { id: 50, title: "Sağlık Kurumlarında Atık Yönetimi", page: 68, category: "Temizlik ve Güvenlik" },
      { id: 51, title: "Seroloji", page: 70, category: "Seroloji" },
      { id: 52, title: "Serolojiyle İlgili Temel Kavramlar", page: 71, category: "Seroloji" },
      { id: 53, title: "Bağışık Yanıtta Rol Alan Hücre ve Organlar", page: 71, category: "Bağışıklık Sistemi" },
      { id: 54, title: "Makrofajlar", page: 72, category: "Bağışıklık Sistemi" },
      { id: 55, title: "Lenfositler", page: 73, category: "Bağışıklık Sistemi" },
      { id: 56, title: "Doğal Öldürücü (NK) Hücreler", page: 73, category: "Bağışıklık Sistemi" },
      { id: 57, title: "Diğer Hücreler", page: 73, category: "Bağışıklık Sistemi" },
      { id: 58, title: "Bağışıklık Sisteminin Sınıflandırılması", page: 74, category: "Bağışıklık Sistemi" },
      { id: 59, title: "Serolojik Test Cihazı", page: 74, category: "Seroloji" },
      { id: 60, title: "Sık Kullanılan Serolojik Tanı Yöntemleri", page: 74, category: "Seroloji" },
      { id: 61, title: "Parazitoloji Çalışmaları", page: 77, category: "Parazitoloji" },
      { id: 62, title: "Parazitlerin Sınıflandırılması", page: 78, category: "Parazitoloji" },
      { id: 63, title: "Parazitoloji Laboratuvarı Örnek Alımıyla İlgili Kurallar", page: 78, category: "Parazitoloji" },
      { id: 64, title: "Parazitolojik Örneklerin Kabul ve Ret Kriterleri", page: 79, category: "Parazitoloji" },
      { id: 65, title: "Parazitolojik İncelemelerde Teşhis Yöntemleri", page: 80, category: "Parazitoloji" },
      { id: 66, title: "Direkt Etiyolojik Teşhis", page: 80, category: "Teşhis Yöntemleri" },
      { id: 67, title: "Uygulama: Protozoon İncelemeleri", page: 82, category: "Uygulamalar" },
      { id: 68, title: "İndirekt Etiyolojik Teşhis", page: 84, category: "Teşhis Yöntemleri" },
      { id: 69, title: "Ölçme ve Değerlendirme", page: 85, category: "Değerlendirme" }
    ]
  },
  biyokimya: {
    title: "BİYOKİMYA LABORATUVAR ÇALIŞMALARI",
    topics: [
      { id: 70, title: "Biyokimya Laboratuvarı", page: 88, category: "Genel Bilgiler" },
      { id: 71, title: "Laboratuvarda Uyulması Gereken Kurallar", page: 88, category: "Güvenlik" },
      { id: 72, title: "Klinik Biyokimya Laboratuvarında Bulunması Gereken Bölümler / Birimler", page: 90, category: "Laboratuvar Yapısı" },
      { id: 73, title: "Biyokimya Laboratuvarı İşleyiş Süreçleri", page: 91, category: "İşleyiş" },
      { id: 74, title: "Laboratuvar Test Sonuçlarına Etki Eden Faktörler", page: 94, category: "Test Sonuçları" },
      { id: 75, title: "Biyokimya Laboratuvarında Bulunan Araç ve Gereç", page: 95, category: "Araç Gereç" },
      { id: 76, title: "Biyokimya Laboratuvarında Kullanılan Cihazlar", page: 96, category: "Cihazlar" },
      { id: 77, title: "Çözeltiler", page: 97, category: "Çözeltiler" },
      { id: 78, title: "Uygulama: Çözelti Hazırlama", page: 99, category: "Uygulamalar" },
      { id: 79, title: "Laboratuvar Temizlik Kuralları", page: 101, category: "Temizlik" },
      { id: 80, title: "Laboratuvardaki Çalışma Alanlarının Dezenfeksiyon İşlemleri", page: 101, category: "Temizlik" },
      { id: 81, title: "Uygulama: Biyokimya Laboratuvarında Rutin İşlemlere Yardım Etme", page: 102, category: "Uygulamalar" },
      { id: 82, title: "Biyokimya Laboratuvarında Kullanılan Araç ve Gerecin Mekanik ve Kimyasal Temizliği", page: 104, category: "Temizlik" },
      { id: 83, title: "Uygulama: Biyokimya Laboratuvarında Kullanılan Cam Araçların Temizliği", page: 105, category: "Uygulamalar" },
      { id: 84, title: "Biyokimya Laboratuvarı Klinik Örnek Türleri ve Analiz Şekilleri", page: 107, category: "Örnekler" },
      { id: 85, title: "Biyokimya Laboratuvarında Örnek Kabul Kriterleri", page: 110, category: "Örnekler" },
      { id: 86, title: "Biyokimya Laboratuvarında Örnek Ret Kriterleri", page: 110, category: "Örnekler" },
      { id: 87, title: "Örneğin Laboratuvara Taşınmasında Dikkat Edilmesi Gerekenler", page: 110, category: "Örnekler" },
      { id: 88, title: "Sağlık Kurumlarında Atık Yönetimi", page: 110, category: "Atık Yönetimi" },
      { id: 89, title: "Uygulama: Biyokimya Laboratuvarına Biyolojik Örneklerin Kabulü ve Reddi", page: 111, category: "Uygulamalar" },
      { id: 90, title: "Biyokimya Analizleri", page: 113, category: "Analizler" },
      { id: 91, title: "Kan Analizleri", page: 113, category: "Kan Analizleri" },
      { id: 92, title: "Biyokimya Testlerinde Bakılan Parametreler", page: 114, category: "Test Parametreleri" },
      { id: 93, title: "Biyokimyasal Parametrelerin Klinikteki Yeri ve Önemi", page: 117, category: "Test Parametreleri" },
      { id: 94, title: "Tam Oranların Analizi", page: 118, category: "İdrar Analizleri" },
      { id: 95, title: "Numunelerin Toplanması, Korunması ve Saklanması", page: 119, category: "İdrar Analizleri" },
      { id: 96, title: "Ortancaların (Makroskobik) İncelenmesi", page: 121, category: "İdrar Analizleri" },
      { id: 97, title: "Oranların Kimyasal Analizi", page: 123, category: "İdrar Analizleri" },
      { id: 98, title: "Uygulama: Oranların Kimyasal ve Uluslararası Analizi", page: 124, category: "Uygulamalar" },
      { id: 99, title: "Türlerinin Mikroskobik Analizi", page: 126, category: "İdrar Analizleri" },
      { id: 100, title: "Uygulama: Mikroskobik İncelemelere Yardım Etme", page: 126, category: "Uygulamalar" },
      { id: 101, title: "Ölçme ve Değerlendirme", page: 129, category: "Değerlendirme" }
    ]
  }
};

// Tüm konuları birleştirilmiş liste olarak döndüren fonksiyon
function getAllTopics() {
  const allTopics = [];
  allTopics.push(...topicsData.mikrobiyoloji.topics);
  allTopics.push(...topicsData.biyokimya.topics);
  return allTopics;
}

// Kategorileri döndüren fonksiyon
function getCategories() {
  const categories = new Set();
  getAllTopics().forEach(topic => categories.add(topic.category));
  return Array.from(categories).sort();
}