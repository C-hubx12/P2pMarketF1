Design the full connected P2P journey in Figma. Do not stop at the front marketplace screen. Every button must lead somewhere. No dead screens.

Everything must match CoinHubX style:

- dark navy/black background
- cyan / blue / purple glow only
- glass cards
- rounded corners
- tight spacing
- premium 3D icons
- no white boxes
- no random colours
- no flat cheap icons
- no stretched mobile layout on desktop

---

P2P MARKETPLACE

Include:

- Buy / Sell toggle
- USDT selector
- Search
- Filters
- Sort
- Payment method dropdown
- Escrow protection section
- Offers list
- Empty state

Empty state only shows if there are no offers.

Text:
No live P2P offers available yet
Start a trade or create your own offer.

Buttons:

- Buy USDT
- Sell USDT / Create Offer

If user is logged out:

- Buy goes to signup/login, then returns to Buy flow
- Sell goes to signup/login, then returns to Seller setup

---

OFFER CARDS

Each offer must show:

- Seller avatar
- Seller name
- Verified badge
- Completion rate
- Total trades
- Response time
- Price
- Available amount
- Min/max limits
- Payment methods
- Buy USDT / Sell USDT button

Badges:

- Verified
- Top Trader
- Fast Release
- Top Pick
- Trusted

Badge style:

- small pill
- cyan/blue/purple only
- no overlap
- no giant labels
- no messy glow

Price must be the strongest element.

---

BUY FLOW

Triggered by Buy USDT or Instant Buy.

Screens:

1. Buy setup
   Show:

- seller card
- avatar
- seller name
- verified badge
- completion %
- total trades
- response time
- price
- available amount
- limits
- payment method
- You Pay input
- You Receive output
- Continue button

2. Order summary
   Show:

- You pay
- You receive
- Seller
- Price
- Payment method
- Fees if any
- Escrow protection note
- Confirm Buy button

Stepper:
Details → Confirm → Pay → Release → Complete

3. Payment instructions
   Show:

- Order created
- countdown timer
- exact amount to pay
- seller payment details
- payment reference if needed
- I have paid button
- Cancel order button
- escrow message:
  Funds are locked in escrow until both sides complete the trade.

4. Waiting for seller release
   Show:

- Payment sent
- Waiting for seller to release USDT
- timeline:
  Order created ✓
  Payment sent ✓
  Awaiting release
  Complete

Buttons:

- Contact seller
- Open dispute

5. Trade completed
   Show:

- animated checkmark
- Trade completed
- USDT added to wallet
- Rate seller
- Leave feedback
- Would trade again option
- View wallet
- Back to P2P

---

SELL FLOW

Triggered by Sell tab / Sell USDT / Create Offer.

If user is logged out:
Sell → Signup → Email verify → Phone verify → Seller profile → Payment setup → Create Offer

Seller signup screens:

1. Create account

- Email
- Password
- Confirm password
- Referral code optional

2. Email verification

- 6 digit code boxes
- Resend code
- Change email

3. Phone verification

- Country code selector
- Phone number
- SMS code boxes
- Resend code

4. Seller profile

- Display name
- Country
- Preferred currency
- Avatar optional

5. Security setup

- 2FA prompt
- security status card

6. Payment method setup
   User must add at least one payment method before selling.

Fields:

- payment method
- account name
- provider/bank name
- account details
- payment instructions
- save method button

Payment method dropdown must include:

- Bank Transfer
- Faster Payments
- Debit / Credit Card
- Wise
- Revolut
- PayPal
- Apple Pay
- Google Pay
- Cash
- Other

Each method must have a high-end custom 3D icon, not emoji.

---

CREATE OFFER FLOW

Screens:

1. Choose ad type

- Buy crypto
- Sell crypto

2. Asset

- USDT default

3. Price

- Fixed price
- Market price option

4. Amount

- total available amount

5. Limits

- min order
- max order

6. Payment methods

- select one or multiple

7. Time limit

- 15 / 30 / 45 mins

8. Terms

- trade terms text box
- payment instructions text box
- auto reply optional

9. Preview offer
   Must look exactly like marketplace card:

- seller name
- badges
- completion %
- trades
- price
- limits
- available
- payment icons
- Buy USDT button

10. Publish success
    Show:

- animated success
- Offer published
- Your offer is now live

Buttons:

- View offer
- Back to marketplace

---

SELL ORDER FLOW

When a seller receives a buyer order:

1. Order received

- buyer info
- buyer rating
- amount
- price
- payment method
- timer
- escrow locked status

2. Waiting for payment
   Show:

- Waiting for buyer payment
- countdown timer
- chat/contact buyer
- cancel/open dispute options

3. Payment received screen
   Show warning:
   Only release USDT after confirming payment has arrived.

Buttons:

- Cancel
- Release USDT

4. Confirm release modal
   Title:
   Confirm release

Text:
Confirm you have received payment before releasing USDT.

Buttons:

- Cancel
- Release USDT

5. Completed

- USDT released
- trade completed
- rate buyer
- leave feedback
- back to P2P

---

ORDER DETAILS PAGE

Every active order must have a details page.

Show:

- order status
- buyer/seller info
- amount
- price
- payment method
- escrow status
- countdown timer
- timeline
- chat panel
- action buttons

Statuses:

- Awaiting payment
- Payment sent
- Awaiting release
- Completed
- Cancelled
- Disputed
- Expired

Action buttons depending on status:

- Mark as paid
- Release USDT
- Cancel order
- Open dispute
- Contact support

---

CHAT PANEL

Inside active order:

- buyer/seller messages
- timestamp
- attachment button
- support escalation button
- system messages for payment sent / escrow locked / release completed

Keep it compact and premium.

---

CANCEL ORDER FLOW

Screens:

- cancel confirmation modal
- reason dropdown
- confirm cancel
- cancelled state

Reasons:

- changed my mind
- payment issue
- seller/buyer not responding
- wrong payment method
- other

---

DISPUTE FLOW

Screens:

- Open dispute
- Select reason
- Description
- Upload proof / receipt / screenshot
- Submit dispute
- Dispute submitted
- Waiting for support

Design must feel calm and serious, not aggressive red.

---

SELLER DASHBOARD / MY ADS

Add seller management screens:

- My active ads
- Paused ads
- Completed ads
- Edit ad
- Pause ad
- Delete ad
- View ad performance

Each ad card:

- asset
- price
- limits
- available amount
- payment methods
- status
- edit / pause / delete

---

TRADE HISTORY

Screens:

- completed trades
- cancelled trades
- disputed trades

Each row:

- buyer/seller
- amount
- price
- status
- date/time
- view details

---

LOADING / EMPTY / ERROR STATES

Design:

- loading offers
- loading order
- loading payment details
- no offers
- no payment methods
- no active orders
- price changed
- seller unavailable
- offer expired
- payment method unavailable
- network error

Use skeleton shimmer for loading.

---

ESCROW STATES

Design all:

- Escrow pending
- Escrow locked
- Payment sent
- Awaiting release
- Released
- Completed
- Disputed

Use approved 3D shield icon.
Add subtle shield pulse when escrow is active.

---

ANIMATIONS

Use subtle premium animations:

- button press scale
- card hover lift
- input focus glow
- dropdown slide/fade
- stepper progress glow
- timer pulse
- escrow shield pulse
- number update animation
- success checkmark glow
- offer published animation
- skeleton loading shimmer

No flashy/casino-style animations.

---

DESKTOP

Design desktop properly:

- 1200–1400px content width
- two-column layouts where useful
- form left, summary right
- no narrow mobile cards in centre
- use horizontal space properly

---

MOBILE

Design mobile too:

- stacked layout
- full-width buttons
- no cramped text
- no horizontal overflow
- compact stepper

---

FINAL REQUIREMENT

Connect all screens in Figma prototype:

Marketplace → Buy → Signup if needed → Order setup → Payment → Escrow → Complete

Marketplace → Sell → Signup → Verify email → Verify phone → Seller setup → Payment method → Create offer → Preview → Publish

Order details → Chat / Cancel / Dispute / Complete

Everything must be connected, detailed, and ready for dev implementation. No generic screens. No missing steps.