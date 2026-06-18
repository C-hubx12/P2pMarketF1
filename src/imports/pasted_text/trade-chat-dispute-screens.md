Yes — send this as well:

---

**TRADE CHAT SCREEN — needs full design**

This screen has not been designed yet and it is one of the most important screens on the entire platform. Every active trade happens here. Design the full trade chat screen with the following:

Top section — Trade Summary Bar (pinned, never scrolls away):
- Trade ID (e.g. P2P-2025-000001)
- Coin and amount (e.g. Buying 0.000148 BTC)
- Fiat amount (e.g. For £10.00 GBP)
- Price locked (e.g. Price locked at £67,450 per BTC)
- Payment method (e.g. Bank Transfer)
- Countdown timer — large and prominent, shown in red when under 5 minutes remaining

Below trade summary — Trade progress stepper:
- Four steps shown horizontally: Lock → Pay → Confirm → Release
- Current step highlighted in cyan
- Completed steps shown with a green tick
- Remaining steps greyed out
- This must always be visible so both parties know exactly where they are in the flow

Middle section — Chat window:
- Standard chat bubble layout — buyer messages on left, seller messages on right
- Different background colour for each side (buyer cyan tinted, seller purple tinted)
- Timestamps on every message
- System messages shown in centre in a grey pill (e.g. "Buyer has marked payment as sent")
- Payment proof image shown inline in chat when uploaded — tap to enlarge
- Scrollable

Bottom section — Action area:
- Upload Payment Proof button (buyer only, before marking paid)
- I Have Paid button (buyer only, large, green, prominent)
- Confirm Payment Received button (seller only, large, green — greyed out until buyer marks paid)
- Cancel Trade button (small, grey, less prominent — disappears after buyer marks paid)
- Raise Dispute button (red, appears for both parties 15 minutes after buyer marks paid)
- All buttons must have clear labels and must change state visually depending on trade status

**DISPUTE SCREEN — needs full design**

Design the dispute flow screens:

Screen 1 — Raise dispute confirmation modal:
- Warning icon at top
- Heading: "Raise a Dispute?"
- Subtext: "An admin will review this trade. Make sure all payment evidence is uploaded in the chat before proceeding."
- Dropdown: Select reason (all options listed)
- Text field appears if Other is selected
- Two buttons: Confirm Dispute (red) and Cancel (grey)

Screen 2 — Dispute active state:
- Same trade chat screen but with a red banner at top: "DISPUTE ACTIVE — Escrow locked pending admin review"
- All action buttons disabled and greyed out
- Message in chat: "Dispute raised. Our team will review within 24 hours."
- Expected resolution time shown (e.g. "Expected response: within 2 hours")

Screen 3 — Dispute resolved screen:

- Green banner if resolved in user's favour: "Dispute Resolved — Funds released to your wallet"
- Red banner if resolved against user: "Dispute Resolved — Funds returned to seller"
- Admin ruling reason shown below banner
- Button: View Trade Details
- Button: Leave Rating

**POST TRADE SCREEN — needs full design**

After every completed trade show a success screen:

- Large green tick animation or icon
- Heading: "Trade Complete!"
- Subtext: "0.000148 BTC has been added to your wallet"
- Trade summary: Trade ID, amount, counterparty username, completion time
- Two action buttons: Rate Your Trader (prominent) and View in Trade History (secondary)
- If user taps Rate Your Trader — rating screen slides up

**RATING SCREEN — needs full design**

- Heading: "How was your experience with [Username]?"
- Large Thumbs Up button (green) and Thumbs Down button (red)
- Optional text field below: "Leave feedback (optional)" with 200 character limit and counter
- Submit Rating button
- Skip for now link (smaller, grey, below button)
- Show trader's avatar and username at top so it is clear who is being rated

**EMPTY STATES — every screen needs one**

Design empty state screens for:

- No ads found matching filters — icon, message, suggestion to adjust filters
- No trade history yet — icon, message: "You haven't made any trades yet. Start trading now."
- No active trades — icon, message: "No active trades. Browse the marketplace to get started."
- No ratings yet on profile — message: "No ratings yet. Complete your first trade to start building your reputation."

**LOADING STATES — every screen needs one**

Design skeleton loading screens for:

- Ad listings loading — show grey placeholder rows in the same shape as real ad rows
- Trader profile loading — show grey placeholder blocks in the same shape as the profile layout
- Trade chat loading — show grey placeholder bubbles
- Do not use a spinning circle on its own — skeleton screens look far more professional

**MOBILE RESPONSIVENESS — all screens must be designed for mobile**

The current Figma designs appear to be desktop only. Every single screen must also be designed at mobile 390px width. This is critical because the majority of users especially in Nigeria will be on mobile. Design the mobile version of:

- Ad listing page
- Instant buy / trade initiation screen
- Trade chat screen
- Seller and buyer profile pages
- Post trade success screen
- Rating screen
- Dispute screens
- Empty states

**NOTIFICATION DESIGNS**

Design the in-app notification styles for the following:

- New order on your ad — shown as a banner at top of screen with seller icon
- Buyer marked payment sent — urgent banner, yellow background
- Timer warning 5 minutes — urgent banner, red background with countdown
- Trade complete — green banner
- Dispute raised — red banner
- Dispute resolved — green or red banner depending on outcome
- New chat message — standard notification banner

Each notification banner must show: icon, short message, trade ID, and a tap action that goes directly to the relevant trade chat screen.