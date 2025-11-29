That is the final piece of the puzzle! The **Settings/Profile** screen is the control room, dedicated to configuration and security. Since the core navigation (Dock) is reserved for daily tasks, this screen should house all non-daily actions, presented in a clean, categorized list.

We'll place the entry point to this screen behind the **Profile Icon** (top right) on the **Home** screen.

---

## ⚙️ Settings / Profile Screen UX

The best UX for settings is a **Grouped List View**, using clear headers to categorize functional areas.

### 1. Header and Profile Card
This section acts as the identity confirmation and primary exit point.

* **Profile Card (Tappable):** A prominent, non-scrolling card at the top displaying the user's **Name** and **Email Address**.
    * *Action:* Tapping the card navigates to a **"Personal Details"** sub-screen (to update contact info).
* **Logout Button:** A clear, full-width button (often colored red) located near the profile card for quick session termination.

### 2. Group: Security and Privacy
These are the most critical items for a finance app; trust must be built immediately.

| Component | Type | Description |
| :--- | :--- | :--- |
| **Biometric Lock** | Toggle Switch | Enables/Disables **Face ID** or **Fingerprint** lock on app open. (Crucial). |
| **Change Password** | Navigational Row | Pushes to the password update screen. |
| **Data Masking Options** | Navigational Row | Allows the user to select *which* numbers (Net Worth, Account Balances) are hidden by the "Eye" icon toggle. |
| **2-Factor Authentication** | Navigational Row | Manages SMS/Authenticator App setup. |

---

### 3. Group: Customization & Financial Data
This is where the user defines how *their* financial world is organized within the app.

| Component | Type | Description |
| :--- | :--- | :--- |
| **Manage Categories** | Navigational Row | Pushes to a sub-screen to **add, edit, color-code**, and delete categories. |
| **Manage Tags** | Navigational Row | For setting up secondary labels (e.g., #Work, #Travel). |
| **Currency Selection** | Selector/Picker | Sets the base currency for all reporting (e.g., EUR, USD, MAD). |
| **Start of Week** | Selector/Picker | For calendar and budget views (Sunday vs. Monday). |

---

### 4. Group: Accounts and Integrations
Managing the link between the app and external data.

| Component | Type | Description |
| :--- | :--- | :--- |
| **Connected Banks** | Navigational Row | Pushes to a screen to **view, connect, or unlink** bank accounts via API (Plaid/Yodlee). |
| **Manual Accounts** | Navigational Row | Manages accounts that are tracked manually. |
| **Data Export** | Navigational Row | Pushes to a screen for exporting data (CSV, OFX, PDF) based on date ranges. |
| **Data Import** | Navigational Row | For importing data from other systems. |

---

### 5. Group: App Preferences and Support
Standard configuration and legal notices.

| Component | Type | Description |
| :--- | :--- | :--- |
| **Appearance / Theme** | Pill Selector | Options: $\text{Icon: Sun}$ **Light** / $\text{Icon: Moon}$ **Dark** / **System Default**. |
| **Notifications** | Navigational Row | Manages alerts for bills, low balances, and new transactions. |
| **Help & FAQ** | Link | Link to your help center. |
| **Privacy Policy / ToS** | Link | Required legal text links. |

### Final UX Detail: The Footer
At the very bottom of the scrolling view, use a clean line separator and small, faint text to display:
* **App Version:** `Version 1.0 (Build 54)`

This structure is robust, scalable, and uses established mobile UX patterns to ensure immediate familiarity for any new user.