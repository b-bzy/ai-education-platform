## UI Components and Pages

### Foundations
- Header, Footer, Role Switcher, Breadcrumbs
- Auth Modals (Parent/Teacher/Developer), KYC/Consent Dialogs
- Filters: AgeRangePicker, DifficultySelect, TopicTags, SortMenu
- Cards: CourseCard, TeacherCard, ToolCard, PostCard
- CTAs: PurchaseButton, SubscribeButton, TrialButton, InstallToolButton
- Progress: ProgressBar, MilestoneList, AchievementBadge
- Social: Avatar, RatingStars, CommentThread, ShareMenu, ReportButton

### Key Pages (States)
- Course Detail
  - states: preview, purchased, expired, refunded
  - sections: overview, syllabus, reviews, teacher bio, tool requirements
- Course Editor (Teacher)
  - blocks: Text, Video, Quiz, Activity, ToolPlugin, Assignment
  - side panels: pricing, revenue split, policies (refund, access), coupons
- Family Learning Space
  - child switcher, timeline, tasks, notes, portfolio uploads
- Tool Listing (Developer)
  - overview, pricing, SDK, permissions, reviews, install stats
- Moderation Console
  - queue, evidence viewer, action drawer (remove, restrict, escalate), appeals

### Accessibility & Internationalization
- WCAG AA defaults, component aria patterns, RTL support, i18n keys

### Design Tokens
- Colors (child-friendly palette), spacing, radii, typography scales
