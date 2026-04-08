import { AppShell } from '@/components/admin/layout/AppShell';
import "./setting.scss";

export default function Setting() {
    return (
        <AppShell title="Setting Management" breadcrumb="Setting">
            <div className="settings">

                <div className="settings__layout">

                    {/* Sidebar */}
                    <div className="settings__menu">
                        <div className="settings__menu-item active">
                            <i className="fa-solid fa-user"></i>
                            <span>Profile</span>
                        </div>
                        <div className="settings__menu-item">
                            <i className="fa-solid fa-lock"></i>
                            <span>Security</span>
                        </div>
                        <div className="settings__menu-item">
                            <i className="fa-solid fa-bell"></i>
                            <span>Notifications</span>
                        </div>
                        <div className="settings__menu-item">
                            <i className="fa-solid fa-palette"></i>
                            <span>Appearance</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="settings__content">

                        {/* Profile */}
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
                        </div>

                        {/* Preferences */}
                        <div className="settings__section">
                            <h3>Preferences</h3>

                            <div className="toggle-row">
                                <div>
                                    <div className="title">Email Notifications</div>
                                    <div className="desc">Receive updates via email</div>
                                </div>

                                <label className="toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="btn-row">
                            <button className="btn btn--secondary">Cancel</button>
                            <button className="btn btn--primary">Save Changes</button>
                        </div>

                    </div>

                </div>
            </div>
        </AppShell>
    );
};

