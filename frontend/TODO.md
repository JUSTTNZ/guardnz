# Frontend Refactor Complete: Centralized Risk UI Configuration

## Completed Tasks
- [x] Created centralized risk-config.ts with single mapping object for all risk UI behavior
- [x] Updated RiskBadge component to use centralized config
- [x] Updated result-content.tsx to use config for titles, advice, and deep scan logic
- [x] Updated history-list.tsx to use risk_level and removed score display
- [x] Removed score display from result page to eliminate any UI influence
- [x] Removed obsolete history.ts file
- [x] Verified no conditional logic based on score affects risk presentation
- [x] Ensured all UI behavior (colors, text, deep-scan triggers) driven solely by risk_level

## Key Changes
- All risk presentation now uses `riskConfig[risk_level]` from `/lib/risk-config.ts`
- Score is stored but not displayed or used for any UI decisions
- Deep scan only triggers for non-safe links via derived logic (`record.risk_level !== "safe"`)
- RiskBadge, titles, advice, and evidence sections all consume centralized config
- No fallback logic or score-based conditionals remain in frontend
- Removed `deepScanRequired` flag from RiskConfig interface and objects
