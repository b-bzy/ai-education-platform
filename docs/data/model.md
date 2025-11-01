## Data Model (Centralized)

### Users & Roles
- user(id, email, role, kyc_status)
- parent_profile(user_id, household_name)
- child_profile(id, parent_user_id, nickname, birth_year, preferences)
- teacher_profile(user_id, handle, bio, kyc_level, rating_avg)
- developer_profile(user_id, org_name, website)

### Content
- course(id, slug, teacher_user_id, title, age_min, age_max, difficulty, summary, cover_url, status, price_cents, currency)
- module(id, course_id, title, order_index)
- lesson(id, module_id, title, type, order_index, asset_ref, duration_sec)
- tool_integration(id, course_id, tool_id, config_json)

### Commerce
- offer(id, course_id, type, price_cents, currency, access_policy_json)
- order(id, buyer_user_id, offer_id, status, total_cents, psp_tx_id)
- refund(id, order_id, reason, status)
- split_rule(id, course_id, party_type, party_id, percent)
- payout(id, user_id, amount_cents, status)

### Learning
- enrollment(id, order_id, course_id, child_id, status)
- progress(id, enrollment_id, lesson_id, state_json, updated_at)
- milestone(id, child_id, course_id, name, achieved_at)
- achievement(id, child_id, course_id, badge_code, issued_at)
- note(id, child_id, course_id, author_user_id, content)

### Community & Reputation
- post(id, author_user_id, title, body, tags)
- comment(id, post_id, author_user_id, body)
- rating(id, subject_type, subject_id, rater_user_id, stars, body)

### Moderation
- report(id, subject_type, subject_id, reporter_user_id, reason, status)
- moderation_event(id, report_id, action, moderator_user_id, verdict)

Notes: PII minimized; encrypt child-sensitive fields.
