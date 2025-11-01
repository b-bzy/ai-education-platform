## Architecture and Tech Stack (Centralized)

### High-Level
- Web App: Next.js (App Router) served via CDN
- API: RESTful backend (NestJS) with role-based access
- Storage: Relational DB + Object Storage + CDN
- AI Layer: Provider APIs or self-hosted models behind service boundary

### Recommended Stack
- Backend: TypeScript (NestJS), PostgreSQL, Redis, message queue (SQS/Kafka optional)
- Frontend: Next.js, React, Tailwind, Radix UI, TanStack Query
- AI: OpenAI/Azure/local LLM (pluggable), vector search (pgvector/Weaviate)
- Identity/Compliance: Email/Password + OAuth, KYC/年龄验证供应商（按需）
- Observability: OpenTelemetry, Prometheus/Grafana, Sentry
- Deployment: Docker, k8s, Terraform, GitHub Actions, Cloud CDN

### Services
- gateway/webapp, api, worker (moderation/recommendation/billing), webhook-consumer

### Storage
- Postgres (core data), Object Storage (S3/R2) for media, CDN for delivery

### Security
- Secrets manager, per-tenant encryption, WAF/Rate limiting, sandboxed tools
