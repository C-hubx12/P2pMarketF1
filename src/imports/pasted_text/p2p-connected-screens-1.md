We already have the P2P front marketplace page.

Now design the connected pages/screens that come AFTER the user interacts with the P2P page. Do not redesign the front page from scratch.

Use the existing P2P marketplace page as the visual base and extend the same design language across every connected screen.

Everything must match:

- dark navy/black background
- cyan / blue / purple glow system
- same CoinHubX logo/header style
- same glass card design
- same rounded corners
- same button style
- same spacing
- same 3D icon style
- no white boxes
- no random colours
- no template-looking pages

---

CONNECTED SCREENS TO DESIGN

1. Buy flow
   Triggered when user clicks:

- Buy USDT
- Instant Buy / Auto Match

Screens needed:

- Buy order setup
- Buy order summary
- Payment instructions
- Waiting for seller release
- Trade completed

---

BUY ORDER SETUP

This screen should show:

- Seller details
- Price
- Available amount
- Min/max limits
- Payment method
- Input: amount to pay
- Output: estimated USDT received
- Button: Continue

Design:

- Left side: form/details
- Right side: order summary card
- Use same dark glass cards
- Price should be visually dominant
- Button should be 3D-style cyan/blue gradient with soft glow

---

BUY ORDER SUMMARY

Show:

- You pay
- You receive
- Seller
- Price
- Payment method
- Escrow protection note
- Time limit
- Button: Confirm Buy

Add stepper at top:

1. Details
2. Confirm
3. Pay
4. Release
5. Complete

Stepper should glow softly as user progresses.

---

PAYMENT INSTRUCTIONS

Show:

- Order created
- Countdown timer
- Payment details panel
- Amount to pay
- Payment method
- Seller payment reference
- Button: I have paid
- Secondary: Cancel order

Important:

- Make timer clear but not aggressive
- Add small escrow shield icon
- Use subtle animated pulse on timer

---

WAITING FOR SELLER RELEASE

Show:

- Payment marked as sent
- Waiting for seller to release USDT
- Timeline:
  - Order placed
  - Payment sent
  - Seller releasing crypto
  - Completed

Actions:

- Contact seller
- Open dispute
- Back to order

Use subtle loading animation / glow pulse.

---

BUY COMPLETED

Show:

- Success check animation
- Trade completed
- USDT received
- Seller rating
- Buttons:
  - Back to P2P
  - View wallet

Success state should feel premium, with controlled glow and clean spacing.

---

2. Sell flow
   Triggered when user clicks:

- Sell tab
- Sell USDT

Screens needed:

- Sell order setup
- Sell order summary
- Escrow locked
- Waiting for buyer payment
- Confirm release
- Trade completed

---

SELL ORDER SETUP

Show:

- Buyer details
- Price
- Limits
- Payment method
- Input: amount of USDT to sell
- Output: estimated cash received
- Button: Continue

Same layout as buy setup.

---

SELL ORDER SUMMARY

Show:

- You sell
- You receive
- Buyer
- Price
- Payment method
- Escrow lock message
- Button: Confirm Sell

---

ESCROW LOCKED / WAITING FOR PAYMENT

Show:

- USDT locked in escrow
- Waiting for buyer payment
- Countdown timer
- Buyer info
- Payment method
- Buttons:
  - Payment received
  - Open dispute

Use approved escrow shield icon.

---

CONFIRM RELEASE SCREEN

This screen is important.

Show warning clearly:
“Only release USDT after confirming payment has arrived.”

Buttons:

- Cancel
- Release USDT

The Release button should be strong but serious.
Use cyan/blue gradient, not red-heavy.

Add confirmation modal:
Title: Confirm release
Text: Confirm you have received payment before releasing USDT.
Buttons:

- Cancel
- Release USDT

---

SELL COMPLETED

Show:

- Trade completed
- USDT released
- Amount received
- Buyer rating
- Buttons:
  - Back to P2P
  - View activity

---

3. Login / Signup flow
   Triggered when user clicks Buy/Sell but is not logged in.

Screens:

- Login
- Create account
- Forgot password
- Continue to trade screen

Login:

- Email
- Password
- Login button
- Forgot password
- Create account link

Signup:

- Email
- Password
- Confirm password
- Optional referral code field
- Create account button

After login/signup:

- return user to the exact action they started
- if they clicked Buy, return to buy order setup
- if they clicked Sell, return to sell order setup
- if they clicked Create Ad, return to create ad flow

Design:

- Same dark glass modal/page
- Same glow buttons
- No white form boxes

---

4. Create Ad / Post Offer flow
   Triggered from:

- Sell tab
- Post Offer / Create Ad button

Screens:

- Choose ad type
- Select asset
- Set price
- Set amount
- Set limits
- Select payment methods
- Add terms
- Preview ad
- Publish success

---

CREATE AD DETAILS

Step 1:
Choose:

- I want to Sell crypto
- I want to Buy crypto

Step 2:
Asset:

- USDT default

Step 3:
Price:

- Fixed price
- Or market price option

Step 4:
Amount:

- Available amount

Step 5:
Limits:

- Minimum order
- Maximum order

Step 6:
Payment:

- Bank transfer
- Other methods as available

Step 7:
Terms:

- Trade terms text box
- Payment instructions text box

Step 8:
Preview:
Show exactly how the ad will appear in the marketplace.

Step 9:
Success:

- Ad published
- View my ad
- Back to P2P

Use stepper/progress indicator across the top.

---

5. Order details page
   Triggered when user opens an active P2P order.

Show:

- Order status
- Buyer/seller details
- Amount
- Price
- Payment method
- Timer
- Escrow status
- Timeline
- Chat/contact area
- Action buttons based on status

Statuses:

- Awaiting payment
- Payment sent
- Awaiting release
- Completed
- Cancelled
- Disputed

Each status should have clear visual state.

---

6. Dispute flow
   Triggered from order page.

Screens:

- Open dispute
- Upload evidence
- Dispute submitted
- Waiting for support

Design:

- Calm but serious
- Use warning styling subtly
- Do not make it aggressively red
- Keep CoinHubX dark style

Fields:

- Reason dropdown
- Description
- Upload proof
- Submit dispute

---

VISUAL STYLE FOR ALL CONNECTED PAGES

Buttons:

- Primary buttons: cyan → blue gradient
- Slight 3D effect:
  - top highlight
  - soft shadow underneath
  - controlled outer glow
- Hover/tap:
  - slight scale
  - glow increases
- No oversized buttons

Cards:

- dark glass background
- subtle border
- 16–20px radius
- soft cyan/purple glow
- no harsh outlines

Icons:

- Use same 3D style as current P2P icons
- dark metallic base
- cyan/blue/purple glow
- no cartoon colours
- no random icon sets

Animations:

- button press effect
- card hover lift
- stepper progress animation
- success check animation
- countdown pulse
- loading shimmer
- escrow lock subtle pulse

Keep animations subtle and premium.

---

DESKTOP

Design desktop versions for each screen.

Desktop layout:

- 1200–1400px content width
- use two-column layouts where useful
- main form left
- summary/status card right
- avoid mobile-looking narrow cards
- reduce unnecessary vertical scrolling

---

MOBILE

Design mobile versions too.

Mobile:

- stack cleanly
- full-width buttons
- no cramped text
- no horizontal overflow
- keep stepper compact
- keep order summary readable

---

FINAL REQUIREMENT

Do not redesign the existing P2P marketplace front page.

Extend from it.

Create all connected P2P flow screens:

- Buy flow
- Sell flow
- Login/signup
- Create Ad
- Order details
- Dispute
- Success states
- Empty/error states

Connect them in Figma prototype mode so the flow is clear:
P2P marketplace → Buy/Sell → Auth if needed → Order flow → Complete.

Everything must look like one premium CoinHubX product.