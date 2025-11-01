## Backend API (REST-first)

### Auth & Identity
- POST /auth/login, /auth/register (role), /auth/logout
- POST /auth/parent-consent — capture parental consent
- GET /me — profile, roles, permissions

### Teachers & Courses
- GET /teachers/:id, GET /teachers?query
- POST /teachers/kyc — upload verification
- GET /courses?filters; GET /courses/:slug
- POST /courses — create draft; PUT /courses/:id — publish/update
- POST /courses/:id/coupons; POST /courses/:id/tools — integrate tool

### Orders & Payments
- POST /orders — create order (course or subscription)
- POST /orders/:id/pay — initiate payment (PSP integration)
- POST /refunds — request; PUT /refunds/:id — resolve
- GET /payouts — teacher/dev payouts; POST /payouts/withdraw

### Progress & Achievements
- POST /enrollments — enroll; GET /enrollments?user
- POST /progress — upsert lesson/module progress
- POST /achievements — issue off-chain badge/record

### Tools (Developers)
- GET /tools, GET /tools/:slug
- POST /tools — create listing; PUT /tools/:id — update
- POST /tools/:id/pricing; POST /tools/:id/install — teacher install
- POST /metering — usage events, settlement window

### Community & Moderation
- GET/POST /posts; GET/POST /posts/:id/comments
- POST /reports — report content/user
- GET /moderation/queue; POST /moderation/:id/action

### Notes
- All mutating routes require role-based access; sensitive actions double-confirm
- Webhooks: payments, moderation, metering; idempotency keys required
