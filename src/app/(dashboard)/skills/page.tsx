'use client';

import { useEffect, useState } from 'react';
import { skillService } from '../../../services/skill';
import { Skill } from '../../../types';

export default function SkillsPage() {
    const [allSkills, setAllSkills] = useState<Skill[]>([]);
    const [userSkillIds, setUserSkillIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadSkillsData() {
            try {
                // Ambil semua daftar master skill dari database
                const skillsData = await skillService.getAllSkills();
                setAllSkills(skillsData);

                // Ambil daftar skill yang sudah dimiliki oleh user saat ini
                const userSkillsData = await skillService.getUserSkills();
                setUserSkillIds(userSkillsData.map((s) => s.id));
            } catch (error) {
                console.error('Gagal memuat keahlian:', error);
            } finally {
                setLoading(false);
            }
        }
        loadSkillsData();
    }, []);

    const handleCheckboxChange = (skillId: string) => {
        if (userSkillIds.includes(skillId)) {
            // Jika sudah ada, hapus dari pilihan
            setUserSkillIds(userSkillIds.filter((id) => id !== skillId));
        } else {
            // Jika belum ada, tambahkan ke pilihan
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
                    Pilih semua teknologi, bahasa pemrograman, dan alat yang sudah Anda kuasai saat ini untuk dianalisis oleh AI.
                </p>
            </div>

            {/* Alert Notifikasi Sukses/Gagal */}
            {message && (
                <div
                    className={`p-4 text-sm rounded border ${message.includes('berhasil')
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-red-50 border-red-200 text-red-700'
                        }`}
                >
                    {message}
                </div>
            )}

            {/* Grid Pilihan Skill */}
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
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
                        disabled={saving}
                        className="px-6 py-2.5 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                    >
                        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </div>
        </div>
    );
}