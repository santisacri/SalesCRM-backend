# SalesCRM API

Multi-tenant SaaS CRM backend built with Node.js, TypeScript, Express 5, PostgreSQL and Prisma. Multiple organizations share one deployment with isolated data, organization-scoped RBAC and a hardened authentication layer.

The project is backend-focused. It is a portfolio piece meant to show architecture, security and multi-tenancy decisions, not UI.

## Highlights

- **Multi-tenancy:** Organization, Membership and Invitation models. Requests after organization selection run in an organization-scoped context, and repositories enforce tenant isolation by signature.
- **RBAC:** three-tier hierarchy (`OWNER`, `ADMIN`, `MEMBER`) scoped per organization.
- **Authentication:** short-lived JWT access tokens plus opaque refresh tokens with rotation and reuse detection.
- **Async work:** transactional emails delivered through a BullMQ and Redis queue.
- **Clean Architecture:** vertical slices with strict domain, application, infrastructure and presentation separation.
- **API docs:** Swagger UI generated from JSDoc annotations.

## Tech stack

| Area        | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Runtime     | Node.js, TypeScript (ESM)                              |
| HTTP        | Express 5                                              |
| Database    | PostgreSQL 16, Prisma 7 (with the `pg` driver adapter) |
| Validation  | Zod 4, `env-var` for environment config                |
| Queue       | BullMQ, Redis (ioredis)                                |
| Auth        | jsonwebtoken, bcrypt                                   |
| Email       | Resend                                                 |
| Docs        | swagger-jsdoc, swagger-ui-express                      |
| Testing     | Vitest                                                 |
| Local infra | Docker Compose (PostgreSQL and Redis)                  |

## Architecture

The codebase follows Clean Architecture organized as **vertical slices**: each module (auth, organizations, invitations, and so on) owns its full stack instead of sharing global layers.

```
src/
  modules/
    <module>/
      domain/            entities, repository and datasource interfaces
      application/       use cases
      infrastructure/    datasource and repository implementations
      presentation/      controllers, routes and schemas for input validatiob
  shared/
    container/           dependency injection
```

Conventions:

- Files are separated by suffix (`.entity`, `.repository`, `.datasource`) with no intermediate subfolders.
- Datasource and repository pattern everywhere, with interfaces in the domain layer and implementations in infrastructure. The repository stays even when it is a thin wrapper, for consistency.
- Entities use private constructors with a `fromObject` factory and validate required fields on creation.
- Token hashing lives in the repository layer. Password hashing lives in use cases.
- A `TransactionManager` wraps Prisma interactive transactions so use cases can run multi-step operations atomically.
- A central error middleware maps a `CustomError` hierarchy (`BadRequest`, `Forbidden`, and so on) to HTTP responses.
- API responses are always wrapped in an object (for example `{ invitations: [...] }`), never bare arrays.

## Authentication and security

- **Access tokens:** JWT signed with HS256, validated for audience and issuer, with payloads parsed through Zod. Once an organization is selected the payload carries `organizationId` and `role`.
- **Refresh tokens:** opaque random values stored as SHA-256 hashes, never in plain text.
- **Rotation with reuse detection:** every refresh issues a new token in the same `familyId`. If an already-used token shows up again, the whole family is revoked, which limits the damage of a stolen token.
- **Org-preserving refresh:** refreshing keeps the active organization context.
- **Live validation:** on every request the middleware checks the token's user, organization membership and role against the database, so deleted users, removed memberships and role changes take effect immediately instead of waiting for the token to expire. Trade-off: one extra query per request in exchange for instant revocation.
- **Polymorphic Token model:** a single table backs password reset and other one-time tokens instead of ad hoc fields on the user.

## Multi-tenancy model

```
User ──< Membership >── Organization
                           │
                           └──< Invitation
```

- A user can belong to several organizations, with one role per membership.
- Two context types make misuse hard:
  - `UserContext`: authenticated user, organization not selected yet (nullable organization).
  - `OrgScopedContext`: authenticated user inside a selected organization (non-nullable organization and role).
- The `requireOrganization` middleware guarantees that org-scoped routes only run with a valid `OrgScopedContext`.
- Repository methods take the tenant as part of their signature.
- Composite indexes start with `organizationId`, ordered by query frequency.

## Domain

| Entity                               | Notes                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------- |
| Organization, Membership, Invitation | Invitation states: `PENDING`, `ACCEPTED`, `EXPIRED`, `REVOKED`, `REJECTED` |
| Team                                 | One admin per team (`adminId` unique)                                      |
| Contact                              | HubSpot style single contact model                                         |
| Deal                                 | `stage` as a fixed enum                                                    |
| Activity                             | Polymorphic event log                                                      |

## Getting started

### Prerequisites

- Node.js (recent version)
- Docker, to run PostgreSQL and Redis locally

### Setup

```bash
git clone https://github.com/santisacri/SalesCRM-backend.git
cd SalesCRM-backend
npm install
cp .env.example .env        # fill in the values, see the table below
docker compose up -d        # PostgreSQL 16 and Redis 7
npx prisma generate
npx prisma db push
npm run dev
```

### Environment variables

| Variable                            | Description                                            |
| ----------------------------------- | ------------------------------------------------------ |
| `PORT`                              | HTTP port                                              |
| `IN_PRODUCTION`                     | Production mode flag                                   |
| `JWT_SECRET`                        | Secret used to sign access tokens                      |
| `DOMAIN`                            | Application domain                                     |
| `FRONTEND_URL`                      | Allowed frontend origin, used for CORS and email links |
| `RESEND_API_KEY`                    | API key for transactional email                        |
| `TURNSTILE_SECRET_KEY`              | Cloudflare Turnstile secret                            |
| `DB_USER`, `DB_PASSWORD`, `DB_NAME` | PostgreSQL credentials used by Docker Compose          |
| `DATABASE_URL`                      | PostgreSQL connection string used by Prisma            |
| `REDIS_URL`                         | Redis connection for BullMQ                            |

### Scripts

| Command                 | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Start the API in watch mode (`tsx watch src/app.ts`) |
| `npm test`              | Run the Vitest suite once                            |
| `npm run test:watch`    | Run Vitest in watch mode                             |
| `npm run test:coverage` | Run tests with a coverage report                     |

## Testing

Unit tests use Vitest with the Arrange, Act, Assert pattern, mocked dependencies and clock mocking for time-dependent rules such as token expiration.

Coverage focuses on the highest-risk areas: authentication, refresh token rotation and reuse detection, and tenant isolation.

## Project status

This is a portfolio project, intentionally scoped as a backend.

**Done**

- Authentication with refresh token rotation and reuse detection
- Multi-tenancy, memberships, invitations and the three-tier RBAC
- Async email queue
- Core data model and indexing strategy
- Email verification flow
- Docker Compose for local infrastructure

**Planned**

- Richer domain entities: moving business rules from use cases into entities, starting with `Invitation`
- OAuth login
- Broader test coverage
- Typed domain errors instead of generic `CustomError` codes

No frontend is part of this repository.

## Author

Santiago Sacripanti. GitHub: [github.com/santisacri](https://github.com/santisacri).
