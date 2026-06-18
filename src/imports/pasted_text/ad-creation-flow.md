Yes — send this as well:

---

**AD CREATION FLOW — needs full design**

The full post ad flow has not been designed yet. Design every step as a separate screen:

Step 1 — Ad type selection screen:
- Large toggle at top: Sell Crypto / Buy Crypto — whichever is selected highlights in cyan
- Below toggle: coin selector — shows all available coins with logo, name, and ticker (BTC, ETH, USDT, BNB, SOL, XRP etc)
- Each coin shown as a selectable card with coin logo, full name, and ticker
- Selected coin highlighted with cyan border
- Fiat currency selector below coins — GBP default, dropdown with all available fiat currencies
- Next button at bottom (disabled until coin and fiat selected)

Step 2 — Pricing screen:
- Two large toggle options: Fixed Price / Floating Price
- Fixed Price selected: shows single input field — "Enter your price per [coin] in [fiat]" — live market rate shown below as reference (e.g. "Current market rate: £67,200")
- Floating Price selected: shows percentage input — "% above or below market" with + and - toggle — live preview updates in real time showing exact price (e.g. "Your ad will show at £68,544 per BTC (+2%)")
- Market rate updates every 10 seconds shown with a subtle refresh animation
- Next button at bottom

Step 3 — Amount and limits screen:
- Input field: Total amount to sell/buy in crypto (e.g. "0.5 BTC")
- Real time GBP equivalent shown below as user types (e.g. "≈ £33,600")
- If selling: wallet balance shown below (e.g. "Available: 0.8 BTC") — if amount exceeds balance show red error immediately
- Input field: Minimum order in fiat (e.g. "£10")
- Input field: Maximum order in fiat (e.g. "£2,000")
- Validation shown inline: min cannot exceed max, max cannot exceed total ad value
- Next button at bottom

Step 4 — Payment methods screen:
- Grid of payment method options each as a selectable card with icon and label
- Bank Transfer, PayPal, Wise, Revolut, Monzo, Cash in Person, Other
- Multiple selection allowed — selected cards highlighted with cyan border and tick
- Other option: when selected shows a text input for custom method name
- Payment window selector below: "How long does buyer have to pay?" — pill options: 15 mins / 30 mins / 45 mins / 60 mins / 90 mins — selected pill highlighted cyan
- Next button at bottom

Step 5 — Trade instructions screen:
- Large text area: "Write your trade instructions"
- Placeholder text: "e.g. Send payment via Faster Payments only. Include your CoinHubX username as reference."
- Character counter: 0/500
- Below text area: suggested instruction templates the user can tap to add quickly — e.g. "Faster Payments only" / "Include username as reference" / "I release within 5 minutes" — tapping adds it to the text area
- Next button at bottom

Step 6 — Review and publish screen:
- Full summary card showing everything entered across all steps
- Coin and direction (Selling BTC)
- Price type and price (Floating +2% — currently £68,544 per BTC)
- Total amount (0.5 BTC — ≈ £34,272)
- Order limits (£10 minimum — £2,000 maximum)
- Payment methods (Bank Transfer, PayPal)
- Payment window (30 minutes)
- Trade instructions (full text)
- Yellow warning box: "Publishing this ad will immediately lock 0.5 BTC in escrow. You will not be able to withdraw or spend this BTC until the ad is cancelled or fully completed."
- Checkbox: I confirm this ad complies with CoinHubX P2P Terms of Service — must be ticked before Publish Ad button activates
- Publish Ad button — full width, cyan, prominent
- Edit button next to each section summary so user can jump back to that step without losing other data

Step 7 — Success screen:
- Large animated green tick or lock icon animation
- Heading: "Your Ad is Now Live"
- Subtext: "0.5 BTC has been locked in escrow and your ad is visible to buyers."
- Ad summary shown below
- Two buttons: View My Ad and Post Another Ad
- Small text below buttons: "Your BTC is safe in escrow. It will only move when a trade completes or you cancel your ad."

**AD MANAGEMENT SCREEN — needs full design**

Design the My P2P Ads screen accessible from user profile:

- Tab bar at top: Active / Paused / Completed / Cancelled
- Each ad shown as a card with:
- Coin logo and name
- Direction (Selling or Buying)
- Price and type (e.g. Floating +2% — £68,544 per BTC)
- Total amount remaining vs original (e.g. 0.3 BTC remaining of 0.5 BTC)
- Progress bar showing how much of the ad has been filled (e.g. 40% filled — shown as a cyan fill bar)
- Min / max limits
- Payment methods
- Date posted
- Number of active orders currently on this ad
- Three action buttons: Edit / Pause / Cancel — shown as small pill buttons on each card
- Paused ads shown with a grey overlay and PAUSED badge
- Fully filled ads shown with a green COMPLETED badge
- Cancelled ads shown with a red CANCELLED badge

**FILTERS AND SEARCH — needs detailed design**

The filter bar on the main P2P listing page needs a full detailed design:

- Sticky at top of page — never scrolls away
- Buy tab and Sell tab as primary toggle — large, clear, full width toggle
- Row 1 of filters: Coin selector (with coin logos), Fiat currency selector
- Row 2 of filters: Amount input field, Payment method dropdown
- Search button — full width cyan button below filters
- Reset filters link — small grey text below search button
- When filters are active: show a small badge on the filter bar showing how many filters are applied (e.g. "3 filters active")
- Collapsed state: on mobile the filters collapse into a single "Filters" button with the badge count — tapping expands the full filter panel as a bottom sheet drawer

**WALLET BALANCE CHECK — needs design**

When a seller tries to post an ad and their wallet balance is insufficient design the following:

- Inline error shown immediately below the amount field in red: "Insufficient balance. You have 0.3 BTC available but entered 0.5 BTC."
- The Next button stays disabled until the amount is corrected
- Below the error show a cyan link: "Deposit more BTC" — tapping goes to the deposit screen
- Do not allow the user to proceed past step 3 with an invalid amount under any circumstances

**P2P SETTINGS SCREEN — needs full design**

Design a dedicated P2P settings screen accessible from main Settings > P2P Trading:

- Default fiat currency preference — dropdown
- Default payment methods — same multi-select grid as ad creation step 4
- Auto-reply message — text area with 500 character limit and placeholder: "Set an automatic first message sent to every buyer when a new trade starts. e.g. Thanks for your order. Please send £[amount] to [bank details]. Use your username as reference."
- Notification preferences — toggle list for each P2P notification type (can turn off individually)
- Blocked users — shows list of blocked users with unblock button on each
- Favourite sellers — shows list of favourited sellers with remove button on each
- Payment method profiles — saved payment details (bank account name, PayPal email etc) that auto-fill into trade instructions

**TRANSACTION RECEIPT — needs design**

Design a downloadable trade receipt screen:

- CoinHubX logo at top
- Heading: Trade Receipt
- Trade ID
- Date and time completed
- Buyer username
- Seller username
- Coin and amount traded
- Fiat amount and currency
- Price per coin at time of trade
- Payment method used
- Trade completion time (how long the trade took from start to finish)
- Footer: "This receipt is for record keeping purposes only. CoinHubX is not responsible for tax obligations."
- Download as PDF button
- Share button

**ONBOARDING TOUR — needs design**

Design a first time user onboarding tour for the P2P page:

- Semi-transparent overlay covers the screen
- Spotlight highlights the first element (filter bar)
- Tooltip bubble next to spotlight: "Start here — select your coin and how much you want to spend"
- Next arrow to move to next step
- Step 2 spotlight on ad listings: "Choose a seller based on price, rating, and payment method"
- Step 3 spotlight on Buy button: "Tap Buy to start a secure escrow-protected trade"
- Step 4 spotlight on the escrow protection panel: "Your funds are always protected — crypto is only released when you confirm payment"
- Skip tour button always visible
- Progress dots at bottom showing current step
- Final screen: "You're ready to trade. Good luck." with a Start Trading button