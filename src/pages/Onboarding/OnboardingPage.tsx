import { OnboardingLayout } from "@/ui/components/layouts/OnboardingLayout";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { H1, Body } from "@/ui/components/Typography";
import logoDecintan from "@/assets/logo_decintan.jpg";

const features = [
  {
    title: "Absensi",
    description:
      "Kelola kehadiran karyawan dengan sistem absensi yang terintegrasi dan real-time",
    icon: "📅",
  },
  {
    title: "Purchasing",
    description:
      "Manajemen pembelian dan pengadaan barang untuk kebutuhan perusahaan",
    icon: "📦",
  },
  {
    title: "Surat",
    description:
      "Sistem pengelolaan surat masuk dan surat keluar secara digital dan terorganisir",
    icon: "✉️",
  },
  {
    title: "Keuangan",
    description:
      "Kelola keuangan perusahaan dengan laporan keuangan yang lengkap dan akurat",
    icon: "💰",
  },
  {
    title: "Progres",
    description:
      "Pantau perkembangan dan kinerja karyawan dengan dashboard analitik yang detail",
    icon: "📈",
  },
  {
    title: "Gaji",
    description:
      "Sistem penggajian otomatis dengan perhitungan yang akurat dan transparan",
    icon: "💵",
  },
];

export default function OnboardingPage() {
  return (
    <OnboardingLayout>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10"></div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container-custom py-12 sm:py-16 lg:py-24 relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <img
              src={logoDecintan}
              alt="Decintan Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg shadow-sm"
            />
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
              Decintan
            </span>
          </div>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Sistem Manajemen Perusahaan Terintegrasi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copywriting */}
          <div className="text-center lg:text-left">
            <H1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Kelola Semua Aspek Perusahaan dalam{" "}
              <span className="text-primary-600">Satu Platform</span>
            </H1>

            <Body className="mb-10 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Solusi terintegrasi untuk mengelola absensi, purchasing, surat,
              keuangan, progres karyawan, dan penggajian. Semua kebutuhan
              manajemen perusahaan dalam satu sistem yang efisien dan
              profesional.
            </Body>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button as="link" to="/login" variant="primary" size="lg">
                Masuk ke Akun
              </Button>
              <Button as="link" to="/register" variant="outline" size="lg">
                Daftar Sekarang
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Terpercaya</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Aman & Terenkripsi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                padding="lg"
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary-500"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <Body className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
