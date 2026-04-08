'use client';
import { AppShell } from '@/components/admin/layout/AppShell';
import { useState, FormEvent } from "react";
import "./user.scss";
import { Pencil, Trash } from 'lucide-react';

interface User {
    name: string;
    email: string;
    role: string;
    initials: string;
}

export default function Setting() {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Admin'
    });

    const handleInvite = (e: FormEvent) => {
        e.preventDefault();

        const initials = formData.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        const newUser: User = { ...formData, initials };

        setUsers([...users, newUser]);
        setFormData({ name: '', email: '', role: 'Admin' }); // Reset form
        setShowModal(false);
    };

    return (
        <AppShell title="User Management" breadcrumb="Users">
            <div className="users-page">

                {/* HEADER */}
                <div className="users-header">
                    <div className="page-header mb-6"><h2 className="text-xl font-bold">Users</h2>
                        <p className="text-[#888] text-sm">Manage team members and permissions</p></div>

                    <button className="invite-btn" onClick={() => setShowModal(true)}>
                        + Invite User
                    </button>
                </div>

                {/* USERS GRID */}
                <div className="users-grid">
                    {users.length === 0 && (
                        <p className="text-[#888] col-span-full text-center py-10">No users found. Invite someone to get started.</p>
                    )}

                    {users.map((user, i) => (
                        <div className="user-card" key={i}>
                            <div className="avatar">{user.initials}</div>

                            <h4>{user.name}</h4>
                            <p>{user.email}</p>

                            <span className={`role ${user.role.toLowerCase()}`}>
                                {user.role}
                            </span>

                            <div className="actions">
                                <button><Pencil /></button>
                                <button><Trash /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* INVITE MODAL */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Invite User</h3>

                            <form onSubmit={handleInvite}>
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
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option>Admin</option>
                                        <option>Editor</option>
                                        <option>Viewer</option>
                                    </select>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" onClick={() => setShowModal(false)} className="cancel">
                                        Cancel
                                    </button>
                                    <button type="submit" className="submit">
                                        Invite
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
};
