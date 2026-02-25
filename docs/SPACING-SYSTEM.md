# Home Page Spacing System – 8pt Grid

## 8pt Base Unit
All spacing uses multiples of 8px: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192...

## Tailwind Mapping (1 unit = 4px)
| Class | px | 8pt |
|-------|-----|-----|
| 2 | 8 | ✓ |
| 4 | 16 | ✓ |
| 6 | 24 | ✓ |
| 8 | 32 | ✓ |
| 10 | 40 | ✓ |
| 12 | 48 | ✓ |
| 14 | 56 | ✓ |
| 16 | 64 | ✓ |
| 18 | 72 | ✓ |
| 20 | 80 | ✓ |
| 22 | 88 | ✓ |
| 24 | 96 | ✓ |
| 28 | 112 | ✓ |
| 32 | 128 | ✓ |
| 36 | 144 | ✓ |
| 44 | 176 | ✓ |

**Avoid:** 5 (20px), 7, 9, 11, etc. – not on 8pt grid.

---

## Section Spacing (Vertical)

### Small (< 640px)
| Element | Before | After | Value |
|---------|--------|-------|-------|
| section-wrapper | py | 48px | 6×8 |
| container-custom | px | 16px | 2×8 |
| page-top-padding | pt | 120px | 15×8 |

### Medium (640px – 1023px)
| Element | Before | After | Value |
|---------|--------|-------|-------|
| section-wrapper | py | 64px | 8×8 |
| container-custom | px | 32px | 4×8 |
| page-top-padding | pt | 144px | 18×8 |

### Large (1024px+)
| Element | Before | After | Value |
|---------|--------|-------|-------|
| section-wrapper | py | 112px | 14×8 |
| container-custom | px | 64px | 8×8 |
| page-top-padding | pt | 176px | 22×8 |

---

## In-Section Gaps

### Block gaps (between major blocks)
- **Small:** gap-8 (32px)
- **Medium:** gap-12 (48px) or gap-14 (56px)
- **Large:** gap-24 (96px)

### Content gaps (within blocks)
- **Tight:** gap-4 (16px), space-y-4 (16px)
- **Normal:** gap-6 (24px), space-y-6 (24px)
- **Relaxed:** gap-8 (32px), space-y-8 (32px)

### Subheading to heading
- mb-6 (24px)

---

## Inconsistencies Fixed
1. **container-custom lg:** 80px → 64px (8×8)
2. **page-top-padding sm:** 140px → 144px (18×8)
3. **page-top-padding lg:** 180px → 176px (22×8)
4. **space-y-5:** 20px → space-y-6 (24px) for who-cards
5. **Hero image:** pt-[165px] → pt-[168px] (21×8)
6. **services-section sm:** 80px kept (10×8 ✓)

## Pages Updated (8pt)
- **Home (index.html)** – section gaps, hero, process, testimonials, services, who-cards, about, FAQ, CTA
- **Work (portfolio.html)** – category tabs, Content system, Design, grids, CTA, nav
- **Services (services.html)** – header, service entries, timeline, CTA, nav
- **Booking (booking.html)** – two-column layout
- **style.css** – booking form sections, groups, radio/checkbox gaps, budget grid
