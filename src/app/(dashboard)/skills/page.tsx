'use client';

import { useEffect, useState, useRef } from 'react';
import { skillService } from '../../../services/skill';
import { uploadService } from '../../../services/upload';
import { Skill } from '../../../types';

export default function SkillsPage() {
    const [allSkills, setAllSkills] = useState<Skill[]>([]);
    const [userSkillIds, setUserSkillIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadSkillsData = async () => {
        try {
            const skillsData = await skillService.getAllSkills();
            setAllSkills(skillsData);

            const userSkillsData = await skillService.getUserSkills();
            setUserSkillIds(userSkillsData.map((s) => s.id));
        } catch (error) {
            console.error('Gagal memuat keahlian:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSkillsData();
    }, []);

    const handleCheckboxChange = (skillId: string) => {
        if (userSkillIds.includes(skillId)) {
            setUserSkillIds(userSkillIds.filter((id) => id !== skillId));
        } else {
            setUserSkillIds([...userSkillIds, skillId]);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await skillService.saveUserSkills(userSkillIds);
            setMessage('Daftar keahlian Anda berhasil diperbarui!');
        } catch (error) {
            setMessage('Gagal menyimpan keahlian, silakan coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    // Logika ketika user memilih file CV (PDF)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        if (file.type !== 'application/pdf') {
            setMessage('Hanya file berformat PDF yang diizinkan!');
            return;
        }

        setUploading(true);
        setMessage('');
        setUploadSuccessMessage('');

        try {
            // Kirim file ke backend
            const result = await uploadService.uploadCv(file);

            // Muat ulang data terbaru dari database pasca ekstraksi CV sukses
            await loadSkillsData();

            setUploadSuccessMessage(
                `Berhasil mengekstrak ${result.extractedSkills.length} skill dari CV Anda: ${result.extractedSkills.join(', ')}`
            );
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Gagal memproses unggah CV Anda.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input file
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Halaman */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Keahlian Anda</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Pilih teknologi dan bahasa pemrograman yang Anda kuasai. Anda bisa mencentangnya secara manual atau mengunggah CV PDF Anda.
                </p>
            </div>

            {/* Alert Notifikasi Sukses/Gagal */}
            {(message || uploadSuccessMessage) && (
                <div
                    className={`p-4 text-sm rounded border ${uploadSuccessMessage || message.includes('berhasil')
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-red-50 border-red-200 text-red-700'
                        }`}
                >
                    {uploadSuccessMessage || message}
                </div>
            )}

            {/* FITUR BARU: PANEL UNGGAH CV PDF (AKSEN HIJAU EMERALD DASHED) */}
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 space-y-4">
                <h2 className="text-base font-bold text-gray-900">Cara Cepat: Unggah CV PDF Anda</h2>
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-green-300 hover:border-green-500 bg-green-50/10 hover:bg-green-50/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all space-y-2 text-center"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm font-medium text-green-700">Model AI sedang membaca CV Anda...</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm font-semibold text-gray-800">Klik untuk mengunggah CV Anda</p>
                            <p className="text-xs text-gray-400">Hanya file PDF (Maksimal ukuran 2MB)</p>
                        </>
                    )}
                </div>
            </div>

            {/* Grid Pilihan Manual */}
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-base font-bold text-gray-900 mb-4">Cara Manual: Centang Keahlian</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {allSkills.map((skill) => {
                        const isChecked = userSkillIds.includes(skill.id);
                        return (
                            <label
                                key={skill.id}
                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${isChecked
                                        ? 'border-green-500 bg-green-50/50 text-green-900 font-medium'
                                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mr-3"
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(skill.id)}
                                />
                                {skill.name}
                            </label>
                        );
                    })}
                </div>

                {/* Tombol Simpan */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving || uploading}
                        className="px-6 py-2.5 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                    >
                        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </div>
        </div>
    );
}