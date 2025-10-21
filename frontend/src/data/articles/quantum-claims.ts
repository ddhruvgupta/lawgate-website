import type { Article } from './types';
import { ARTICLE_DEFAULTS } from './types';

export const quantumClaims: Article = {
    id: 'quantum-claims',
    title: 'Quantum Assessment in Construction Claims',
    ...ARTICLE_DEFAULTS,
    date: '2023-12-10',
    readTime: '11 min read',
    excerpt: 'Learn how to properly assess and quantify construction claims, including cost calculations, loss and expense, and damages.',
    tags: ['Quantum', 'Cost Claims', 'Damages'],
    content: `
# Understanding Quantum in Construction Claims

Quantum refers to the monetary value of a claim. Proper assessment of quantum is essential for successful claim resolution and requires detailed analysis of costs, losses, and damages.

## Types of Cost Claims

### 1. Direct Costs

Direct costs are directly attributable to specific work or variations:

- Labor costs
- Materials and equipment
- Plant hire
- Subcontractor costs

### 2. Indirect Costs

Indirect costs include overheads and other expenses:

- Site establishment costs
- Supervision and administration
- General overheads
- Finance charges

### 3. Loss and Expense

Claims for loss and expense typically arise from:

- Disruption and loss of productivity
- Acceleration costs
- Extended preliminaries
- Inefficiency and rework

## Methods of Quantum Assessment

### Actual Cost Method

Based on actual costs incurred, supported by:

- Invoices and payment records
- Timesheets and labor records
- Material delivery notes
- Plant hire records

### Formula or Measured Mile Approach

Compares productivity in affected and unaffected periods to calculate loss.

**Steps:**
1. Identify unaffected "measured mile" period
2. Calculate baseline productivity
3. Measure productivity in affected period
4. Calculate loss based on productivity difference

### Total Cost Approach

Compares actual total cost with estimated cost. Used only when other methods are impractical.

**Requirements:**
- Nature of losses makes detailed calculation impractical
- Actual costs were reasonable
- Original estimate was reasonable
- Claimant is not responsible for cost overrun

## Supporting Documentation

Essential documentation includes:

- Detailed cost breakdowns
- Contemporary records
- Invoices and payment certificates
- Time sheets and labor allocation records
- Material delivery and usage records
- Expert reports and analysis

## Best Practices for Quantum Claims

1. **Maintain Records:** Keep detailed contemporaneous cost records
2. **Segregate Costs:** Clearly separate claim-related costs
3. **Support Calculations:** Provide detailed calculations and assumptions
4. **Use Appropriate Methods:** Select suitable assessment methods
5. **Expert Input:** Engage qualified quantity surveyors or cost consultants

## Common Pitfalls

Avoid these common mistakes:

- Inadequate documentation
- Double counting costs
- Claiming for contractor's own defaults
- Unrealistic cost estimates
- Poor presentation of claim

## Conclusion

Proper quantum assessment requires meticulous record-keeping, sound methodology, and expert analysis. By following best practices and avoiding common pitfalls, claimants can present compelling cost claims supported by robust evidence.
    `,
};
