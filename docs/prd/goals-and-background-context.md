# Goals and Background Context

## Goals

- Enable administrators to efficiently manage cybercrime incident reports through a web-based dashboard
- Provide comprehensive user account administration capabilities (view, create, edit, activate/deactivate)
- Allow administrators to manage cybercrime category taxonomy (CRUD operations)
- Implement secure role-based authentication distinguishing admins from regular users
- Deliver incident evaluation workflows with status management (pending, approved, rejected) and supervisor assignment
- Reduce incident evaluation time from 3-5 days to under 24 hours
- Increase administrative capacity by 3x (150+ evaluations per day vs. current 50)
- Create a modern, intuitive interface using Next.js, TypeScript, Tailwind CSS, and shadcn/ui components
- Integrate seamlessly with existing NestJS backend API without requiring backend modifications
- Deploy MVP within 8 weeks with all 8 functional requirements operational

## Background Context

The oFraud mobile application has successfully launched, enabling end-users to report cybercrime incidents. However, the platform currently lacks an efficient administrative interface to manage the growing volume of reports, user accounts, and cybercrime categories. Administrators are forced to use API testing tools or manual database queries to perform routine tasks, creating bottlenecks in incident evaluation and compromising data quality.

This PRD defines a comprehensive web-based admin dashboard that leverages the existing NestJS backend infrastructure. The dashboard will provide administrators with powerful tools for incident moderation, user management, and category administration through an intuitive, modern interface. By streamlining these workflows, the platform will dramatically reduce response times, improve data quality, and scale effectively as the user base grows. The solution builds on proven technologies (Next.js, shadcn/ui) and integrates with fully functional backend endpoints, minimizing technical risk while maximizing administrative efficiency.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-02 | 1.0 | Initial PRD creation - Complete MVP specification | Mary (Business Analyst) |

---
