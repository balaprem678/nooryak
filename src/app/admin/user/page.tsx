'use client';
import { AppShell } from '@/components/admin/layout/AppShell';
import { useState, FormEvent, useEffect } from "react";
import "./user.scss";
import { Pencil, Trash, X, MailWarning } from 'lucide-react';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export default function UserPage() {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [smtpError, setSmtpError] = useState<string | null>(null);

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Editor'
    });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
            }
        } catch (err) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/admin/users/${editingId}` : '/api/admin/users';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                closeModal();
                fetchUsers();
            } else {
                if (data.smtpError) {
                    setSmtpError(data.message);
                } else {
                    toast.error(data.message || 'Something went wrong');
                }
            }
        } catch (err) {
            toast.error('Network error');
        }
    };

    const handleEdit = (user: User) => {
        setFormData({ name: user.name, email: user.email, password: '', role: user.role });
        setEditingId(user._id);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('User deleted');
                fetchUsers();
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to delete user');
            }
        } catch (err) {
            toast.error('Network error');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setSmtpError(null);
        setFormData({ name: '', email: '', password: '', role: 'Editor' });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AppShell title="User Management" breadcrumb="Users">
            <div className="users-page">

                {/* HEADER */}
                <div className="users-header">
                    <div className="page-header mb-6">
                        <h2 className="text-xl font-bold">Users</h2>
                        <p className="text-[#888] text-sm">Manage team members and permissions</p>
                    </div>

                    <button className="invite-btn" onClick={() => { setEditingId(null); setShowModal(true); }}>
                        + Invite User
                    </button>
                </div>

                {/* USERS GRID */}
                <div className="users-grid">
                    {loading ? (
                        <p className="text-[#888] col-span-full text-center py-10">Loading users...</p>
                    ) : users.length === 0 ? (
                        <p className="text-[#888] col-span-full text-center py-10">No users found. Invite someone to get started.</p>
                    ) : (
                        users.map((user) => (
                            <div className="user-card" key={user._id}>
                                <div className="avatar">{getInitials(user.name)}</div>

                                <h4>{user.name}</h4>
                                <p>{user.email}</p>

                                <span className={`role ${user.role.toLowerCase()}`}>
                                    {user.role}
                                </span>

                                <div className="actions">
                                    <button onClick={() => handleEdit(user)} title="Edit User"><Pencil size={16} /></button>
                                    <button onClick={() => handleDelete(user._id)} title="Delete User"><Trash size={16} /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* INVITE MODAL */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>{editingId ? 'Edit User' : 'Invite User'}</h3>
                                <button className="close-btn" onClick={closeModal}><X size={20} /></button>
                            </div>

                            {smtpError ? (
                                <div className="smtp-error-view">
                                    <div className="flex flex-col items-center gap-4 py-6 text-center">
                                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                            <MailWarning size={32} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">SMTP Not Configured</h4>
                                            <p className="text-[#888] text-sm px-6">{smtpError}</p>
                                        </div>
                                        <button 
                                            onClick={() => window.location.href = '/admin/setting'}
                                            className="mt-4 px-6 py-2 bg-[#ff7a18] text-white rounded-lg font-medium hover:opacity-90 transition-all"
                                        >
                                            Go to Settings
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter email"
                                            required
                                            disabled={!!editingId} // Email cannot be changed
                                            className={editingId ? 'bg-[#1a1a1a] cursor-not-allowed' : ''}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    {!editingId && (
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="text"
                                                placeholder="Set user password"
                                                required
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                            <p className="text-[10px] text-[#555] mt-1">This password will be sent to the user via email.</p>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label>Role</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                        </select>
                                    </div>

                                    <div className="modal-actions">
                                        <button type="button" onClick={closeModal} className="cancel">
                                            Cancel
                                        </button>
                                        <button type="submit" className="submit">
                                            {editingId ? 'Save Changes' : 'Invite & Send Email'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
};
