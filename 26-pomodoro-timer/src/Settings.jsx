import { useState } from 'react';

function Settings({ config, onSave, onClose }) {
    const [form, setForm] = useState({
        work: Math.round(config.work / 60),
        shortBreak: Math.round(config.shortBreak / 60),
        longBreak: Math.round(config.longBreak / 60),
        sessionsBeforeLongBreak: config.sessionsBeforeLongBreak,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        const num = parseInt(value, 10);
        if (Number.isNaN(num)) return;
        setForm((prev) => ({ ...prev, [name]: num }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Validation : bornes min/max
        const validated = {
            work: Math.max(1, Math.min(120, form.work)),
            shortBreak: Math.max(1, Math.min(60, form.shortBreak)),
            longBreak: Math.max(1, Math.min(60, form.longBreak)),
            sessionsBeforeLongBreak: Math.max(2, Math.min(10, form.sessionsBeforeLongBreak)),
        };

        onSave(validated);
    }

    return (
        <div className="settings-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-title">
            <div className="settings-modal">
                <h2 id="settings-title">Settings</h2>

                <form onSubmit={handleSubmit}>
                    <label className="settings-field">
                        <span>Work (min)</span>
                        <input
                            type="number"
                            name="work"
                            min="1"
                            max="120"
                            value={form.work}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="settings-field">
                        <span>Short Break (min)</span>
                        <input
                            type="number"
                            name="shortBreak"
                            min="1"
                            max="60"
                            value={form.shortBreak}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="settings-field">
                        <span>Long Break (min)</span>
                        <input
                            type="number"
                            name="longBreak"
                            min="1"
                            max="60"
                            value={form.longBreak}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="settings-field">
                        <span>Sessions before Long Break</span>
                        <input
                            type="number"
                            name="sessionsBeforeLongBreak"
                            min="2"
                            max="10"
                            value={form.sessionsBeforeLongBreak}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="settings-actions">
                        <button type="button" onClick={onClose} className="control-btn control-btn--secondary">
                            Cancel
                        </button>
                        <button type="submit" className="control-btn control-btn--primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Settings;