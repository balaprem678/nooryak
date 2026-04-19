'use client';
import { AppShell } from '@/components/admin/layout/AppShell';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Mail, User, Lock, Bell, Palette, Save, Loader2 } from 'lucide-react';
import "./setting.scss";

type Tab = 'profile' | 'smtp' | 'security' | 'notifications' | 'appearance';

export default function SettingPage() {
    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // SMTP States
    const [smtpConfig, setSmtpConfig] = useState({
        host: '',
        port: '587',
        user: '',
        pass: '',
        fromName: 'Nooryak Admin',
        fromEmail: ''
    });

    const fetchSMTP = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/settings/smtp');
            if (res.ok) {
                const data = await res.json();
                if (data.config) {
                    setSmtpConfig(data.config);
                }
            }
        } catch (err) {
            toast.error('Failed to load SMTP settings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'smtp') {
            fetchSMTP();
        }
    }, [activeTab]);

    const handleSaveSMTP = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings/smtp', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(smtpConfig)
            });

            if (res.ok) {
                toast.success('SMTP settings saved');
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to save settings');
            }
        } catch (err) {
            toast.error('Network error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AppShell title="Setting Management" breadcrumb="Setting">
            <div className="settings">
                <div className="settings__layout">
                    {/* Sidebar */}
                    <div className="settings__menu">
                        <div 
                            className={`settings__menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <User size={18} />
                            <span>Profile</span>
                        </div>
                        <div 
                            className={`settings__menu-item ${activeTab === 'smtp' ? 'active' : ''}`}
                            onClick={() => setActiveTab('smtp')}
                        >
                            <Mail size={18} />
                            <span>SMTP Mail</span>
                        </div>
                        <div 
                            className={`settings__menu-item ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Lock size={18} />
                            <span>Security</span>
                        </div>
                        <div 
                            className={`settings__menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell size={18} />
                            <span>Notifications</span>
                        </div>
                        <div 
                            className={`settings__menu-item ${activeTab === 'appearance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            <Palette size={18} />
                            <span>Appearance</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="settings__content">
                        {activeTab === 'profile' && (
                            <div className="settings__section">
                                <h3>Profile Settings</h3>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Enter name" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Enter email" />
                                </div>
                                <div className="btn-row">
                                    <button className="btn btn--primary"><Save size={16} className="mr-2"/> Save Changes</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'smtp' && (
                            <div className="settings__section">
                                <div className="flex items-center justify-between mb-4">
                                    <h3>SMTP Configuration</h3>
                                    {loading && <Loader2 size={16} className="animate-spin text-[#888]" />}
                                </div>
                                <p className="text-xs text-[#888] mb-6">Configure your SMTP server to send invitation emails to new users.</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label>SMTP Host</label>
                                        <input 
                                            type="text" 
                                            placeholder="smtp.example.com" 
                                            value={smtpConfig.host}
                                            onChange={(e) => setSmtpConfig({...smtpConfig, host: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>SMTP Port</label>
                                        <input 
                                            type="text" 
                                            placeholder="587" 
                                            value={smtpConfig.port}
                                            onChange={(e) => setSmtpConfig({...smtpConfig, port: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label>SMTP Username</label>
                                        <input 
                                            type="text" 
                                            placeholder="user@example.com" 
                                            value={smtpConfig.user}
                                            onChange={(e) => setSmtpConfig({...smtpConfig, user: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>SMTP Password</label>
                                        <input 
                                            type="password" 
                                            placeholder="********" 
                                            value={smtpConfig.pass}
                                            onChange={(e) => setSmtpConfig({...smtpConfig, pass: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label>From Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Nooryak Admin" 
                                            value={smtpConfig.fromName}
                                            onChange={(e) => setSmtpConfig({...smtpConfig, fromName: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>From Email</label>
                                        <input 
                                            type="email" 
                                            placeholder="no-reply@nooryak.com" 
                                            value={smtpConfig.fromEmail}
                                            onChange={(e) => setSmtpConfig({...smtpConfig, fromEmail: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="btn-row">
                                    <button 
                                        className="btn btn--primary" 
                                        onClick={handleSaveSMTP}
                                        disabled={saving}
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin mr-2"/> : <Save size={16} className="mr-2"/>}
                                        Save SMTP Config
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'profile' && activeTab !== 'smtp' && (
                            <div className="settings__section">
                                <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
                                <p className="text-[#555] py-10">This section is under development.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
};

