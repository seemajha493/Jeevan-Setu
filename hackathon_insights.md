# Hackathon Project Analysis: Jeevan Setu

## 1. Project Title
**Jeevan Setu** (Bridge of Life)

## 2. One-line Tagline
"Hope for Someone's Tomorrow" / "Seva • Sahyog • Samarpan"

## 3. Problem Statement
Millions of homeless and destitute individuals in India lack access to basic necessities like food, shelter, and medical aid, with no centralized platform to connect them with willing donors and volunteers.

## 4. Who Is Affected
*   **Beneficiaries:** Homeless, elderly, daily wager workers, destitute individuals.
*   **Helpers:** Volunteers looking for organized ways to help, NGOs needing resources.
*   **Donors:** Individuals who want transparency in their charity.

## 5. Existing Problems in Current System
*   **Fragmented Aid:** Resources available in one area don't reach the needy in another.
*   **Trust Deficit:** Donors are unsure if their money reaches the actual beneficiary.
*   **Slow Response:** No immediate way to report a person in distress to a nearby helper.
*   **Temporary Solutions:** Focus on food/clothing but lack of long-term rehabilitation (jobs).

## 6. Complete Working Flow
1.  **Report:** User spots someone in need -> Reports via App (Location, Photo, Urgency).
2.  **Notification:** Nearby Volunteers/NGOs receive a real-time alert on their dashboard.
3.  **Verification:** Volunteer accepts the case, visits the spot, and verifies the need.
4.  **Relief:** Immediate aid (Food/Medical) is provided or Donation request is raised.
5.  **Rehabilitation:** Once stable, the person is listed on "Swayam Rojgar" for skills training or jobs.

## 7. Core Features
*   **Geo-tagged Incident Reporting:** Report distress cases with precise location and urgency levels.
*   **Volunteer Command Center:** Dashboard to accept cases, update status, and track impact.
*   **Smart Donation Hub:** Donate money or specific items (Clothes, Food Kits) with status tracking.
*   **Swayam Rojgar (Livelihood):** Exclusive job portal for daily wagers and skill training.
*   **NGO Directory & Verification:** Network of verified organizations to ensure safety.

## 8. Admin/Backend Capabilities
*   **Organization Vetting:** Admin panel to verify/reject NGO registrations.
*   **Donation Oversight:** Monitor and update status of all donations (Pending -> Contacted -> Completed).
*   **Role Management:** Role-based access (Admin, Moderator, User) via Supabase Auth.

## 9. Database Structure
*   **`help_requests`**: Stores incident reports (Lat/Long, Urgency, Status, Help Type).
*   **`donations`**: Tracks donor info, donation type (Monetary/In-kind), and fulfillment status.
*   **`organizations`**: Registry of NGOs with verification flags (is_verified).
*   **`job_postings`**: Listings for the "Swayam Rojgar" livelihood portal.
*   **`users/roles`**: User profiles and permission records.

## 10. APIs Used
*   **Supabase Auth:** Secure user authentication.
*   **Supabase Database:** Real-time data storage and retrieval.
*   **TanStack Query:** Efficient data fetching and caching state management.
*   **Zod:** Robust schema validation for all inputs.

## 11. Tech Stack
*   **Frontend:** React, Vite, TypeScript.
*   **Styling:** Tailwind CSS, Shadcn UI, Phosphor/Lucide Icons.
*   **Backend:** Supabase (PostgreSQL, Edge Functions).
*   **State Management:** TanStack Query (React Query).

## 12. Security Measures Implemented
*   **Row Level Security (RLS):** Ensures users can only access data they are authorized to see.
*   **Input Sanitization:** Zod schemas prevent injection and ensure data integrity.
*   **Verified Network:** Only verified NGOs and approved Volunteers can handle sensitive cases.

## 13. Unique Selling Point (USP)
**"Full-Cycle Restoration"**
Most apps stop at Donation or Reporting. **Jeevan Setu** completes the circle:
**Rescue** (Report) -> **Relief** (Donation/Shelter) -> **Rehabilitation** (Jobs/Skills).

## 14. Real-Life Use Case Scenario
*Ravi finds an elderly man shivering at a bus stop.*
1.  **Ravi** posts a "High Urgency" report on Jeevan Setu.
2.  **Priya (Volunteer)** gets an alert, visits, and verifies the case.
3.  She requests a blanket via the app. **Amit (Donor)** sees the request and donates.
4.  The man is later moved to a shelter and enrolled in **Basket Making Training** via the app's Job portal.

## 15. Estimated Impact
*   **40% Reduction** in response time for emergency distress calls.
*   **100% Transparency** for donors (status updates on every donation).
*   **Sustainable Livelihood**: Moving people from charity to independence.

## 16. Scalability Possibilities
*   **Hyper-local Expansion**: Can be launched city by city by onboarding local NGOs.
*   **Govt. Integration**: Connect with Municipal Corporation APIs for shelter availability.
*   **Disaster Management**: Can be adapted for flood/earthquake relief coordination.

## 17. Future Scope
*   **AI-Powered Triage**: Analyze uploaded photos to auto-determine urgency.
*   **Offline Mode**: For rural volunteers with poor connectivity.
*   **Face Recognition**: To help find missing persons among the homeless.

## 18. Suggested Demo Flow (For Judges)
1.  **The Hook:** Start with the **Landing Page** showing the "Lives Impacted" counter to build emotion.
2.  **The Problem:** Quickly show the **"Report a Case"** flow (The Rescue).
3.  **The Solution:** Switch to the **Admin/Volunteer Dashboard** to show the request appearing (The Response).
4.  **The Sustenance:** Show the **Donation Management** and **Job Portal** (The Rehabilitation).
5.  **The Closer:** End with the **Success Stories** page.
