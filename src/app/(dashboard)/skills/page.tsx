// src/app/(dashboard)/skills/page.tsx
import SkillForm from '../../../components/forms/skill-form';

export default function SkillsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Judul Utama Halaman */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Keahlian Anda</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Pilih teknologi dan bahasa pemrograman yang Anda kuasai. Anda bisa mencentangnya secara manual atau mengunggah CV PDF Anda.
                </p>
            </div>

            {/* Render Form Interaktif */}
            <SkillForm />
        </div>
    );
}