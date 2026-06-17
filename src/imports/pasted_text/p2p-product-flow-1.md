Required Figma pages and frames
Please design these pages as one connected P2P product flow.

1. P2P Marketplace — Buyer default
Purpose: user lands on /p2p, Buy tab is active, user enters amount, selects crypto/fiat/payment method, and sees live sell ads.

Required elements:

Buy tab

Sell tab

Instant Buy / Find Best Offer card

Amount input

Fiat currency dropdown

Crypto asset dropdown

Payment method dropdown

Search Ads / Find Best Offer button

Backend/live status chip

Loading skeleton while offers load

Empty state if no backed sellers exist

Error state if backend is unavailable

First-time education modal:

Find an ad

Make payment

Receive crypto

Button: I Understand — Get Started

Ad rows/cards must show:

Seller avatar

Seller username

Online/offline dot

Star rating

Completed trade count

Completion rate

Average release time

Trust badges:

Top Trader

Verified Trader

Fast Releaser

Price per coin

Market premium/discount

Available crypto

Min/max order limits

Payment method badges

Wallet-backed / escrow-backed badge

Buy button

Required states:

Loading offers

No offers match filters

Backend error

No backed sellers available

Pricing unavailable

User not logged in

Permission/verification required

2. Best Match Confirmation
Purpose: after user taps Find Best Offer, show the matched backed seller before entering the order form.

Required elements:

Header: Best backed seller found

Matched seller card

Seller avatar/name

Seller rating

Seller completed trades

Seller completion rate

Seller average release time

Price

Premium/discount vs market

Buyer spend amount

Estimated crypto receive amount

Payment method

Min/max limits

Available backed crypto

Wallet-backed or Escrow-backed evidence badge

Reason this seller was selected:

Best price

High completion rate

Enough available crypto

Accepts selected payment method

Buttons:

Continue to order

View seller profile

Choose another seller

If no match exists, show:

No backed seller can fulfil this order right now

Suggestions:

Lower amount

Change payment method

Change asset

Create buy ad

Notify me when available

3. Buy Trade Detail / Order Setup
Purpose: buyer reviews seller and amount before creating the trade.

Left/top seller panel:

Seller avatar/name

Rating

Completed trades

Completion rate

Positive rating percentage

Average release time

Online status

Trust badges

View Full Profile button

Right/bottom order panel:

Price per asset

Market reference / premium

Payment method

Available backed amount

Min/max limits

Seller instructions

Input: I want to spend

Input: I will receive

Inputs linked both ways

Validation messages:

Minimum order is X

Maximum order is X

Seller does not have enough available for this order

This ad is no longer available

Button: Confirm Order

Secondary button/link: Cancel and go back to listings

Also design the no-offer guard state:

Header: Choose a backed seller first

Explanation: this screen only starts after CoinHubX matches a live seller ad

Button: Back to marketplace

4. Trade Room / Escrow Chat
Purpose: main trade screen after the order is created.

This is where the buyer and seller communicate, upload proof, mark payment, release crypto, cancel, or dispute.

Required layout:

Sticky trade summary bar
Always visible at top.

Must show:

Trade ID

Buying amount

Spending amount

Price

Payment method

Escrow state chip

Countdown timer

Server-synced timestamp badge

Seller instructions panel
Show:

Seller payment instructions

Payment warning: only pay to provided details

Payment reference / copy button

Warning not to communicate or pay outside the platform

Chat panel
Must show:

Real-time message list

Buyer/seller message bubbles

System messages for all important events

Timestamp on every message

Payment proof cards

Upload progress state

Read-only state after completion/cancel/dispute lock

Buyer action bar
Buyer should see:

Upload Payment Proof

I Have Paid

Cancel Trade before paid

Raise Dispute after grace period

View Trade Details

Seller action bar
Seller should see:

Confirm Payment Received

Cancel Trade before buyer marks paid

Raise Dispute after grace period

View Trade Details

Timer states
Design:

Normal timer

Under 5 minutes — red/danger

Expired before buyer paid — auto-cancel pending

Buyer marked paid — 30-minute extension

Extended timer expired — admin review required

5. Payment Proof Upload
Purpose: buyer uploads evidence after paying outside CoinHubX.

Required elements:

Upload button

Drag/drop on desktop

Camera/photo picker on mobile

Accepted types:

JPG

PNG

PDF

Max file size: 10MB

Server timestamp after upload

Locked badge: cannot edit or replace

Preview thumbnail

Open full image/PDF modal

Upload progress state

Error states:

File too large

Unsupported format

Upload failed

Network retry

Permission denied

Backend unavailable

6. Buyer Marked Paid State
Purpose: buyer clicks I Have Paid.

After this action, the design should change clearly.

Required changes:

Escrow state chip changes to PAYMENT_SENT

Buyer cancel button disappears

Seller confirm button becomes active

System message appears:

Buyer has marked payment as sent. Please check your account and confirm receipt.

Dispute countdown starts or grace period is shown

Seller urgent notification banner appears

Buyer sees reminder:

Wait for the seller to confirm. Do not pay twice.

7. Seller Release / Confirm Payment Received
Purpose: seller confirms payment and releases crypto to the buyer.

This needs very careful visual treatment because it is a money-moving action.

Required modal:

Title: Confirm payment received?

Warning:

Only release crypto after the money has arrived in your bank/payment account.

Trade ID

Buyer name

Amount paid

Crypto to release

Payment method

Checkbox:

I confirm I have received the payment in full.

Button:

Release crypto to buyer

Secondary:

Cancel

Danger/safety rules:

Release button disabled until checkbox is ticked

Release action should be visually serious

Do not make release feel casual

Show this is irreversible after confirmation

Use strong warning copy

After release:

Success screen:

Trade Complete

Crypto credited to buyer

Escrow state:

PAYMENT_CONFIRMED

Chat becomes read-only

Rating prompt shown

Trade moves to Completed tab

8. Rating Screen
Purpose: both parties rate after completion.

Required elements:

How was your experience with [username]?

Thumbs Up

Thumbs Down

Optional written feedback

200 character limit

Character counter

Submit Rating button

Skip for now link

Expiry timer:

rating available for 72 hours

Submitted state

Expired state

9. Timer Expired — Buyer Has Not Paid
Purpose: buyer did not click I Have Paid before timer expired.

Required state:

Trade cancelled

Escrow returns to seller ad reserve

Status:

TRADE_CANCELLED

Reason:

payment window expired

Both parties notified

Button:

View cancelled trade

Button:

Return to marketplace

Seller ad remains live with available amount restored

10. Timer Extended — Buyer Has Paid
Purpose: buyer clicked I Have Paid before timer expired.

Required state:

Timer extended by 30 minutes

Amber urgent banner for seller

Buyer message:

wait for seller confirmation

Seller message:

confirm receipt urgently

If extension expires:

state becomes Admin review required

Escrow remains locked

No auto-release

Make it very clear that escrow does not automatically release on timer expiry.

11. Raise Dispute Flow
Purpose: either party raises a dispute after buyer marks paid and grace period passes.

Required modal:

Title: Raise dispute

Warning:

An admin will review this trade. Upload all evidence before proceeding.

Reason dropdown:

I paid but seller has not released crypto

Payment amount does not match

I sent payment to wrong account

Suspected fake payment proof

Other

If Other selected:

text field appears

Confirm Dispute button

Cancel button

After submission:

Trade status:

DISPUTED

Escrow locked

Buttons disabled except View Trade Details

System message in chat:

Dispute raised. Escrow locked pending admin review.

Admin review SLA:

Review within 24 hours

Evidence checklist shown

12. Disputed Trade Room
Purpose: trade is locked while admin reviews.

Required elements:

Red/amber dispute banner

Escrow locked badge

SLA timer

Evidence checklist

Uploaded proof list

Chat visible but action-limited

Admin messages visible

Buttons disabled except:

View Trade Details

Upload more evidence if admin requests it

Clear text:

Do not attempt to make or request further payment outside CoinHubX.

13. Admin Dispute Queue
Purpose: staff sees all open disputes.

Required layout:

Queue table/cards

SLA timer

Trade ID

Asset/fiat amount

Buyer

Seller

Dispute reason

Evidence count

Time since raised

Risk flags

Assigned admin

Priority/severity

Filters:

New

Overdue

Awaiting buyer

Awaiting seller

Ready for ruling

Resolved

States:

Empty queue

Loading

Permission denied

Backend unavailable

Overdue disputes

High-risk dispute

14. Admin Dispute Detail
Purpose: admin reviews and rules on a dispute.

Use a three-panel layout on desktop.

Left panel — trade summary
Trade ID

Buyer profile

Seller profile

Payment method

Crypto amount

Fiat amount

Escrow state

SLA timer

Risk flags

Center panel — evidence and conversation
Full chat transcript

Payment proof images/PDFs

System messages

Admin notes

Request more info composer

Internal notes

Right panel — escrow and ruling
Escrow event log

Ledger entries

Wallet movement evidence

Previous disputes

Ruling controls

Admin actions:

Request More Info

Message Buyer

Message Seller

Release to Buyer

Return to Seller

Ban/freeze P2P access

Ruling modal:

Ruling type

Required reason

Evidence summary

Irreversible action warning

Confirmation checkbox

Final action button

15. Admin Release to Buyer / Return to Seller
Design two separate high-risk modals.

Release to Buyer modal
Required elements:

Red/amber warning border

Trade ID

Buyer wallet destination

Crypto amount being released

Seller name

Payment proof summary

Admin reason field

Required checkbox:

I confirm the evidence supports releasing crypto to the buyer.

Button:

Confirm release to buyer

Return to Seller modal
Required elements:

Red/amber warning border

Trade ID

Seller destination / seller escrow/ad reserve

Crypto amount being returned

Buyer name

Evidence summary

Admin reason field

Required checkbox:

I confirm the evidence supports returning crypto to the seller.

Button:

Confirm return to seller

Both should produce:

Success state

Audit log ID

Ledger transaction ID

Notification sent state

16. Trader Profile
Purpose: user checks seller/buyer reputation.

Required elements:

Username

Avatar

Member since date

Total completed trades

Total cancelled trades

Completion rate

Positive rating %

Negative rating %

Total ratings count

Average release time

Average payment time

Preferred payment methods

Recently active indicator

Trust badges:

Top Trader

Verified Trader

Fast Releaser

Active ads

Completed trade history summary

Dispute history count

States:

Loading profile

Profile unavailable

User banned/frozen

No ratings yet

No active ads

17. Trade History
Purpose: user can review all P2P trades.

Required elements:

My Trades page

Active tab

Completed tab

Cancelled tab

Disputed tab

Filters:

Date range

Coin

Trade type

Status

Each row/card shows:

Trade ID

Date

Type

Coin

Fiat amount

Counterparty

Status

Timer/SLA if active

View details

Download CSV

Trade detail history should show:

Escrow event log

Chat transcript read-only

Payment proof images

Dispute details if applicable

Ratings given and received

18. Ad Creation
We need a proper multi-step ad creation flow.

Required pages:

Step 1 — Ad type and pair
Buy/Sell selector

Crypto asset

Fiat currency

Payment region if needed

Step 2 — Pricing
Fixed price option

Floating price option

Live market rate

Premium/discount %

Final price preview

Pricing feed unavailable state

Step 3 — Amount and limits
Total crypto amount

Wallet balance

Amount to lock in escrow

Min order size

Max order size

Validation:

min cannot exceed max

not enough wallet balance

invalid amount

Step 4 — Payment and instructions
Payment method multi-select

Custom payment method

Payment window dropdown:

15 mins

30 mins

45 mins

60 mins

90 mins

Trade instructions text area

500 character limit

Character counter

Step 5 — Review and publish
Summary of ad

Price

Premium/discount

Total amount

Min/max

Payment methods

Instructions

Escrow lock preview

Warning:

crypto will be locked when ad is published

Button:

Publish Ad

Step 6 — Published success
Success message

Ad ID

Escrow locked amount

View Ad

Manage Ads

Back to Marketplace

19. Ad Management
Purpose: seller manages live ads.

Required elements:

Active ads

Paused ads

Completed ads

Cancelled ads

Filled vs remaining amount

Edit price

Edit limits

Edit instructions

Pause

Resume

Cancel

Escrow return confirmation

Auto-paused low-balance banner

Auto-resumed after top-up state

Required states:

Live

Paused

Completed

Cancelled

Auto-paused due to low balance

Fully filled

Partially filled

20. Notifications Center
Required notification cards:

New order

Buyer marked paid

Timer warning

Timer expired

Crypto released

Dispute raised

Dispute resolved

Ad paused low balance

New chat message

Trade complete

Each notification should show:

Icon

Severity

Time

Trade ID

CTA

Read/unread state

Notification priorities:

Red: dispute, risky release, overdue timer

Amber: timer warning, awaiting seller

Green: completed/released

Cyan: new message/new order

21. Admin P2P Dashboard
Purpose: staff monitors the whole P2P marketplace.

Required modules:

Active ads count

Active trades count

Completed trades count

Cancelled trades count

Disputed trades count

Total escrow locked

Open disputes with SLA

Disputes over 24h

Top traders by volume

Top traders by completed trades

Most popular payment methods

Most traded pairs

Average release time

Average completion time

Admin action queue

States:

Real data connected

Backend feed required

Loading

Permission denied

Warning/degraded

Empty

Escrow state visual system
Please design a reusable escrow state pill and timeline for:

AD_RESERVED

TRADE_ACTIVE

PAYMENT_SENT

PAYMENT_CONFIRMED

TRADE_CANCELLED

DISPUTED

DISPUTE_RESOLVED_BUYER

DISPUTE_RESOLVED_SELLER

AD_CANCELLED

The trade room should show a timeline:

Ad reserved

Trade active

Payment sent

Payment confirmed / dispute / cancellation

Completed / resolved

Each timeline event should show:

Timestamp

Trigger

Actor

Amount

Ledger/escrow event reference if available

Mobile requirements
Design mobile-first versions for:

Marketplace

Best Match Confirmation

Buy Trade Detail

Trade Room

Payment Proof Upload

Seller Release Modal

Raise Dispute Modal

Trade History

Trader Profile

Admin Dispute Queue

Mobile priorities:

Sticky trade summary

Big action buttons

Clear timer

Easy payment proof upload from camera/gallery

Protected dispute/release confirmation modals

No cramped desktop tables

Use stacked cards instead of wide tables

Desktop requirements
Desktop should be denser and more operational.

Design:

Marketplace as table/card hybrid

Trade room with three columns:

Summary/timeline

Chat/evidence

Actions/details

Admin dispute queue as table

Admin dispute detail as three-panel case-management layout

Keyboard-friendly action buttons

Clear sticky action areas

Copy rules
Use direct operational copy.

Use:

Find Best Offer

Matching backed seller…

No backed seller can fulfil this order right now

Confirm Order

I Have Paid

Confirm Payment Received

Release crypto to buyer

Raise Dispute

Escrow locked pending admin review

Timer extended because buyer marked payment as sent

Do not release crypto until payment is received in full

Avoid vague copy like:

Continue

Done

Proceed

Submit

For money/escrow actions, be explicit.

Exact Figma deliverables requested
Please create these frames/components:

P2P Marketplace — Buyer default

P2P Marketplace — Seller default

First-time education modal

Loading marketplace

Empty marketplace

Backend unavailable marketplace

Best Match Confirmation

No backed seller found

Buy Trade Detail

No selected offer guard

Trade Room — buyer before paid

Trade Room — seller before paid

Trade Room — buyer marked paid

Trade Room — timer under 5 minutes

Trade Room — timer extended

Payment proof upload modal

Payment proof preview modal

Seller confirm payment received modal

Trade complete success

Rating prompt

Rating expired

Cancelled trade state

Raise dispute modal

Disputed trade room

Admin dispute queue

Admin dispute detail

Admin release to buyer modal

Admin return to seller modal

Trader profile

Trade history

Create ad flow

Ad management dashboard

Notifications center

Admin P2P dashboard

Mobile marketplace

Mobile trade room

Mobile dispute flow

Mobile admin dispute queue

Backend wiring notes for implementation
After Figma updates the visuals, implementation should wire each visual state to real backend state only.

Expected backend/API concepts:

Marketplace offers:

/api/p2p/offers

Best match:

/api/p2p/match/best

Create ad:

/api/p2p/create-ad

Create trade:

/api/p2p/trade/create

Trade detail:

/api/p2p/trade/{trade_id} or equivalent

Chat/messages:

P2P chat endpoints / WebSocket

Payment proof:

upload endpoint

Mark paid:

payment-sent endpoint

Seller release:

release endpoint

Dispute:

dispute endpoint

Admin dispute queue/detail/ruling:

admin P2P endpoints

Dashboard metrics:

admin P2P metrics endpoint

If any endpoint does not exist yet, the UI should show:

Backend feed required

Do not fake the action, number, balance, timer, rating, or escrow state.

Definition of done
The P2P design is complete when every critical user action has:

Default state

Loading state

Success state

Empty state

Error state

Permission denied state

Backend unavailable state

Mobile version

Desktop version

Confirmation modal for risky actions

Audit/ledger/escrow evidence where money moves

Final expectation: the updated Figma should feel like a proper Binance-level P2P trading product with full marketplace, escrow, dispute, admin, mobile, and operational flows — not just a nice-looking marketplace card page.


