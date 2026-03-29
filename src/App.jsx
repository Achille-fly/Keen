import { useState, useEffect } from "react";

const C = {
  bg:"#0A0A0F", surface:"#12121A", card:"#1A1A26", border:"#2A2A3E",
  accent:"#C8A96E", text:"#E8E4DC", muted:"#8A8699", dim:"#5A566A",
  danger:"#E05C5C", success:"#4CAF7D", info:"#5B8FD4", purple:"#9B72E8",
};

const DIMS = {
  impulsivity:     { label:"Impulse Control",       icon:"⚡", lo:"Pure impulsive",          hi:"Absolute zen" },
  riskTolerance:   { label:"Risk Tolerance",         icon:"🎯", lo:"Risk averse",              hi:"Volatility hunter" },
  patience:        { label:"Patience",               icon:"⏳", lo:"Wants everything now",     hi:"Can wait for weeks" },
  analyticalDepth: { label:"Analytical Depth",       icon:"🔬", lo:"Pure instinct",             hi:"Over-analyzer" },
  lossAversion:    { label:"Loss Resilience",        icon:"🛡", lo:"Very sensitive to losses",  hi:"Indifferent to losses" },
  selfConfidence:  { label:"Self-Confidence",        icon:"💎", lo:"Impostor syndrome",         hi:"Oversized ego" },
  moneyMindset:    { label:"Money Mindset",          icon:"💰", lo:"Deep mental blocks",        hi:"Creation tool" },
  discipline:      { label:"Discipline",             icon:"📐", lo:"Rules? What rules?",        hi:"Robotic discipline" },
};

const ARCHETYPES = {
  sniper: {
    name:"The Sniper", emoji:"🎯", color:C.accent, style:"Swing Trading / Position Trading",
    desc:"You are a hunter of perfect setups. You can wait weeks for an ideal entry and never pull the trigger halfway. Your patience and discipline make you an exceptional trader — if you resist the temptation of boredom.",
    strengths:["Extreme patience and natural selectivity","Entry quality above average","Excellent risk/reward ratio","Very little overtrading"],
    weaknesses:["May pass on valid opportunities","Risk of over-analyzing and entering too late","Frustrating inactivity in range markets"],
    biases:[
      {name:"Confirmation Bias",sev:"high",desc:"You unconsciously seek signals that validate your already-built thesis, ignoring elements that contradict it. In trading, this makes you miss reversals."},
      {name:"Analysis Paralysis",sev:"high",desc:"Information overload creates cognitive overload that blocks you at the moment of action. You wait for the perfect confirmation that never comes."},
      {name:"Ambiguity Aversion",sev:"medium",desc:"The natural uncertainty of the market is difficult for you to tolerate. You avoid legitimate trades because they're not 'clear enough'."},
      {name:"Omission Bias",sev:"medium",desc:"You unconsciously prefer inaction over risking an active mistake. Missed trades don't feel as painful as they actually are."},
    ],
    portrait:"You are someone who prefers waiting for the perfect moment rather than acting under pressure. This rare quality is a real strength in trading. But this same patience can become an excuse to avoid risk when it's truly needed. Your brain has developed a high tolerance for inaction that, in real life, is perceived as wisdom — but in the markets, it can turn into chronic missed opportunities.",
    save:"Your natural discipline protects you from the number one trap of beginner traders: overtrading. You will have an impeccable trading journal and respect your plan even when the market tempts you. This quality that others take years to develop, you already possess naturally.",
    destroy:"Your main enemy is boredom in range markets. You'll look to 'do something' when you should wait. This situational impatience can ruin weeks of discipline in a few forced bad trades.",
    actionFull:[
      "Define in writing 4 entry criteria and accept entering when 3 out of 4 are validated. Perfection doesn't exist — systematic discipline does.",
      "Create a journal of trades you did NOT take. Each week, analyze what happened on those setups. You'll discover that your over-selectivity costs you more than it protects you.",
      "In range markets, reduce your position size to 25% of normal rather than not trading. This keeps you active without exposing your capital to bad conditions.",
      "Set a daily 30-minute window to scan for opportunities with an offensive mindset, not a defensive one. Outside this window, don't look at charts.",
    ],
    actionTeaser:"Create a journal of trades you did NOT take. Each week, analyze what happened on those setups. You'll discover that your over-selectivity costs you more than it protects you...",
    trading: {
      rr: { min:2.5, ideal:4, max:8, comment:"Your profile justifies waiting for high R/R. With your natural selectivity, a minimum R/R of 2.5 is non-negotiable — below that, you're working for nothing." },
      duration: { label:"3–4 weeks (ideal)", detail:"Intraday frustrates you and pushes you toward over-analysis. Your true edge deploys over several weeks where your patience creates real value." },
      sessions: [
        { ok:true,  text:"Sessions where key levels are tested (EU/US open)" },
        { ok:true,  text:"Analyze in the evening, execute on daily close" },
        { ok:false, text:"Mid-session — market noise, no clean signal" },
      ],
      markets: [
        { ok:true,  name:"Major Forex pairs", why:"Long, clean trends perfect for holding positions. Your patience is an edge here." },
        { ok:true,  name:"Indices & commodities", why:"Multi-week macro trends. Exactly what you need to let your theses play out fully." },
        { ok:false, name:"Short-term crypto", why:"Erratic volatility is psychologically incompatible with your need for clean, confirmed setups." },
      ],
      stops: [
        { type:"recommended", name:"Stop below key structure", desc:"Place your stop below the last swing low or major support. Gives you space for the thesis to develop without being shaken out by noise." },
        { type:"recommended", name:"Volatility-based trailing stop (ATR)", desc:"A trailing stop calculated on recent volatility lets you run your gains while protecting against reversals. Adapted to your longer positions." },
        { type:"advanced",    name:"Time-based exit", desc:"If the position doesn't move in the expected direction after X days, exit even without being stopped by price. Free up capital for better opportunities." },
        { type:"avoid",       name:"Tight intraday stop", desc:"Stops that are too tight will shake you out on noise and frustrate your natural patience. Incompatible with your time horizon." },
      ],
      setups: [
        { name:"Market structure & key levels", lead:"Start by exploring the reading of horizontal levels and supply/demand zones. This is the foundation of your Sniper psychology — waiting for price to return to a precise zone." },
        { name:"Retracements & reaction zones", lead:"Explore methods based on trend retracements. The idea: a trend that corrects offers a better entry point than chasing the move." },
        { name:"Multi-timeframe confluence", lead:"The Sniper only acts when multiple timeframes tell the same story. Get familiar with top-down analysis: direction on higher timeframe, entry on lower timeframe." },
        { name:"Continuation patterns & fakeouts", lead:"False breakouts (fakeouts) are your natural terrain: the market traps the impatient, and you wait for confirmation. Explore the concepts of stop hunts and liquidity grabs." },
      ],
      risk: {
        size:"1–2% of capital per trade. Your selectivity justifies going up to 2% on your most convincing setups.",
        maxdd:"Stop threshold: –10% of account. If reached, mandatory 2-week pause.",
        freq:"5 to 15 trades per month. Beyond that, you're forcing setups — that's your warning signal.",
        scaling:"Recommended: enter at 50% of target size, add 30% on first confirmation, 20% on second.",
      },
    },
  },

  predator: {
    name:"The Predator", emoji:"🐆", color:C.danger, style:"Scalping / Fast Day Trading",
    desc:"You are built for action. You process information at lightning speed and decide in fractions of a second. The market is your natural hunting ground. The danger: your impulsivity can cost you dearly if not channeled by a strict system.",
    strengths:["Exceptional reactivity and decision speed","Ability to handle high stress without freezing","Maximum exploitation of short-term opportunities"],
    weaknesses:["Near-systematic overtrading without strict rules","Revenge trading after a losing streak","Decision fatigue by end of session"],
    biases:[
      {name:"Intense FOMO",sev:"high",desc:"Fear of missing a move pushes you into unconfirmed setups, often at the worst moment — exactly when the move is over."},
      {name:"Cyclical Overconfidence",sev:"high",desc:"After a winning streak, your brain underestimates risk and irrationally increases position size. That's when big drawdowns hit."},
      {name:"Recency Bias",sev:"medium",desc:"Recent trades carry disproportionate weight on your next decisions. A recent loss makes you too cautious, a recent win makes you too bold."},
      {name:"Illusion of Control",sev:"medium",desc:"Your processing speed gives you a feeling of market mastery. You think you can 'feel' moves when you're often just reacting to noise."},
    ],
    portrait:"You run on adrenaline. Where others see chaos, you see opportunities. This processing speed is a real edge in short markets — but it hides a structural danger: you act before thinking, and in trading that second of reflection matters enormously over time.",
    save:"Your ability to absorb pressure and bounce back quickly after a loss is precious. You won't be paralyzed by drawdowns. You're built for volatile markets and high-volume sessions where others collapse.",
    destroy:"Revenge trading is your Achilles' heel. After a losing streak, your brain will try to 'recover' and you'll take oversized risks in a degraded emotional state. Many brilliant predators have lost everything in a single bad revenge trading session.",
    actionFull:[
      "Absolute non-negotiable rule: after 2 consecutive losses in the same session, you stop trading for the rest of the day. No discussion, no exceptions.",
      "Set a 45-second timer between identifying a setup and placing the order. This forced delay will filter out half your bad trades without eliminating the good ones.",
      "Define your maximum daily risk in dollars, not percentage. When you hit it, the session is over. The brain reacts differently to concrete numbers.",
      "Keep an emotional journal alongside your trade journal: rate your state before each session out of 10. You'll discover a very clear correlation between your state and performance.",
    ],
    actionTeaser:"Set a 45-second timer between identifying a setup and placing the order. This forced delay will filter out half your bad trades without eliminating the good ones — because real setups are still there after 45 seconds...",
    trading: {
      rr: { min:1.5, ideal:2, max:3, comment:"In scalping/day trading, a R/R of 1.5 to 2 is realistic if your win rate is high. Don't chase 5R in scalping — it doesn't exist in a reproducible way at this frequency." },
      duration: { label:"5–30 minutes (ideal)", detail:"Beyond 2 hours, your concentration drops and you start making poor decisions. Several short trades beat one long failed one." },
      sessions: [
        { ok:true,  text:"London open (8–10am): best momentum, high volumes" },
        { ok:true,  text:"NY open (9:30–11:30am): strong directional moves" },
        { ok:false, text:"Mid-session (12–2pm): dead market, frequent traps" },
        { ok:false, text:"Friday afternoon: low conviction range markets" },
      ],
      markets: [
        { ok:true,  name:"Major Forex pairs (highest liquidity)", why:"Tightest spreads, highest volumes. Perfect liquidity for your fast trading style." },
        { ok:true,  name:"Index futures (large contracts)", why:"Fast and clean moves, perfect for your reactivity. Institutional liquidity = little manipulation." },
        { ok:false, name:"Illiquid markets / small caps", why:"High spreads and manipulation cancel your advantage. You'll get killed on transaction costs." },
      ],
      stops: [
        { type:"recommended", name:"Fixed stop below short structure (M1/M5)", desc:"Stop just below the last pivot on your entry timeframe. Short, precise, non-negotiable. You cut fast and look for the next setup." },
        { type:"recommended", name:"Recent volatility-based stop (short-term ATR)", desc:"Adapt your stop to current market volatility rather than a fixed pip number. Avoids exits on normal noise." },
        { type:"advanced",    name:"Tight trailing once 1R reached", desc:"Once the trade reaches 1R profit, move stop to break-even then use a tight trail. Protects gains on your best trades." },
        { type:"avoid",       name:"Mental stop without a real order", desc:"Catastrophic for your profile. Without a real order in the market, your brain will negotiate with you every time — and lose every time." },
      ],
      setups: [
        { name:"Momentum & volume breakouts", lead:"Explore breakout of range concepts with volume confirmation. The core idea: a market breaking a level with force is your natural entry door. Volume is your false signal filter." },
        { name:"Pre-session levels (pre-market / previous day)", lead:"Before each session, mark yesterday's key levels and pre-market range. These zones attract liquidity and create the directional moves you're looking for." },
        { name:"Trend continuation on short timeframe", lead:"Get familiar with reading pullbacks on intraday trends. The key concept: enter in the direction of the existing flow, not against it." },
        { name:"Order flow & market imbalances", lead:"To go further, explore order flow reading. This is the natural edge of the Predator — seeing institutional intent before price moves." },
      ],
      risk: {
        size:"0.5–1% of capital per trade. With the number of trades you take, never exceed 1% — losses accumulate very fast in scalping.",
        maxdd:"Daily stop threshold: –2% of account. Weekly: –5%. Non-negotiable rules.",
        freq:"20 to 80 trades per month depending on strategy. Beyond 100, you're scalping noise.",
        scaling:"Pyramiding not recommended in short-term scalping. Focus on execution excellence rather than complex position management.",
      },
    },
  },

  architect: {
    name:"The Architect", emoji:"🏗", color:C.info, style:"Swing Trading / Algo Trading",
    desc:"You build systems, not trades. Your ability to analyze deeply and create robust rules is your greatest asset. You thrive when the market follows your logic — watch out for data-dredging and over-optimization.",
    strengths:["Building solid and reproducible systems","Analytical rigor and serious backtesting","Little emotion in execution"],
    weaknesses:["Over-optimization on past data","Rigidity when market regime changes","Misses intuitive non-modelable opportunities"],
    biases:[
      {name:"Overfitting Bias",sev:"high",desc:"Your system is perfect on the past because you optimized it on the past. Markets change, and a too-rigid model will die at the first regime change."},
      {name:"Anchoring to Models",sev:"high",desc:"Once you've built a system, you struggle to accept that it no longer works. You adjust parameters instead of recognizing invalidation."},
      {name:"Data Confirmation Bias",sev:"medium",desc:"You unconsciously choose backtest periods that validate your thesis. Walk-forward testing often reveals a very different reality."},
      {name:"Illusion of Precision",sev:"medium",desc:"The apparent precision of a quantitative model creates false security. Markets have fat-tailed distributions that standard models don't capture."},
    ],
    portrait:"Your brain constantly runs to build models. You're comfortable with data, rules, and systems. In trading, this quality is rare and precious. But logic applied to a complex adaptive system like the market has its own limits.",
    save:"Your analytical rigor will let you build a verifiable and reproducible edge. Where others improvise, you'll have precise entry rules, defined exit criteria, and a system tested on historical data.",
    destroy:"Overfitting is your existential trap. You'll optimize your system on the past until it's perfect on the past. Then the market will change and your system will die. And you won't easily accept its death — you'll keep tweaking it until the account hemorrhages.",
    actionFull:[
      "Impose an absolute constraint on yourself: any trading system must fit in maximum 3 parameters. If you can't explain it in 2 sentences, it's over-optimized.",
      "Mandatory walk-forward testing on the most recent 20% of data you've never touched. If the system doesn't perform on this unseen data, it's not robust.",
      "Define in advance the exact conditions that invalidate your system: maximum drawdown, number of consecutive losses, volatility change.",
      "Keep 20% of your capital for pure discretionary trading to stay connected to market reality and prevent the cognitive rigidity of a 100% systematic approach.",
    ],
    actionTeaser:"Mandatory walk-forward testing on the most recent 20% of data you've never touched. If the system doesn't perform on this unseen data, it's not robust — regardless of backtest performance...",
    trading: {
      rr: { min:1.8, ideal:2.5, max:4, comment:"Your edge comes from repeatability, not home runs. A reproducible R/R of 2–2.5 over 100 trades is more valuable than a R/R of 5 over 10 trades." },
      duration: { label:"5–10 days (ideal)", detail:"Short enough that conditions remain similar to your backtest, long enough for your statistical edge to deploy. The horizon where rigor beats emotion." },
      sessions: [
        { ok:true,  text:"Planned entries: execute at system-defined moments, no improvisation" },
        { ok:true,  text:"Backtest your setups by session — your system likely performs very differently" },
        { ok:false, text:"Trading major news events if your system isn't calibrated for news volatility" },
      ],
      markets: [
        { ok:true,  name:"Major Forex pairs", why:"Perfect liquidity for backtesting. Predictable spreads. Quality historical data. The ideal environment to validate a system." },
        { ok:true,  name:"Standardized futures (large contracts)", why:"Fixed commissions, tick data available, no surprising slippage. The ideal architecture for algorithmic trading." },
        { ok:false, name:"Complex options", why:"The time component and implied volatility add a layer of complexity that makes backtesting unreliable to start with." },
      ],
      stops: [
        { type:"recommended", name:"Volatility-based stop (ATR × 1.5–2)", desc:"The most robust stop for a system: automatically adapts to market volatility. Resists changing regimes without constant recalibration." },
        { type:"recommended", name:"Structure-based stop (swing points)", desc:"Pure price logic: stop below last swing low in uptrend. Simple, testable, reproducible — the three qualities of a good system." },
        { type:"advanced",    name:"Chandelier trailing stop (volatility-based)", desc:"One of the few trailing stops with a solid historical backtest. Lets trends run while protecting." },
        { type:"avoid",       name:"Indicator-only stop (MA crossover, RSI level)", desc:"Stops based on indicator signals are fragile and prone to whipsaws. Always prefer a price structure basis." },
      ],
      setups: [
        { name:"Breakout & trend-following systems", lead:"Start with trend-following strategies. This is the most proven approach on long historical data and the most compatible with your need for rigorous backtestable systems." },
        { name:"Statistical mean reversion", lead:"Explore mean reversion strategies on assets that statistically deviate from their value. The quintessential quantitative approach — but note: it performs differently across market regimes." },
        { name:"Market regime filter", lead:"Before any system, explore the concept of regime detection: is the market trending or ranging? A good system adapts its behavior to the regime. This is the most important parameter you'll test." },
        { name:"Range compression breakout", lead:"Low volatility periods often precede strong moves. Explore methods that identify these compressions and the conditions under which they reliably generate expansion." },
      ],
      risk: {
        size:"Kelly fraction based on your real backtest metrics (win rate + average R/R). Never exceed 0.25× Kelly for robustness.",
        maxdd:"Define your system stop threshold at 2× the maximum historical drawdown of the backtest. If reached live, the system is invalidated — not recalibrated.",
        freq:"Defined by the system, not by you. If the system generates 8 signals, you take 8 trades. If 0, you wait without exception.",
        scaling:"Systematic pyramiding possible if tested in the backtest. Never invent scaling rules live — that invalidates your backtest.",
      },
    },
  },

  ghost: {
    name:"The Ghost", emoji:"👻", color:C.purple, style:"Position Trading / Long-term Investing",
    desc:"You enter, set your stops, and disappear. Your composure in the face of market turbulence is legendary. You don't need to watch prices all day — and that's precisely your strength over the long term.",
    strengths:["Natural emotional detachment from short-term fluctuations","Macro vision and ability to hold long positions","Very low transaction costs"],
    weaknesses:["May miss rapid reversal signals","Intense frustration in trendless markets","Stop loss sometimes too wide on some trades"],
    biases:[
      {name:"Status Quo Bias",sev:"high",desc:"Once in a position, you tend not to modify it even when conditions change. Inertia becomes a risk in itself."},
      {name:"Entry Price Anchoring",sev:"high",desc:"You unconsciously evaluate your positions against your entry price rather than current market conditions."},
      {name:"Under-reactivity to Warning Signals",sev:"medium",desc:"Your natural detachment can make you impervious to signals requiring rapid exit. You stay when you should leave."},
      {name:"Long-term Confirmation Bias",sev:"medium",desc:"On long theses, you accumulate evidence confirming your view and minimize contradicting evidence — sometimes for months."},
    ],
    portrait:"You are naturally detached from daily market noise. This emotional detachment quality that others take years to develop comes instinctively to you. In position trading, it's a massive edge — you don't get shaken out of good trades by normal market noise.",
    save:"Your ability to let gains run without rushing to take profit is what separates good traders from great ones. You'll be able to hold positions for weeks or months, letting the macro thesis fully play out.",
    destroy:"In trendless or highly volatile markets, your lack of attention can cost you dearly. You risk not seeing warning signals that require rapid exit — and your initial stop will sometimes be too far away to effectively limit the loss.",
    actionFull:[
      "Set price alerts on all your key levels — you don't need to watch markets, but you must be notified when critical thresholds are reached.",
      "Implement a weekly 30-minute review with one single question: 'If I didn't have this position, would I open it today?' If no, exit.",
      "Use volatility-based trailing stops rather than fixed stops on your winning positions. Automatic gain protection without active intervention.",
      "Define in writing BEFORE each entry the 3 conditions that would invalidate your thesis. When one is reached, the exit is no longer a decision — it's an execution.",
    ],
    actionTeaser:"Implement a weekly 30-minute review with one single question: 'If I didn't have this position, would I open it today at current conditions?' If no...",
    trading: {
      rr: { min:3, ideal:6, max:15, comment:"In position trading, a R/R of 5 to 10 is not only possible but expected. Each trade must justify the opportunity cost of capital tied up for weeks." },
      duration: { label:"4–8 weeks (ideal)", detail:"This is where your psychology creates real value — resisting fluctuations where others capitulate. The long term is your natural competitive terrain." },
      sessions: [
        { ok:true,  text:"Sunday evening analysis: weekly plan, open positions, active theses" },
        { ok:true,  text:"Friday weekly review: position validation, potential invalidation" },
        { ok:false, text:"Looking at intraday charts — it can only create anxiety on your healthy positions" },
      ],
      markets: [
        { ok:true,  name:"Major indices & sectors", why:"Long and deep trends, perfect for position trading. The long-term directional bias is your structural ally." },
        { ok:true,  name:"Commodities & Gold", why:"Long cycles driven by macro factors. Multi-week to multi-month trends. Exactly your terrain." },
        { ok:false, name:"Short-term crypto / altcoins", why:"The erratic volatility of altcoins and crypto's short cycle are incompatible with your long-term psychology." },
      ],
      stops: [
        { type:"recommended", name:"Stop below major structure (weekly/daily)", desc:"Your stop must be below a significant structure on weekly or daily. Wide but logical — gives you space for the thesis to develop." },
        { type:"recommended", name:"Weekly volatility-based trailing", desc:"Slow, patient, gradually protects gains over several weeks. Perfectly adapted to your long positions." },
        { type:"advanced",    name:"'Highest close' trailing method", desc:"Move stop below the lowest of the last N closes. Very simple, very effective for position trading. Lets trends run while protecting." },
        { type:"avoid",       name:"Intraday or short-term stop", desc:"A stop on M15 or H1 will be hit by the normal noise of a multi-week position. You'll get shaken out of your best trades." },
      ],
      setups: [
        { name:"Technical analysis on large timeframes (Weekly/Daily)", lead:"Learn to read markets exclusively on Weekly and Daily. Every setup must be visible and clear on these timeframes — if you need to zoom in to see it, it's not for you." },
        { name:"Market phase identification", lead:"Explore methods that identify trend vs consolidation vs distribution phases. The Ghost only enters in clear trend phases — understanding which phase you're in is your fundamental skill." },
        { name:"Relative strength & asset selection", lead:"Explore the concept of relative strength: why trade a weak asset when you can trade the strongest in its sector? Asset selection is often more important than entry timing." },
        { name:"Macro catalysts & fundamental theses", lead:"Explore macro top-down analysis. The Ghost's best long positions are often those where technical analysis and a fundamental thesis tell the same story." },
      ],
      risk: {
        size:"1–3% of capital per position. With wide stops and long theses, you can have up to 5–8 simultaneous positions without overexposure.",
        maxdd:"Stop threshold: –15% of account over 3 consecutive months. Position trading drawdowns are longer — that's normal. Beyond 15%, the process is broken.",
        freq:"2 to 8 new positions per month. More than that means you're forcing setups — your profile needs quality, not frequency.",
        scaling:"Strongly recommended: 40% initial, +30% on first confirmation, +30% on second. Your patience lets you wait for these confirmations where others would have gone all-in at once.",
      },
    },
  },

  gambler: {
    name:"The Gambler", emoji:"🎲", color:"#E05C5C", style:"⚠ High-risk profile — mandatory reconstruction",
    desc:"Your relationship with money and risk carries the hallmarks of a gambler's psychology. This is not a condemnation — it's a starting point. Many great traders have gone through this phase. But trading without recognizing it is dangerous.",
    strengths:["Natural tolerance for uncertainty","Risk acceptance without paralysis","Raw resilience after losses"],
    weaknesses:["Addiction to risk and excitement","Systematic revenge trading","Chronic inability to cut losses"],
    biases:[
      {name:"Gambler's Fallacy",sev:"high",desc:"After several losses, you believe 'it must eventually win'. The market has no memory of your previous trades. Each trade is independent."},
      {name:"Illusion of Control",sev:"high",desc:"You overestimate your influence on random events. In markets, many things you think you 'feel' are statistical noise."},
      {name:"Hot Hand Fallacy",sev:"high",desc:"The belief that patterns repeat predictably when markets are fundamentally non-stationary."},
      {name:"Stimulation Seeking",sev:"medium",desc:"You sometimes trade for the thrill as much as the gain. This parasitic motivation makes decisions for you without you realizing it."},
    ],
    portrait:"Something in you seeks the thrill as much as the gain. Trading isn't just a way to make money — it's an arena, a trial. This energy can be a force, but unguided and unrecognized, it's destructive with mathematical certainty.",
    save:"Your natural tolerance for uncertainty and risk is precious raw material. Many traders fail because they can't handle emotional volatility — you can. You just need to learn to direct this energy in the right direction.",
    destroy:"An untreated gambler's account follows only one trajectory: toward zero, but with spectacular highs that maintain the illusion. Revenge trading after a loss will push you to double down in a degraded emotional state — that's where everything collapses.",
    actionFull:[
      "ABSOLUTE PRIORITY: paper trading (simulation) for at least 3 months minimum, or with microscopic sizes (0.1% of capital per trade). Without this step, nothing else makes sense.",
      "Work seriously on your relationship with money and risk-taking. This is not optional — it's the prerequisite for everything. Psychology of trading literature (Mark Douglas first) is your starting point.",
      "Install a 'cooling period' rule: after any loss exceeding 2% of capital, mandatory 24 hours without trading. No exceptions. This rule alone can save an account.",
      "Seriously consider working with a specialist on compulsive behaviors before risking significant real capital. This is not weakness — it's the most profitable decision you can make.",
    ],
    actionTeaser:"Work seriously on your relationship with money and risk-taking. This is not optional — it's the prerequisite for everything. The psychology of trading literature is your starting point...",
    trading: {
      rr: { min:2, ideal:3, max:5, comment:"WARNING: before thinking about R/R, first solve your relationship with risk. A good R/R on a gambler's system changes nothing — it's the behavior that must change first." },
      duration: { label:"Swing only (2–10 days)", detail:"Absolutely avoid intraday and scalping during your reconstruction phase. Trade frequency feeds gambling behavior. Swing trading with natural delays between decisions is your lifeline." },
      sessions: [
        { ok:true,  text:"Fixed, short monitoring hours (max 1 hour/day)" },
        { ok:false, text:"Trading outside these hours, no matter what" },
        { ok:false, text:"Price notifications enabled — every alert is a temptation" },
      ],
      markets: [
        { ok:true,  name:"Major Forex pairs only (most liquid)", why:"Most liquid markets, hardest to manipulate. Avoid anything that can feel like a casino." },
        { ok:true,  name:"Broad index ETFs", why:"Natural diversification, no idiosyncratic risk. Perfect for rebuilding without over-excitement." },
        { ok:false, name:"Options, high-leverage futures, crypto alts", why:"These instruments amplify exactly the behaviors you need to correct. Leverage + gambling psychology = guaranteed destruction." },
      ],
      stops: [
        { type:"recommended", name:"Automatic OCO stop immediately at entry", desc:"Stop loss placed IMMEDIATELY at market entry, with OCO order. Make it physically impossible to move a stop against you." },
        { type:"recommended", name:"Fixed stop, absolutely never moved against you", desc:"This is the most important rule for your profile. Your stop never moves against you. Never. Non-negotiable." },
        { type:"avoid",       name:"Mental stop", desc:"Absolutely destructive for your profile. Without a real order in the market, you'll negotiate with yourself every time — and lose that negotiation systematically." },
        { type:"avoid",       name:"Averaging down / martingale", desc:"The gambler's favorite strategy. 'If it drops, I'll buy more lower.' This is the surest way to blow up an account." },
      ],
      setups: [
        { name:"One concept, mastered thoroughly", lead:"Do NOT try to diversify approaches. Choose ONE simple concept and repeat it 200 times before adding another. Variety of approaches feeds gambling behavior — it gives an excuse to 'change strategy' after every loss." },
        { name:"Simple, obvious market structures", lead:"Start with the most obvious horizontal levels — supports, resistances, previous week's high/low. Levels everyone sees. No subtlety, no secret — just execution discipline." },
        { name:"Mandatory confirmation on candle close", lead:"Never enter on an open candle. Always wait for the confirmation close. This forced delay massively reduces impulsive entries and forces you to react to facts, not emotions." },
        { name:"Written pre-trade checklist", lead:"Before every trade, write down: the setup, entry level, stop, target, R/R. If you can't clearly write them down, you don't enter. This process slows down impulsivity." },
      ],
      risk: {
        size:"0.5% of capital per trade MAXIMUM during reconstruction. The goal is to change behavior, not make money right now.",
        maxdd:"Stop threshold: –5% of account. If reached, mandatory 2-week pause and return to paper trading. Non-negotiable.",
        freq:"Maximum 15 trades per month. Count each trade. Beyond 15, you're trading by addiction, not by edge.",
        scaling:"Forbidden during reconstruction phase. One trade = one fixed size defined before entry. No additions.",
      },
    },
  },

  analyst: {
    name:"The Paralyzed Analyst", emoji:"🔬", color:C.purple, style:"Swing Trading with strict execution rules",
    desc:"You have the analytical intelligence of an excellent trader but your pursuit of perfection prevents you from acting. Your biggest enemy is not the market — it's your own indecision. Trading will force you to accept uncertainty.",
    strengths:["Analytical intelligence and preparation rigor","Theoretically solid risk management","Rarely on bad setups when you do act"],
    weaknesses:["Chronic paralysis at the moment of entry","Information overload and overthinking","Systematic self-doubt that sabotages good decisions"],
    biases:[
      {name:"Paralyzing Perfectionism",sev:"high",desc:"You wait for the perfect setup that will never exist. In trading, a good executed setup is infinitely better than a perfect missed one."},
      {name:"Omission Bias",sev:"high",desc:"You unconsciously prefer inaction over risking an active mistake. Missed trades don't feel as painful as they should."},
      {name:"Cognitive Overload",sev:"medium",desc:"You collect too many indicators, too many analyses, too many opinions. This contradictory information creates decisional paralysis at the critical moment."},
      {name:"Ambiguity Aversion",sev:"medium",desc:"The market's natural uncertainty is deeply uncomfortable. You avoid legitimate trades because they're not 'certain enough'."},
    ],
    portrait:"You are the trader who has prepared everything — the analyses, the levels, the scenarios — and watches the market move without them. Your intelligence is undeniable but it turns against you in action. The pursuit of perfect certainty is an illusion the market will never give you.",
    save:"When you do decide, your preparation is often excellent. You rarely enter bad setups. The problem is not the quality of your analyses — it's the quantity of trades you miss waiting for unnecessary confirmation.",
    destroy:"You'll lose money in a strange way: not by losing trades, but by watching opportunities go by until accumulated frustration pushes you to enter randomly on a mediocre setup.",
    actionFull:[
      "3-criteria method: define 4 entry criteria and accept entering when 3 out of 4 are validated. Absolute ban on waiting for all 4. This rule transforms subjective decision into objective process.",
      "Mandatory entry timer: once the setup is identified and 3 criteria validated, you have exactly 5 minutes to place the order or cancel it definitively. Without this timer, your brain will look for the 4th criterion indefinitely.",
      "Start with microscopic size (0.1% of capital) to desensitize your brain to financial stakes. Low stakes = low anxiety = possible action.",
      "Journal every identified but untaken setup with the reason for passing. Each week: how many would have been winners? You'll discover your over-filtering costs more than your losses.",
    ],
    actionTeaser:"Mandatory entry timer: once the setup is identified and 3 criteria validated, you have exactly 5 minutes to place the order or cancel it definitively. Without this timer, your brain will look for the 4th criterion indefinitely...",
    trading: {
      rr: { min:2, ideal:3, max:5, comment:"A R/R of 2–3 is perfect for you. High enough that each trade is worth it, low enough that setups appear frequently. Don't target 5R — it would encourage you to wait even longer." },
      duration: { label:"5–10 days (ideal)", detail:"Multi-day swing is your ideal format. Long enough that the analysis you do is justified. Short enough that your invalidation criteria remain clear." },
      sessions: [
        { ok:true,  text:"Evening analysis (8–10pm): prepare setups without time pressure" },
        { ok:true,  text:"Morning execution according to yesterday's plan — not in real-time" },
        { ok:false, text:"Watching charts in real-time — it'll make you want to analyze more and more" },
      ],
      markets: [
        { ok:true,  name:"Major Forex pairs", why:"Clear trends, reliable technical analysis, abundant data. The perfect environment for your analysis to have real value." },
        { ok:true,  name:"Large-cap stocks", why:"Solid fundamentals + technical analysis. Two analysis layers for you, which is reassuring and legitimate." },
        { ok:false, name:"Penny stocks, obscure crypto", why:"Little data, high manipulation — your analysis has no value in these markets. Frustrating and counterproductive." },
      ],
      stops: [
        { type:"recommended", name:"Pre-calculated stop BEFORE looking for entry", desc:"Your rule #1: stop level is calculated and validated before looking for entry. Never the reverse. This prevents justifying a stop that's too tight after the fact." },
        { type:"recommended", name:"Stop on confluence (structure + Fibonacci)", desc:"The most solid stop for your profile: it rests on two confirmations, which satisfies your analysis need without being paralyzing." },
        { type:"advanced",    name:"Daily structure trailing", desc:"For your winning trades, trail your stop below each new swing low on Daily. Simple, structured, easy to rationally justify." },
        { type:"avoid",       name:"Stop 'I'll adjust if needed'", desc:"This apparent flexibility is a trap. You'll 'adjust' in the wrong direction under pressure. Fixed stop = respected stop." },
      ],
      setups: [
        { name:"Multi-factor confluence as entry criterion", lead:"This is your natural approach — multiple elements telling the same story before acting. Explore confluence-based methods (level + structure + momentum signal). The important thing: define how many factors are enough. 3 out of 4 — not 4 out of 4." },
        { name:"Entries on pre-identified levels only", lead:"Fundamental rule to impose on yourself: you can only enter on levels identified BEFORE the session opens. Not 'I just saw a beautiful setup'. This constraint eliminates unprepared entries and reduces improvisation anxiety." },
        { name:"Limit orders rather than market orders", lead:"Placing a limit order forces you to define your exact level in advance. If price doesn't reach your level, the trade doesn't happen — and that's fine. A structured approach that matches your psychology." },
        { name:"Radical reduction of indicators", lead:"Explore the idea of trading with maximum 2 elements on your charts. Not 6 indicators, not 3 systems. The simplification constraint is counter-intuitive for you, but that's precisely the work to do." },
      ],
      risk: {
        size:"Fixed 1% of capital per trade during the learning phase. No variation based on 'conviction' — you always overestimate your conviction on your analyses.",
        maxdd:"Stop threshold: –8% of account. If reached, halve position size for a month.",
        freq:"8 to 20 trades per month. Below 8, you're too selective. Beyond 20, you're forcing.",
        scaling:"Possible but only on confirmation: add 50% of initial position when first target is reached. Simple, structured, justifiable.",
      },
    },
  },

  contrarian: {
    name:"The Contrarian", emoji:"🔄", color:C.success, style:"Contra-trend Swing Trading / Mean Reversion",
    desc:"You do the opposite of the crowd and it doesn't scare you. Your confidence in your personal judgment and your independent thinking are enormous assets — especially for spotting reversals that everyone else misses.",
    strengths:["Rare and precious independence of judgment","Excellent detection of sentiment extremes","Little sensitive to consensus pressure"],
    weaknesses:["May position against a trend too early","Ego that resists admitting the market is right","Imprecise timing on reversals"],
    biases:[
      {name:"Excessive Contrarianism",sev:"high",desc:"Being against consensus is your identity, but sometimes consensus is right. Resisting just to resist without analysis is as dangerous as blindly following."},
      {name:"Thesis Anchoring",sev:"high",desc:"Once convinced of a reversal, you hold the position far too long, accumulating losses while waiting for the market to 'understand' what you saw."},
      {name:"Availability Bias",sev:"medium",desc:"You remember your contrarian successes much more vividly than your failures. This overestimates the actual effectiveness of your approach."},
      {name:"Overconfidence in Judgment",sev:"medium",desc:"Your confidence can degenerate into arrogance. The market can remain irrational much longer than you can remain solvent."},
    ],
    portrait:"You've developed a natural immunity to group pressure — an extremely rare and precious quality in trading. Where the crowd panics, you keep a cool head. Where the crowd is euphoric, you look for the exit. This is the profile of great macro traders.",
    save:"Your ability to hold a position against consensus, to handle pressure when everyone says you're wrong, is what generates the biggest trades. Major reversals always happen against dominant opinion — and you're one of the few who can capture them.",
    destroy:"Being contrarian too early means being wrong. Markets can remain irrational much longer than you can remain solvent. Your independent ego can make you hold a losing position too long just to be right.",
    actionFull:[
      "Enter only on measurable and quantifiable sentiment extremes. No sentiment indicator at an extreme = no contrarian entry. The objectivity of measurement protects you from your own bias.",
      "Mandatory fractional entries: build your position in 3 tranches spaced out. This protects you from imprecise timing which is every contrarian's Achilles' heel.",
      "Non-negotiable stop loss even when you're 'certain' you're right. Define the maximum loss on a contrarian thesis before entering.",
      "Define in advance the maximum time you give the thesis to play out. If in X weeks the market hasn't confirmed, you exit regardless of your opinion.",
    ],
    actionTeaser:"Mandatory fractional entries: build your position in 3 tranches spaced out. This protects you from imprecise timing which is every contrarian's Achilles' heel — the thesis can be right but the entry too early...",
    trading: {
      rr: { min:2, ideal:3.5, max:8, comment:"Contrarian trading naturally generates good R/R when timing is right. But imprecise timing requires accepting a drawdown period before the gain — hence the importance of fractional entries." },
      duration: { label:"2–4 weeks (ideal)", detail:"Reversals take time to confirm. You need enough duration for the thesis to develop, but not too much to avoid sleeping on an invalidated thesis." },
      sessions: [
        { ok:true,  text:"Sentiment data analysis at end of week" },
        { ok:true,  text:"Entries early in the week to benefit from initial reactions" },
        { ok:false, text:"Entering in the middle of a strong trend — wait for exhaustion signals" },
      ],
      markets: [
        { ok:true,  name:"Indices at volatility peaks (high VIX)", why:"When fear reaches historical levels on indices, that's your natural signal. Sentiment extremes are best documented here." },
        { ok:true,  name:"Commodities at extreme cycle points", why:"Commodity cycles are long and well-documented. Sentiment extremes create your best contrarian opportunities." },
        { ok:false, name:"In-progress momentum plays", why:"Going against strong momentum is tempting for you but statistically very risky. The trend remains your enemy until a clear exhaustion signal." },
      ],
      stops: [
        { type:"recommended", name:"Stop beyond the recent extreme of the faded move", desc:"Your stop is placed beyond the last price extreme. If this level is exceeded, the reversal thesis is invalidated — not 'almost invalidated'." },
        { type:"recommended", name:"Time-based stop (invalidation by duration)", desc:"If in X days conditions don't confirm the reversal, you exit even without being stopped by price. Time invalidation is as important as price invalidation." },
        { type:"advanced",    name:"Build position in tranches with global stop", desc:"Each tranche has its own entry level and contributes to the position's overall stop. This limits the risk of imprecise timing." },
        { type:"avoid",       name:"Averaging down on conviction", desc:"'If it was good at X, it's even better at X–10%' — this is the typical contrarian mistake. Your conviction doesn't replace a stop. Each tranche needs its own logic." },
      ],
      setups: [
        { name:"Market sentiment indicators", lead:"Your edge starts here. Explore market sentiment indicators: weekly investor surveys, put/call ratio, fear/greed indices. The idea: when everyone is in one camp, a reversal is approaching. Learn to measure these extremes objectively." },
        { name:"Technical divergences at price extremes", lead:"Explore the concept of divergence: price makes a new low but the momentum indicator doesn't. This gap is a potential sign of move exhaustion — exactly what you're looking for." },
        { name:"Reversal patterns at major levels", lead:"Familiarize yourself with price configurations signaling a possible trend inversion. The important thing is not memorizing patterns but understanding what they represent: exhaustion of the dominant camp." },
        { name:"Market cycle & phase analysis", lead:"Markets go through cyclical sentiment phases. Explore market sentiment cycle concepts — how do we go from euphoria to capitulation? This macro reading will help you contextualize your contrarian theses." },
      ],
      risk: {
        size:"Entry in 3 tranches: 1/3 initial, 1/3 at –5% if thesis holds, 1/3 on reversal confirmation. Total maximum: 3% of capital on one thesis.",
        maxdd:"Stop threshold: –12% of account. Contrarians naturally have longer drawdowns — that's normal. Beyond 12%, the selection process is probably broken.",
        freq:"3 to 10 trades per month. If you have more than 10 simultaneous contrarian theses, you're not contrarian — you just disagree with everything.",
        scaling:"Add to your position ONLY on reversal confirmation, not before. Reinforce winners, never losers.",
      },
    },
  },

  warrior: {
    name:"The Warrior", emoji:"⚔", color:"#E8A84E", style:"Day Trading / Futures",
    desc:"You combine reactivity and discipline in a rare way. You handle pressure, cut losses without hesitation and know when to go all-in. High-volume, volatile markets are your natural terrain.",
    strengths:["Fast and serene decision-making under pressure","Above-average emotional management of losses","Courage to act in moments of uncertainty"],
    weaknesses:["Gets carried away during winning streaks, seeks too much action","Misses calm markets due to lack of patience"],
    biases:[
      {name:"Post-Win Overconfidence",sev:"high",desc:"After a winning streak, you unconsciously increase position size at the precise moment when statistical luck will rebalance."},
      {name:"Risk Seeking for Its Own Sake",sev:"high",desc:"In calm markets, you force trades that don't exist to satisfy your need for action. These are the trades that destroy the most solid accounts."},
      {name:"Confirmation Bias Under Pressure",sev:"medium",desc:"In the heat of action, you see what you want to see. Processing speed can short-circuit critical analysis when it matters most."},
      {name:"Availability Heuristic",sev:"medium",desc:"Your best trades influence your expectations on the next ones too much. You try to reproduce great moments rather than optimize consistency."},
    ],
    portrait:"You have the most balanced psychology for active trading. You combine the two rarest qualities: acting fast under pressure AND maintaining discipline. This combination is what all traders seek to develop for years.",
    save:"Your ability to cut losses without hesitation is your most precious asset. Traders who survive long are those who have no emotional attachment to losing positions — and you have this naturally.",
    destroy:"After a winning streak, your brain will look for action at all costs. In calm or range markets, you'll force trades that don't exist. That's where warriors get hurt — not in battle, but when there's no battle.",
    actionFull:[
      "Define in writing the market conditions in which you don't trade: tight range, volume below Y% of average, absence of catalyst. Without clear conditions, you'll trade out of boredom.",
      "Implement a strict daily profit target: when you reach +1.5% on the account in a day, you stop completely. This rule alone will transform your consistency.",
      "Journal your performance by market type (strong trend, range, high volatility). You'll quickly see where your edge is real and where you're fighting the conditions.",
      "During winning streaks, increase position size by 10% maximum per week. Never a brutal jump — progressive sizing up protects accumulated gains from a sharp mean reversion.",
    ],
    actionTeaser:"Implement a strict daily profit target: when you reach +1.5% on the account in a day, you stop completely. This rule alone will transform your consistency — because warriors often destroy their good days by pushing for more...",
    trading: {
      rr: { min:1.8, ideal:2.5, max:4, comment:"In active day trading, a R/R of 2–2.5 with a 55–65% win rate is excellent and very reproducible. Don't chase 5R intraday — it would push you to hold too long against your nature." },
      duration: { label:"30 min – 3 hours (ideal)", detail:"You're built to close positions before end of session. Overnight positions create anxiety your profile handles poorly — and you risk cutting prematurely in pre-market." },
      sessions: [
        { ok:true,  text:"NY open (9:30–11:30am): maximum volume, clear momentum, little ambiguity" },
        { ok:true,  text:"London-NY overlap (2–5pm EST): second best window" },
        { ok:false, text:"Mid US session (12–2pm): trapping range for your profile" },
        { ok:false, text:"Last hour of close (3–4pm): accumulated decision fatigue" },
      ],
      markets: [
        { ok:true,  name:"Index futures (large contracts)", why:"Your natural markets. Massive volume, clean intraday trends, institutional liquidity. Little manipulation." },
        { ok:true,  name:"Major Forex pairs during active sessions", why:"Tight spreads, high volumes, clean directional moves during active sessions." },
        { ok:false, name:"Small caps, illiquid markets", why:"Your reactivity is an edge in liquid markets, not in manipulable ones. Small caps cancel your natural advantage." },
      ],
      stops: [
        { type:"recommended", name:"Initial stop below 5min/15min structure", desc:"Logical stop below last swing low/high on your entry timeframe. Tight but structural — you cut fast anyway, might as well make it logical." },
        { type:"recommended", name:"Break-even move once 1R reached", desc:"Once the trade reaches 1R profit, move stop to break-even. For your warrior profile, this is the most adapted gain protection rule to your psychology." },
        { type:"advanced",    name:"Tight trailing on momentum continuation", desc:"On trades that run well, a tight trailing stop protects against sharp reversals while letting the trade breathe slightly." },
        { type:"avoid",       name:"Flexible mental stop", desc:"Even if you generally cut losses well, without a real order you'll make 1 bad decision in 10 that erases 5 good ones. Real stop, always." },
      ],
      setups: [
        { name:"Pre-session levels & liquidity zones", lead:"Before each session, identify key levels from yesterday (high, low, close), pre-market range and psychological round numbers. These zones attract institutional liquidity and create the directional moves you're looking for. This is your battle preparation." },
        { name:"Intraday trend continuation", lead:"Explore methods for trading in the direction of the session's dominant move. The core idea: the intraday trend has continuation logic. Get familiar with pullbacks in a clear trend as a natural entry point." },
        { name:"Opening range breakout", lead:"The first minutes of a session often define an initial range. The break of this range with volume confirmation is one of the most studied concepts in day trading. Explore ORB (Opening Range Breakout) and its variations." },
        { name:"Volume & institutional conviction", lead:"One of the most valuable skills for the Warrior: learning to distinguish a conviction move (with volume) from a noise move (without volume). Explore volume profile and VWAP concepts as conviction indicators." },
      ],
      risk: {
        size:"1–1.5% of capital per trade. On your best setups (multiple confirmation), you can go up to 2%. Beyond that, ego takes control.",
        maxdd:"Daily stop threshold: –2% of account. Weekly: –6%. If either is reached, full stop until next Monday.",
        freq:"30 to 60 trades per month in day trading. Below 30, you're too selective. Beyond 60, you're trading out of boredom.",
        scaling:"Yes, structured: add one extra unit at break-even of first trade, global stop moved to cover. 'Scaling in momentum' technique — perfect for the Warrior.",
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POOL — 200 QUESTIONS (25 per dimension)
// ─────────────────────────────────────────────────────────────────────────────
const POOL = [
  // ── IMPULSIVITY (25) ──
  {id:1,   dim:"impulsivity", w:1.2, text:"You're at the grocery store and the line isn't moving. Someone cuts in front of you.",opts:["I intervene immediately, this is unacceptable","I sigh visibly but say nothing","I wait calmly, it's not a big deal","I switch lanes without getting upset"]},
  {id:2,   dim:"impulsivity", w:1.0, text:"You receive a message that deeply upsets you. Your first reaction:",opts:["I respond immediately with all my frustration","I wait a few minutes then respond","I wait several hours to calm down","I think it over for days before responding"]},
  {id:3,   dim:"impulsivity", w:1.1, text:"During a video game, you lose on an unexpected move. You:",opts:["Rage quit or make an aggressive gesture","I protest verbally","I accept with a bit of inner frustration","I take it well, it's just a game"]},
  {id:4,   dim:"impulsivity", w:0.9, text:"Someone cancels an important appointment at the last minute:",opts:["Immediate anger, I react strongly","I'm annoyed and show it","I'm disappointed but adapt","No problem, I improvise"]},
  {id:5,   dim:"impulsivity", w:1.3, text:"In a debate, someone says something you know is wrong:",opts:["I interrupt immediately to correct","I wait a moment then intervene","I wait until they finish speaking","I let it go, it's not essential"]},
  {id:6,   dim:"impulsivity", w:1.0, text:"You've been waiting a long time at a restaurant and they forget your order:",opts:["I call the waiter immediately and firmly","I politely remind them after a few minutes","I wait a bit more before intervening","I wait for them to come to me naturally"]},
  {id:7,   dim:"impulsivity", w:1.1, text:"You receive an email that contradicts you in front of everyone:",opts:["I reply copying everyone immediately","I reply quickly but privately","I take a night before responding","I ask for a call rather than writing"]},
  {id:8,   dim:"impulsivity", w:0.9, text:"You're stuck in traffic and you're running late:",opts:["I honk and try to overtake","I grumble alone in my car","I accept, it's not my fault","I take the opportunity to listen to a podcast"]},
  {id:9,   dim:"impulsivity", w:1.2, text:"Someone brutally interrupts you in a meeting:",opts:["I take the floor back immediately","I visibly show my displeasure","I let them finish then calmly continue","I let it go this time"]},
  {id:10,  dim:"impulsivity", w:1.0, text:"You're reading and you hear an interesting conversation nearby. You:",opts:["I listen and spontaneously join in","I eavesdrop but stay with my book","I resist the urge to listen","I put headphones on to avoid the temptation"]},
  {id:11,  dim:"impulsivity", w:1.1, text:"Your phone battery is at 5% and you don't have a charger. You:",opts:["I start panicking and texting everyone immediately","I feel anxious but try to manage it","I calmly wrap up what I'm doing","I don't worry, I'll deal with it when it dies"]},
  {id:12,  dim:"impulsivity", w:0.9, text:"A friend is telling a long story and you already know the ending. You:",opts:["I blurt out the ending immediately","I hint that I know but let them continue","I listen patiently without letting on","I genuinely enjoy hearing their version"]},
  {id:13,  dim:"impulsivity", w:1.2, text:"You see something you want on sale but you weren't planning to buy it. You:",opts:["I buy it without thinking twice","I buy it after a very quick consideration","I sleep on it and decide tomorrow","I walk away, it wasn't in my plan"]},
  {id:14,  dim:"impulsivity", w:1.0, text:"You're in a meeting and someone proposes an idea you disagree with. You:",opts:["I immediately voice my disagreement","I raise my hand right away","I wait for a natural pause then speak","I write down my thoughts to share later"]},
  {id:15,  dim:"impulsivity", w:1.1, text:"You finish work early. An unplanned but tempting activity comes up. You:",opts:["I drop everything and go immediately","I quickly wrap up and head out","I finish properly then consider going","I stick to my original plans for the evening"]},
  {id:16,  dim:"impulsivity", w:1.0, text:"Someone you follow posts something factually wrong on social media. You:",opts:["I comment immediately and publicly","I send a quick private message","I consider whether it's worth engaging","I ignore it unless it's harmful"]},
  {id:17,  dim:"impulsivity", w:1.2, text:"You're watching a movie and it starts very slowly. You:",opts:["I switch to something else within minutes","I check my phone but keep it on","I give it 20–30 minutes before deciding","I trust the process and keep watching"]},
  {id:18,  dim:"impulsivity", w:0.8, text:"You find out a friend talked behind your back. Your first move:",opts:["I confront them immediately","I bring it up when I see them next","I take some time to think before acting","I decide whether it's worth addressing at all"]},
  {id:19,  dim:"impulsivity", w:1.0, text:"You're waiting for an important email that hasn't arrived. You:",opts:["I refresh every few minutes","I check a few times throughout the day","I check once in the evening","I wait until the deadline to follow up"]},
  {id:20,  dim:"impulsivity", w:1.1, text:"You're playing a board game and losing badly. You:",opts:["I look for a reason to stop or restart","I become visibly less engaged","I continue but feel the frustration building","I stay fully in it and enjoy the challenge"]},
  {id:21,  dim:"impulsivity", w:1.0, text:"A coworker takes credit for your idea in a meeting. You:",opts:["I correct the record immediately in front of everyone","I mention it directly after the meeting","I bring it up with my manager later","I let it go and focus on the next thing"]},
  {id:22,  dim:"impulsivity", w:0.9, text:"You realize mid-trip you forgot something important at home. You:",opts:["I turn around immediately regardless of cost","I quickly weigh the options and likely turn back","I think it through calmly before deciding","I continue and figure out an alternative"]},
  {id:23,  dim:"impulsivity", w:1.1, text:"Someone challenges your opinion publicly. You:",opts:["I defend it immediately and firmly","I quickly explain my reasoning","I pause to consider their point first","I genuinely listen before responding"]},
  {id:24,  dim:"impulsivity", w:1.2, text:"You get a notification while trying to focus on deep work. You:",opts:["I check it immediately every time","I usually check within a few minutes","I check at set intervals","I put my phone on silent and check later"]},
  {id:25,  dim:"impulsivity", w:1.0, text:"A street vendor tries to pressure you into buying something. You:",opts:["I either buy or walk away very quickly","I engage briefly then leave","I listen politely then make a considered decision","I calmly say no thanks from the start"]},

  // ── RISK TOLERANCE (25) ──
  {id:26,  dim:"riskTolerance", w:1.2, text:"You're offered a choice: $500 for certain or a 50% chance of winning $1,200. You choose:",opts:["$500 for certain, without hesitation","$500 for certain, but tempted by the other","50% chance, probably","50% chance, without hesitating"]},
  {id:27,  dim:"riskTolerance", w:1.0, text:"For your vacation, you prefer:",opts:["Known hotel, destination already visited","Known hotel, new destination","Known destination, original accommodation","Totally unknown destination and accommodation"]},
  {id:28,  dim:"riskTolerance", w:1.1, text:"You must make an important decision without all the information. You:",opts:["I wait until I have all the data","I do additional research","I decide with what I have","I act immediately and adjust later"]},
  {id:29,  dim:"riskTolerance", w:0.8, text:"Trying a new restaurant: do you look at the menu in advance or discover on the spot?",opts:["I look at the menu beforehand, always","I look at the menu but stay open","I glance vaguely","I discover entirely on the spot"]},
  {id:30,  dim:"riskTolerance", w:1.2, text:"You're offered to quit your job for a personal project with 60% chance of success. You:",opts:["I refuse categorically","I refuse but think about it for a long time","I might accept if conditions are right","I accept, the opportunity is too good"]},
  {id:31,  dim:"riskTolerance", w:1.0, text:"Between your usual reliable route or a new one that might be faster but unknown:",opts:["Usual route, always","Usual route unless recommended","I try the new one, curiosity wins","New route directly, I love exploring"]},
  {id:32,  dim:"riskTolerance", w:1.1, text:"A friend invites you to an extreme activity (skydiving, cliff climbing...) :",opts:["I politely but firmly refuse","I decline but am tempted","I accept with apprehension","I accept with enthusiasm"]},
  {id:33,  dim:"riskTolerance", w:1.2, text:"You can choose between a comfortable fixed salary or a variable that could double or halve. You:",opts:["Fixed, stability above all","Fixed, but it's a shame","Variable, if conditions are good","Variable directly, I want to maximize"]},
  {id:34,  dim:"riskTolerance", w:0.9, text:"You try a new recipe for important guests tonight. You:",opts:["Never, I make a known recipe","I try it but with a backup plan","I try it with confidence","I try it and improvise if it fails"]},
  {id:35,  dim:"riskTolerance", w:1.0, text:"You play a game. What's your approach?",opts:["Bet the absolute minimum","Bet cautiously","Bet reasonably seeking good value","Bet big to maximize the gain"]},
  {id:36,  dim:"riskTolerance", w:1.1, text:"A new investment opportunity promises high returns but with significant uncertainty. You:",opts:["I avoid it entirely","I put in a small amount I can afford to lose","I research thoroughly and invest a reasonable amount","I go in substantially, risk is part of the game"]},
  {id:37,  dim:"riskTolerance", w:1.0, text:"You're offered a promotion that requires relocating to a new city. You:",opts:["I decline, too much upheaval","I seriously consider but likely decline","I weigh pros and cons carefully","I jump at the chance for a fresh start"]},
  {id:38,  dim:"riskTolerance", w:0.9, text:"At a social event, you can join a group where you know no one or wait for someone you know. You:",opts:["I wait for someone I know","I hover near groups but don't join","I introduce myself to the nearest group","I dive into the most interesting conversation"]},
  {id:39,  dim:"riskTolerance", w:1.2, text:"You find out a new restaurant just opened nearby with great reviews but long lines. You:",opts:["I'll wait until the hype dies down","I'll check it out in a month or two","I'll try to go this week","I'm going tonight"]},
  {id:40,  dim:"riskTolerance", w:1.0, text:"A startup you believe in is raising funding. You:",opts:["I wouldn't invest in startups","I'd put in a token amount","I'd invest a meaningful but cautious amount","I'd go all-in if I believe in it"]},
  {id:41,  dim:"riskTolerance", w:1.1, text:"You're about to submit a project but realize you could improve it further with more time. You:",opts:["I always ask for more time","I usually ask for a brief extension","I submit as-is if it's good enough","I submit immediately and improve the next version"]},
  {id:42,  dim:"riskTolerance", w:1.0, text:"You have the option to lock in a guaranteed 5% annual return or invest for potentially 20% (with possible loss). You:",opts:["5% guaranteed, always","5% guaranteed, mostly","I'd split it 50/50","I'd go all in on the higher potential"]},
  {id:43,  dim:"riskTolerance", w:0.8, text:"You're crossing a street and the light is red but there's no traffic visible. You:",opts:["I wait for the green light no matter what","I wait but I'm frustrated","I look both ways and cross carefully","I cross without much thought"]},
  {id:44,  dim:"riskTolerance", w:1.2, text:"Someone offers you a ticket to an event tonight that you know nothing about. You:",opts:["I decline, I don't like the unknown","I'd want more details first","I'd go if the timing works","I'd say yes immediately"]},
  {id:45,  dim:"riskTolerance", w:1.0, text:"A friend bets you $100 on something you're unsure about but feel optimistic. You:",opts:["I decline, not worth the risk","I negotiate a smaller amount","I accept the $100 bet","I try to raise the stakes"]},
  {id:46,  dim:"riskTolerance", w:1.1, text:"You're asked to give a speech or presentation with only 30 minutes of preparation. You:",opts:["I try to postpone or decline","I accept nervously and prepare intensely","I accept, I'll make it work","I embrace it, I do my best work under pressure"]},
  {id:47,  dim:"riskTolerance", w:1.0, text:"You discover a shortcut that could save significant time but you've never used it. You:",opts:["I stick to the known route","I look it up first before trying","I try it the next time I'm not in a rush","I try it immediately"]},
  {id:48,  dim:"riskTolerance", w:0.9, text:"You're ordering at a restaurant and you can't decide between a safe choice and something very unusual. You:",opts:["I always go with the safe choice","I usually go safe with one unusual side","I often go unusual","I almost always pick the most adventurous option"]},
  {id:49,  dim:"riskTolerance", w:1.2, text:"Your friend suggests an impromptu road trip this weekend with no fixed plan. You:",opts:["No thanks, I need to plan ahead","I'd consider it if we had some structure","I'd join with minimal planning","I'm already packing"]},
  {id:50,  dim:"riskTolerance", w:1.0, text:"You're thinking about starting a side business. You:",opts:["The risk stops me from starting","I'd start very small and cautiously","I'd invest a reasonable amount to get going","I'd go full-speed from day one"]},

  // ── PATIENCE (25) ──
  {id:51,  dim:"patience", w:1.2, text:"You ordered a package. Estimated delivery: 5 days. On day 4:",opts:["I've already contacted customer service","I check tracking several times a day","I check tracking once","I completely forgot, I'll see when it comes"]},
  {id:52,  dim:"patience", w:1.0, text:"A friend owes you $50 for 2 months. They don't seem to remember. You:",opts:["I bring it up as soon as possible","I wait a bit more then remind them","I drop a very gentle hint","I let it go, the friendship is worth more"]},
  {id:53,  dim:"patience", w:1.1, text:"You're learning a new skill. Progress seems slow. You:",opts:["I give up quickly if it doesn't come","I persist but with growing frustration","I persist calmly accepting the slowness","I love the process, the result is secondary"]},
  {id:54,  dim:"patience", w:0.9, text:"You're cooking a dish that needs to simmer for 2 hours. Halfway through you:",opts:["I've already tasted it 3 times and consider serving","I tasted it once to check","I waited but it was hard","I have no trouble waiting at all"]},
  {id:55,  dim:"patience", w:1.3, text:"In life, you prefer:",opts:["Immediate and frequent rewards","A good balance between short and long term","Investing now for future results","I exclusively aim for the very long term"]},
  {id:56,  dim:"patience", w:1.0, text:"You're waiting for results from an important medical exam. How long before you follow up?",opts:["I call the next day","I wait 2–3 days maximum","I wait the announced deadline","I don't think about it until they contact me"]},
  {id:57,  dim:"patience", w:1.1, text:"You just planted a tree that will take 10 years to bear fruit. You feel:",opts:["Why not a fast-growing shrub?","A little discouraged, that's a long time","Serene, it'll be beautiful in 10 years","Very satisfied, I love long-term projects"]},
  {id:58,  dim:"patience", w:0.9, text:"An app takes 30 seconds to load. Your reaction:",opts:["I close it and retry immediately","I get impatient but wait","I wait calmly","I do something else while waiting"]},
  {id:59,  dim:"patience", w:1.2, text:"The first episode of a show is slow but they say it picks up at episode 4. You:",opts:["I stop halfway through the first","I watch the first then give up","I watch until episode 2 then decide","I trust the process and watch until episode 4"]},
  {id:60,  dim:"patience", w:1.0, text:"You've been waiting for a professional opportunity for several months. You:",opts:["I look for something else immediately","I follow up regularly and get impatient","I wait while continuing to prepare","I wait serenely, it will come"]},
  {id:61,  dim:"patience", w:1.1, text:"You're in a very long queue at a theme park. The wait is 90 minutes. You:",opts:["I leave and find something with no wait","I stay but check my phone the whole time","I stay and find ways to pass the time","I enjoy the time to chat or observe"]},
  {id:62,  dim:"patience", w:1.0, text:"You're waiting for a friend who is 20 minutes late with no message. You:",opts:["I leave after 10 minutes","I send a somewhat firm message","I send a casual 'everything ok?' message","I wait without stress, life happens"]},
  {id:63,  dim:"patience", w:0.9, text:"You start a fitness program that promises results in 3 months. After 3 weeks:",opts:["I'm already questioning whether it works","I'm measuring progress anxiously","I'm staying the course with mild curiosity","I'm fully committed and not tracking"]},
  {id:64,  dim:"patience", w:1.2, text:"You're stuck on a problem for an hour with no solution. You:",opts:["I ask for help or give up","I try a different approach immediately","I keep working methodically","I find the challenge energizing"]},
  {id:65,  dim:"patience", w:1.0, text:"A negotiation or project is taking weeks longer than expected. You:",opts:["I push hard to accelerate or walk away","I express frustration and set a hard deadline","I check in regularly but stay flexible","I trust the timeline and stay focused on quality"]},
  {id:66,  dim:"patience", w:1.1, text:"You've made a long-term investment. Markets are flat for months. You:",opts:["I'm tempted to reallocate","I check it frequently and worry","I review quarterly with calm","I almost never check, it's long-term"]},
  {id:67,  dim:"patience", w:1.0, text:"You're building a complex LEGO set or puzzle. Progress is slow. You:",opts:["I lose interest within an hour","I push through but look for shortcuts","I work steadily through it","I love the methodical progress"]},
  {id:68,  dim:"patience", w:0.8, text:"A webpage is loading slowly. You:",opts:["I close and reopen immediately","I give it a few seconds then refresh","I wait while reading what's loaded","I barely notice the wait"]},
  {id:69,  dim:"patience", w:1.2, text:"You're learning a musical instrument. After 2 months you still can't play a full song. You:",opts:["I've already considered stopping","I'm frustrated but still practicing","I'm consistent but realistic about pace","I'm enjoying the journey completely"]},
  {id:70,  dim:"patience", w:1.0, text:"You've been dieting for a month with minimal visible results. You:",opts:["I've already changed my approach twice","I'm questioning if it works","I stay the course and trust the process","I barely think about results, habits are what matter"]},
  {id:71,  dim:"patience", w:1.1, text:"A software update is downloading and will take 45 minutes. You:",opts:["I cancel and try to find a faster way","I do something else but check often","I do something productive and check once","I completely forget about it until it's done"]},
  {id:72,  dim:"patience", w:1.0, text:"You're waiting for approval on an application (job, rental, etc.) that should take 2 weeks. After 10 days:",opts:["I've already followed up twice","I send a polite check-in","I trust the timeline and don't follow up","I haven't even thought about it"]},
  {id:73,  dim:"patience", w:0.9, text:"A construction project near your home is noisy and will last 6 months. You:",opts:["I actively look for solutions or complain","I'm annoyed daily but adapt","I accept it and focus on what I can control","I barely notice it after the first week"]},
  {id:74,  dim:"patience", w:1.2, text:"You started writing a book or long personal project. Progress is very slow. You:",opts:["I've abandoned it more than once","I go through frequent periods of discouragement","I make steady progress with occasional lulls","I'm methodical and fully committed for the long haul"]},
  {id:75,  dim:"patience", w:1.0, text:"Your flight is delayed by 2 hours. You:",opts:["I immediately look for alternatives or complain","I'm visibly frustrated and keep checking","I find something to do and check occasionally","I settle in and enjoy the unplanned free time"]},

  // ── ANALYTICAL DEPTH (25) ──
  {id:76,  dim:"analyticalDepth", w:1.2, text:"You must choose between two similar apartments. You:",opts:["I take the one I like instinctively","I quickly compare the key points","I make a detailed comparison table","I analyze for weeks considering all possible criteria"]},
  {id:77,  dim:"analyticalDepth", w:1.0, text:"For an important purchase, how much time do you spend researching?",opts:["Less than an hour","About a day","Several days to a week","Several weeks to a month"]},
  {id:78,  dim:"analyticalDepth", w:1.1, text:"You have a strong intuition about something but no proof. You:",opts:["I follow my instinct without looking further","I quickly look for confirmation","I look for evidence before acting","I don't move without solid proof"]},
  {id:79,  dim:"analyticalDepth", w:0.9, text:"When you read a long, complex article, you:",opts:["I read the title and skip to the conclusion","I skim the key points","I read carefully but summarize","I read, reread and take notes"]},
  {id:80,  dim:"analyticalDepth", w:1.1, text:"A friend asks your advice on a difficult choice. You:",opts:["I give my immediate gut reaction","I ask a few key questions then advise","I take time to analyze it fully with them","I want all the details before weighing in"]},
  {id:81,  dim:"analyticalDepth", w:1.0, text:"You need to quickly estimate a fair price to sell something. You:",opts:["I give a number by feel","I vaguely look at market prices","I do a serious comparison of 5–10 references","I build a complete valuation model"]},
  {id:82,  dim:"analyticalDepth", w:1.2, text:"Facing a complex problem, your first approach:",opts:["I test a solution directly","I think for 5 minutes then act","I structure the problem before acting","I map out all variables first"]},
  {id:83,  dim:"analyticalDepth", w:0.9, text:"To plan a vacation, you:",opts:["I arrive with no plan, I improvise everything","I plan the main steps only","I plan the important points in detail","I plan every day hour by hour"]},
  {id:84,  dim:"analyticalDepth", w:1.1, text:"You're asked your opinion on a topic you know little about. You:",opts:["I give my opinion immediately","I give an opinion noting my limitations","I ask for time to look into it","I refuse to comment without being sure"]},
  {id:85,  dim:"analyticalDepth", w:1.0, text:"You watch a movie. You:",opts:["I let myself be carried away without thinking","I follow the story and feel the emotions","I sometimes analyze the direction","I constantly analyze the narrative structure"]},
  {id:86,  dim:"analyticalDepth", w:1.1, text:"You need to assemble flat-pack furniture. You:",opts:["I start immediately without reading instructions","I glance at the instructions then go by feel","I read the full instructions once then build","I study the instructions thoroughly and follow step by step"]},
  {id:87,  dim:"analyticalDepth", w:1.0, text:"You're cooking something new. You:",opts:["I improvise as I go","I read the recipe once and ad-lib the rest","I follow the recipe fairly closely","I follow every step precisely"]},
  {id:88,  dim:"analyticalDepth", w:0.8, text:"Someone asks you to recommend a book or movie. You:",opts:["I give the first thing that comes to mind","I suggest one or two favorites quickly","I ask what they like first, then recommend","I need to know their full preferences before suggesting anything"]},
  {id:89,  dim:"analyticalDepth", w:1.2, text:"You're diagnosing why your plant is dying. You:",opts:["I try the first solution that comes to mind","I try the most common fix","I research possible causes before acting","I systematically test each variable to isolate the cause"]},
  {id:90,  dim:"analyticalDepth", w:1.0, text:"You're setting up a new device or app. You:",opts:["I skip everything and figure it out as I go","I get started and check the help menu when stuck","I read the getting started guide","I read the full documentation before touching anything"]},
  {id:91,  dim:"analyticalDepth", w:1.1, text:"You're reviewing a contract or document. You:",opts:["I skim the main points and sign","I read it but focus on key sections","I read it carefully and ask questions","I read every clause and cross-reference everything"]},
  {id:92,  dim:"analyticalDepth", w:1.0, text:"Someone proposes a shortcut on a hiking trail you don't know. You:",opts:["I take it immediately, sounds good","I consider it briefly and likely take it","I check the map first","I stick to the marked path, shortcuts are risky"]},
  {id:93,  dim:"analyticalDepth", w:1.2, text:"You're deciding what to order at a new restaurant. You:",opts:["I go with my gut on the first thing that sounds good","I narrow it down quickly to 2–3 options","I read the whole menu carefully","I ask the waiter detailed questions about multiple dishes"]},
  {id:94,  dim:"analyticalDepth", w:0.9, text:"Someone shares a surprising statistic with you. You:",opts:["I accept it and share it further","I note it but don't verify","I look it up when I have a chance","I immediately check the source and methodology"]},
  {id:95,  dim:"analyticalDepth", w:1.1, text:"You're buying a used car. You:",opts:["I buy based on how it looks and feels","I do a basic check and test drive","I research the model, have it inspected","I research extensively and consult multiple experts"]},
  {id:96,  dim:"analyticalDepth", w:1.0, text:"You need to pick a health insurance plan. You:",opts:["I pick the first decent-looking option","I compare 2–3 options on price","I compare several plans across multiple criteria","I analyze every plan exhaustively including fine print"]},
  {id:97,  dim:"analyticalDepth", w:1.2, text:"A friend proposes a business idea to you. You:",opts:["I react enthusiastically or not based on feel","I give quick gut-level feedback","I think it through before giving structured feedback","I want to build a full analysis before saying anything"]},
  {id:98,  dim:"analyticalDepth", w:0.8, text:"You're playing a strategy board game for the first time. You:",opts:["I jump in and learn as I play","I read the rules briefly then play","I read all the rules before starting","I read the rules and watch a tutorial before playing"]},
  {id:99,  dim:"analyticalDepth", w:1.0, text:"You need to write an important email. You:",opts:["I write what comes and send","I draft quickly and do one pass","I write, review and revise before sending","I draft, revise multiple times and often ask someone to review"]},
  {id:100, dim:"analyticalDepth", w:1.1, text:"You're choosing between two job offers. You:",opts:["I go with the one that excites me more","I weigh a few key factors quickly","I create a structured comparison across many dimensions","I analyze every aspect exhaustively over several weeks"]},

  // ── LOSS AVERSION (25) ──
  {id:101, dim:"lossAversion", w:1.3, text:"You win $100 at poker then lose $60. You leave with $40. You feel:",opts:["Mainly satisfied about winning","Mixed: happy about the gain, frustrated by the loss","Mainly frustrated about the $60 lost","Very affected, I can only think about the $60 lost"]},
  {id:102, dim:"lossAversion", w:1.2, text:"You rent a movie you don't like at all. You:",opts:["I stop without hesitation","I skip or check my phone but stay","I watch to the end hoping it improves","I finish it no matter what, I paid for it"]},
  {id:103, dim:"lossAversion", w:1.0, text:"You lose your phone. Your dominant first feeling:",opts:["Frustrated but I move on quickly","Bothered for a few hours","I ruminate for several days","It's a catastrophe that deeply affects me"]},
  {id:104, dim:"lossAversion", w:1.1, text:"You invest time in a project that seems doomed to fail. You:",opts:["I stop immediately and move on","I try a bit more but know I'll stop","I struggle to let go, I've already invested too much","I'll go to the end, no way I'm giving up"]},
  {id:105, dim:"lossAversion", w:1.3, text:"You missed an opportunity by being overly cautious. You:",opts:["I forget it easily, others will come","I blame myself a bit but move on","I ruminate quite a while on this missed chance","It obsesses me, I replay the scenario on loop"]},
  {id:106, dim:"lossAversion", w:1.0, text:"You lose at a game 3 times in a row. You:",opts:["I don't care, it's random","Slightly frustrated but still fun","I start getting seriously annoyed","I need to recover my losses before stopping"]},
  {id:107, dim:"lossAversion", w:1.1, text:"You have a subscription you never use. You:",opts:["I cancel immediately","I cancel after a few days of procrastination","I continue 'just in case' for a few months","I keep it for a long time, I already paid"]},
  {id:108, dim:"lossAversion", w:0.9, text:"You missed a great sale you had spotted. You:",opts:["Too bad, I'll find another","A little regret, it passes quickly","I blame myself, I should have bought","It gnaws at me, why didn't I act?"]},
  {id:109, dim:"lossAversion", w:1.2, text:"You sold something too early and its price doubled. You:",opts:["Happy I sold when it was right for me","A bit of disappointment but it's normal","Very frustrated by the missed gain","Impossible to think about without rage"]},
  {id:110, dim:"lossAversion", w:1.0, text:"Someone wronged you and you can't remedy it. You:",opts:["I turn the page quickly","It affects me for a few days then I let go","I ruminate quite a long time","I never truly forget it"]},
  {id:111, dim:"lossAversion", w:1.1, text:"You book a non-refundable hotel but your plans change. You:",opts:["I cancel and accept the loss","I try to resell or transfer the booking","I go anyway to not waste the money","I feel terrible about the wasted money for weeks"]},
  {id:112, dim:"lossAversion", w:1.0, text:"You backed a sports team or candidate that lost. You:",opts:["I forget it quickly, it happens","I'm disappointed but move on by next day","I feel down about it for several days","It stays with me and affects my mood for a while"]},
  {id:113, dim:"lossAversion", w:0.9, text:"A company you recommended to someone performs poorly afterward. You:",opts:["It's outside my control, I move on","I feel briefly bad but don't overthink it","I worry about having given bad advice","I replay my recommendation and feel guilty for a long time"]},
  {id:114, dim:"lossAversion", w:1.2, text:"You miss a flight due to your own mistake. You:",opts:["I immediately focus on finding the next one","I'm frustrated but shift to problem-solving quickly","I feel terrible and think about what went wrong","I have a hard time functioning until the situation is resolved"]},
  {id:115, dim:"lossAversion", w:1.0, text:"You accidentally break something of sentimental value. You:",opts:["I feel brief regret and move on","I feel sad but accept it","I feel quite bad for a while","It haunts me for a long time"]},
  {id:116, dim:"lossAversion", w:1.1, text:"You make a decision you later regret. You:",opts:["I note the lesson and move forward","I think about it briefly and let go","I ruminate and second-guess myself for a while","I can't stop replaying the decision in my head"]},
  {id:117, dim:"lossAversion", w:1.0, text:"You give away something then realize you needed it. You:",opts:["I shrug and find an alternative","I'm mildly annoyed but it's fine","I genuinely regret giving it away","I think about it every time I need that thing"]},
  {id:118, dim:"lossAversion", w:0.8, text:"You spend time creating something that doesn't turn out well. You:",opts:["I ditch it and try a different approach","I feel briefly frustrated then try again","I feel deflated and need time to recover","I lose motivation for the whole project for a while"]},
  {id:119, dim:"lossAversion", w:1.2, text:"You pass on a business or investment opportunity that later becomes very successful. You:",opts:["These things happen, I focus on next opportunities","I feel some regret but don't dwell","I think about it frequently for weeks","I bring it up often and it's a long-lasting regret"]},
  {id:120, dim:"lossAversion", w:1.0, text:"A relationship (friendship or romantic) ends unexpectedly. You:",opts:["I feel sad briefly and adapt","I go through a difficult period but recover","I struggle for quite a long time","The loss stays with me and affects future relationships"]},
  {id:121, dim:"lossAversion", w:1.1, text:"You're eliminated early in a competition you prepared for. You:",opts:["I congratulate the winner and move on","I'm disappointed but recover by next day","I feel the loss for several days","I question whether I'm good enough for a long time"]},
  {id:122, dim:"lossAversion", w:1.0, text:"You donate to a cause that turns out to be less impactful than expected. You:",opts:["I note it for future decisions and move on","I feel mild disappointment","I wish I had done more research beforehand","I feel guilty about it for a long time"]},
  {id:123, dim:"lossAversion", w:0.9, text:"You choose a restaurant that turns out to be disappointing. You:",opts:["I laugh it off and try somewhere else next time","I note it and move on","I feel like the evening was wasted","I feel disproportionately bad about the choice"]},
  {id:124, dim:"lossAversion", w:1.2, text:"You receive negative feedback on something you worked hard on. You:",opts:["I extract the useful parts and move on","I feel stung briefly but use the feedback","I dwell on it and feel discouraged","The criticism affects my confidence significantly"]},
  {id:125, dim:"lossAversion", w:1.0, text:"A plan you organized falls apart at the last moment. You:",opts:["I pivot quickly to something else","I'm frustrated but adapt","I feel the disappointment for several days","I struggle to let go of how it was supposed to be"]},

  // ── SELF-CONFIDENCE (25) ──
  {id:126, dim:"selfConfidence", w:1.2, text:"You have a strong conviction. Everyone around you says the opposite. You:",opts:["I immediately revise my position","I start doubting myself","I maintain but listen to arguments","I remain firm in my conviction"]},
  {id:127, dim:"selfConfidence", w:1.0, text:"You just made an important decision. Friends criticize it. You feel:",opts:["Immediate doubt, maybe they're right","A bit of anxiety, I reconsider","A certain comfort in my decision despite it","No second-guessing, I am serene"]},
  {id:128, dim:"selfConfidence", w:1.1, text:"You prepared something carefully. Someone criticizes it unconstructively. You:",opts:["It deeply and lastingly affects me","I'm touched but don't show it","I step back quickly","I don't care, my judgment is more reliable than theirs"]},
  {id:129, dim:"selfConfidence", w:0.9, text:"Before an important presentation, you feel:",opts:["Paralyzing anxiety","Intense but manageable stress","A little stage fright, that's all","I'm eager, the challenge excites me"]},
  {id:130, dim:"selfConfidence", w:1.1, text:"In a group, you express your opinion:",opts:["Rarely, I prefer to listen","With caution and many soft formulations","Normally, owning my point of view","Directly and without trying to please"]},
  {id:131, dim:"selfConfidence", w:1.0, text:"You present your work to a recognized expert. Their reaction is cold. You:",opts:["I immediately think my work is worthless","I seriously doubt its quality","I remain confident despite the discomfort","I think they might be wrong"]},
  {id:132, dim:"selfConfidence", w:1.2, text:"You must give your opinion in a group of people you greatly esteem. You:",opts:["I often agree to avoid disruption","I give a soft, consensual opinion","I give my real opinion tactfully","I give my opinion directly, even if it disrupts"]},
  {id:133, dim:"selfConfidence", w:0.9, text:"After a visible failure in front of others, you:",opts:["I feel ashamed for a long time","I'm affected but overcome it","I take a step back and learn","I bounce back immediately without dwelling"]},
  {id:134, dim:"selfConfidence", w:1.1, text:"A very competent person questions your approach. You:",opts:["I immediately question everything","I carefully reconsider","I listen attentively and integrate what makes sense","I defend my approach and explain why"]},
  {id:135, dim:"selfConfidence", w:1.0, text:"You must make an important decision in 60 seconds. You:",opts:["I panic and ask for more time","I make a decision but stress about it","I make a decision fairly serenely","I love these situations, I'm in my element"]},
  {id:136, dim:"selfConfidence", w:1.1, text:"You apply for a role you're not 100% qualified for. You:",opts:["I don't apply if I don't meet all criteria","I apply but expect to be filtered out","I apply and make a case for my potential","I apply confidently and highlight my unique strengths"]},
  {id:137, dim:"selfConfidence", w:1.0, text:"Someone more senior than you is wrong about a fact in a meeting. You:",opts:["I say nothing","I find a way to hint at it politely afterward","I politely correct them in the moment","I directly correct them and explain why"]},
  {id:138, dim:"selfConfidence", w:0.8, text:"You learn a new skill and others seem to progress faster. You:",opts:["I feel like I'm naturally worse at this","I feel self-conscious but keep going","I focus on my own progress","I don't compare myself to others at all"]},
  {id:139, dim:"selfConfidence", w:1.2, text:"You receive a lot of praise for your work. You:",opts:["I wonder if they really mean it","I appreciate it but feel it might be exaggerated","I accept it and feel good","I feel it's well-deserved and expected"]},
  {id:140, dim:"selfConfidence", w:1.0, text:"You're in a room full of experts in a field you know less well. You:",opts:["I stay quiet to avoid looking uninformed","I speak only when I'm very sure","I contribute when I have something to add","I engage confidently and ask good questions"]},
  {id:141, dim:"selfConfidence", w:1.1, text:"Someone repeatedly dismisses your ideas in a group setting. You:",opts:["I stop sharing ideas in that group","I become more hesitant about sharing","I address it directly or change my approach","I keep sharing and let the ideas speak for themselves"]},
  {id:142, dim:"selfConfidence", w:1.0, text:"You're asked to lead a project you've never done before. You:",opts:["I'm very reluctant and try to defer","I accept nervously and rely heavily on others","I accept and trust myself to figure it out","I embrace it as an opportunity to grow"]},
  {id:143, dim:"selfConfidence", w:0.9, text:"You attempt something new and fail the first time. You:",opts:["I take it as a sign it's not for me","I feel self-doubt creep in","I see it as a normal part of learning","I expect early failure and feel neutral about it"]},
  {id:144, dim:"selfConfidence", w:1.2, text:"You make a controversial decision that most people around you disagree with. You:",opts:["I immediately reconsider","I feel very uncomfortable with the disagreement","I stay the course while acknowledging their views","I feel more confident when I go against the grain"]},
  {id:145, dim:"selfConfidence", w:1.0, text:"You're asked to negotiate a salary or price. You:",opts:["I find it very uncomfortable and avoid it","I negotiate a little but settle quickly","I negotiate clearly and assertively","I enjoy negotiating and go for the best outcome"]},
  {id:146, dim:"selfConfidence", w:1.1, text:"You're publicly praised and then criticized shortly after. You:",opts:["The criticism cancels out the praise for me","I try to focus on the positive but struggle","I take both with some perspective","I don't let either define how I see myself"]},
  {id:147, dim:"selfConfidence", w:1.0, text:"You try something creative and show it to others. They're unimpressed. You:",opts:["I feel like I shouldn't have shared it","I feel embarrassed and less likely to share again","I note the feedback and reflect on it","I appreciate the feedback but trust my own judgment"]},
  {id:148, dim:"selfConfidence", w:0.8, text:"You're about to do something for the first time with an audience watching. You:",opts:["I try to avoid being observed","I feel very self-conscious","I'm a bit nervous but go for it","I perform better with people watching"]},
  {id:149, dim:"selfConfidence", w:1.2, text:"You're contradicted in an area you consider yourself an expert in. You:",opts:["I immediately become defensive","I feel my credibility is being questioned","I engage with their argument carefully","I welcome the challenge and engage from a place of security"]},
  {id:150, dim:"selfConfidence", w:1.0, text:"You set a goal and don't achieve it. You:",opts:["I feel like I'm not capable","I wonder if the goal was realistic for me","I review what went wrong and adjust","I see it as useful data to refine my approach"]},

  // ── MONEY MINDSET (25) ──
  {id:151, dim:"moneyMindset", w:1.3, text:"For you, money is above all:",opts:["A source of anxiety and conflict","A means of security and protection","A tool to buy experiences","A lever to create and invest"]},
  {id:152, dim:"moneyMindset", w:1.2, text:"A very wealthy friend asks you to help invest their money. You feel:",opts:["Discomfort, other people's money makes me uneasy","A slight pressure, I want to do well","Satisfaction, I'm helping a friend","Enthusiasm, it's exciting"]},
  {id:153, dim:"moneyMindset", w:1.0, text:"Talking about money with close friends or family:",opts:["I avoid it absolutely, it's taboo","I'd rather avoid it but can if needed","I have no particular problem with it","I approach it very naturally"]},
  {id:154, dim:"moneyMindset", w:1.1, text:"You just made an important purchase that cost a lot. You feel:",opts:["Guilt, I should have saved","A bit of remorse but it passes quickly","Satisfaction, I needed it","No particular feeling, it's my money"]},
  {id:155, dim:"moneyMindset", w:1.2, text:"If you suddenly inherited $200,000, your first thought:",opts:["Put it all in safety, don't touch anything","Pay off debts, save the rest","Invest part, keep some available","Deploy quickly so it works for me"]},
  {id:156, dim:"moneyMindset", w:1.0, text:"Someone makes a lot of money very quickly. You feel:",opts:["Distrust, that's not normal","A bit of envy mixed with skepticism","Admiration and curiosity","I want to know how they did it, I want the same"]},
  {id:157, dim:"moneyMindset", w:1.1, text:"You could earn more but it involves financial uncertainty for 6 months. You:",opts:["Out of the question, I need stability","It's tempting but too risky for me","I'd accept if I have emergency savings","I accept without hesitation, the game is worth it"]},
  {id:158, dim:"moneyMindset", w:1.2, text:"You're asked to lend a significant amount to someone who needs it. You:",opts:["I feel a lot of discomfort at the idea","I help but will miss the money","I help if I have the capacity","I help without qualm, it's just money"]},
  {id:159, dim:"moneyMindset", w:0.9, text:"You make money easily during a good streak. You:",opts:["I feel guilty or anxious","I'm happy but cautious","I savor it and reinvest intelligently","I immediately look for ways to amplify"]},
  {id:160, dim:"moneyMindset", w:1.0, text:"Displaying or talking about financial success:",opts:["It's indecent, I never do it","I avoid it, it could create jealousy","I don't make it taboo if it's relevant","I talk about my successes naturally"]},
  {id:161, dim:"moneyMindset", w:1.1, text:"You find a $20 bill on the ground. You:",opts:["I feel uncomfortable keeping it","I keep it but feel slight guilt","I keep it without much thought","I'm simply pleased with the little bonus"]},
  {id:162, dim:"moneyMindset", w:1.0, text:"Someone offers to pay for dinner. You:",opts:["I insist on splitting, I'm uncomfortable being treated","I accept but feel I should reciprocate immediately","I accept graciously and reciprocate naturally later","I accept easily and don't overthink the reciprocation"]},
  {id:163, dim:"moneyMindset", w:0.8, text:"You're thinking about asking for a pay raise. You:",opts:["I feel very uncomfortable even thinking about it","I'd prepare extensively and still hesitate","I'd prepare my case and ask confidently","I'm comfortable advocating for my worth"]},
  {id:164, dim:"moneyMindset", w:1.2, text:"You receive an unexpected bonus at work. You:",opts:["I feel like I should be careful with it","I save most of it as a precaution","I use some, save some deliberately","I immediately think of how to put it to work"]},
  {id:165, dim:"moneyMindset", w:1.0, text:"You're thinking about charging for a skill or service you offer. You:",opts:["I feel very uncomfortable asking for money","I tend to undercharge to avoid discomfort","I research fair market rates and charge accordingly","I confidently price based on my value"]},
  {id:166, dim:"moneyMindset", w:1.1, text:"A financial advisor recommends a strategy with higher risk and higher potential reward. You:",opts:["I reject it immediately","I consider it but likely stick with safer options","I evaluate it carefully and keep an open mind","I'm excited by the upside and want to explore it"]},
  {id:167, dim:"moneyMindset", w:1.0, text:"You see a peer earning significantly more than you in a similar role. You:",opts:["It creates a lot of anxiety for me","I feel unsettled and compare myself","I note it and think about what that means for me","I use it as useful market information and act on it"]},
  {id:168, dim:"moneyMindset", w:0.9, text:"You are gifted at something but hate monetizing it. You:",opts:["I refuse to monetize what I love","I've tried but felt deeply uncomfortable","I've made peace with it gradually","I see money as enabling me to do more of what I love"]},
  {id:169, dim:"moneyMindset", w:1.2, text:"You're considering a high-risk, high-reward business idea. You:",opts:["The financial risk stops me cold","I'd research it extensively before committing anything","I'd start small and scale if it works","I'd pursue it wholeheartedly"]},
  {id:170, dim:"moneyMindset", w:1.0, text:"You're asked to split a restaurant bill and someone underpays. You:",opts:["I cover the difference without saying anything","I feel uncomfortable but say nothing","I mention it diplomatically","I clearly address it without hesitation"]},
  {id:171, dim:"moneyMindset", w:1.1, text:"You think about your financial future. You feel:",opts:["Anxiety and avoidance","Concern that I may not be doing enough","Reasonably confident with room to improve","Excited about the possibilities I'm building"]},
  {id:172, dim:"moneyMindset", w:1.0, text:"You receive a large amount of money as a gift. Your first thought:",opts:["I need to be careful with this","I should save most of it","How can I grow or use this meaningfully","How can I multiply this"]},
  {id:173, dim:"moneyMindset", w:0.8, text:"Talking about money or finances on a first date or with new acquaintances:",opts:["Completely off-limits for me","I avoid it and change the subject","I'm fine with it if it comes up naturally","I bring it up comfortably as a topic"]},
  {id:174, dim:"moneyMindset", w:1.2, text:"You find out you've been overpaying for a service for years. You:",opts:["I feel terrible about the wasted money","I'm frustrated but fix it and move on","I cancel or renegotiate and feel fine","I see it as a useful lesson and don't dwell on it"]},
  {id:175, dim:"moneyMindset", w:1.0, text:"Someone you respect tells you money isn't important. You:",opts:["I deeply agree and feel validated","I mostly agree though I have some reservations","I think it depends on what you do with it","I respectfully disagree — money is a powerful tool"]},

  // ── DISCIPLINE (25) ──
  {id:176, dim:"discipline", w:1.2, text:"You have a well-defined morning routine. One morning everything goes wrong. You:",opts:["I abandon the routine that day","I skip a few steps but get into it","I readapt to do everything despite constraints","I maintain it no matter what, the routine is sacred"]},
  {id:177, dim:"discipline", w:1.0, text:"You follow a fitness program. You miss a few days. You:",opts:["I give up, I already failed","I feel guilty and struggle to get back","I resume without self-flagellation","I resume immediately the next day without thinking about it"]},
  {id:178, dim:"discipline", w:1.1, text:"You set personal rules for yourself. How often do you follow them?",opts:["Rarely, rules are made to be broken","Sometimes, when convenient","Most of the time, with a few exceptions","Almost always, it's part of my identity"]},
  {id:179, dim:"discipline", w:1.3, text:"You have a task list. An interesting unplanned task comes up. You:",opts:["I do the new task immediately","I start it and abandon the list","I note the new task and finish what's planned","I categorically refuse to deviate from my plan"]},
  {id:180, dim:"discipline", w:1.0, text:"Someone proposes an incredible opportunity that doesn't fit your current projects. You:",opts:["I jump on it, rules adapt","I'm very tempted and probably say yes","I carefully weigh it before deviating","I decline, I stick to my plan"]},
  {id:181, dim:"discipline", w:1.1, text:"You told someone you'd do something and you no longer feel like it. You:",opts:["I let them know and don't do it","I do it halfway then stop","I do it even without wanting to, it's my commitment","I had said it, I'll do it completely"]},
  {id:182, dim:"discipline", w:1.2, text:"You work on a long, boring but important task. After an hour you:",opts:["I move on to something else, I'll come back later","I take frequent distraction breaks","I take a real break then resume","I continue until the end, no matter how long"]},
  {id:183, dim:"discipline", w:0.9, text:"You have a monthly budget set. An unexpected tempting expense comes up. You:",opts:["I buy it, the budget is just indicative","I buy it but feel guilty","I consider if I can readjust","I resist, the budget isn't made to be ignored"]},
  {id:184, dim:"discipline", w:1.0, text:"You need to wake up early for something important. The alarm goes off. You:",opts:["Multiple snoozes, I wake up in a rush","One snooze then I get up","I get up directly despite the fatigue","I anticipated it, I was already awake"]},
  {id:185, dim:"discipline", w:1.1, text:"You set a firm limit in a relationship. The person pushes it. You:",opts:["I give in to avoid conflict","I give in a bit but feel uncomfortable","I maintain calmly and firmly","I maintain and clearly explain the consequences"]},
  {id:186, dim:"discipline", w:1.0, text:"You commit to a 30-day challenge (no alcohol, daily exercise, etc.). On day 8 you slip. You:",opts:["I consider the challenge failed and stop","I feel bad and struggle to restart","I accept the slip and get right back on track","I treat it as noise in the process and continue"]},
  {id:187, dim:"discipline", w:1.1, text:"You're on a diet and you're offered your favorite food. You:",opts:["I rarely resist","I often resist but it's a real struggle","I resist most of the time","I've made peace with my choice and resist easily"]},
  {id:188, dim:"discipline", w:1.0, text:"You plan to sleep 8 hours but get caught up in something interesting. You:",opts:["I stay up as long as I want","I stay up later than I should fairly often","I finish what I'm doing but accept going to bed late","I stop at my bedtime regardless of what I'm doing"]},
  {id:189, dim:"discipline", w:0.8, text:"You decide to spend less time on social media. How long before you revert?",opts:["I'm back to normal within days","I manage for a week or two","I hold the change for months","I treat it as a permanent behavioral change"]},
  {id:190, dim:"discipline", w:1.2, text:"You're practicing a sport and your coach asks you to work on a weakness. You:",opts:["I focus on what I'm already good at","I work on it occasionally","I work on it consistently as instructed","I make it the core of my practice until it's a strength"]},
  {id:191, dim:"discipline", w:1.0, text:"You set a deadline for a personal project. As it approaches, you realize you're behind. You:",opts:["I usually extend the deadline","I rush at the last minute","I adjust scope to meet the deadline","I started early so I'm rarely in this situation"]},
  {id:192, dim:"discipline", w:1.1, text:"A friend wants to chat when you're in a deep work session. You:",opts:["I stop and chat, I'll resume later","I chat briefly then struggle to refocus","I let them know I'll connect later","I'm in focus mode and almost never break it"]},
  {id:193, dim:"discipline", w:1.0, text:"You're intermittent fasting. Your eating window hasn't started but you're hungry. You:",opts:["I eat, the plan is flexible","I eat if I'm very hungry","I drink water and distract myself","I stick to the window, discomfort is part of the process"]},
  {id:194, dim:"discipline", w:0.9, text:"You've decided to respond to emails only twice a day. How long does this last?",opts:["A day or two before I go back to always-on","A week or two","Several months","It becomes a permanent habit"]},
  {id:195, dim:"discipline", w:1.2, text:"You're saving toward a specific goal. A tempting purchase comes up. You:",opts:["I buy it, the goal can wait","I often make exceptions","I buy very rarely and feel the pull","I almost never deviate from my savings goal"]},
  {id:196, dim:"discipline", w:1.0, text:"You follow a study plan. You fall behind by one chapter. You:",opts:["I often let the gap grow","I catch up but feel guilty","I catch up steadily without drama","I rarely fall behind and recover immediately when I do"]},
  {id:197, dim:"discipline", w:1.1, text:"You plan to disconnect from screens for an evening. Your favorite show releases a new episode. You:",opts:["I watch it, plans are flexible","I watch just this one episode","I note it and watch tomorrow as planned","I stick to my plan and watch it another time"]},
  {id:198, dim:"discipline", w:1.0, text:"You have a rule about not checking work email after 7pm. How often do you break it?",opts:["I check whenever something might have come in","A few times a week","Rarely, only for urgent situations","Almost never, I've trained people to respect my hours"]},
  {id:199, dim:"discipline", w:0.8, text:"You decide to practice a habit daily (meditation, journaling, etc.). After 2 weeks:",opts:["I've likely already stopped","I've missed quite a few days","I've kept it up with minor gaps","I haven't missed a single day"]},
  {id:200, dim:"discipline", w:1.2, text:"You're given full freedom over how to structure your workday. You:",opts:["I flow with whatever feels right each day","I have loose intentions but adapt a lot","I build a structure and follow it mostly","I design an optimized schedule and stick to it rigorously"]},
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function pickQuestions(seed) {
  const rng = (n) => { let x = Math.sin(seed*37+n)*99991; return x-Math.floor(x); };
  let result = [];
  Object.keys(DIMS).forEach((dim, di) => {
    const pool = POOL.filter(q => q.dim === dim);
    [...pool].sort((a,b) => rng(di*1000+a.id) - rng(di*1000+b.id)).slice(0,5).forEach(q => result.push(q));
  });
  return result.sort((a,b) => rng(a.id*17+seed%100) - rng(b.id*17+seed%100));
}

function shuffleOpts(opts, qId, seed) {
  const rng = (n) => { let x = Math.sin(seed*13+qId*71+n)*88887; return x-Math.floor(x); };
  return opts.map((text, origIdx) => ({text, origIdx})).sort((a,b) => rng(a.origIdx+1) - rng(b.origIdx+1));
}

function computeScores(answers, questions) {
  const t={}, c={};
  Object.keys(DIMS).forEach(d => { t[d]=0; c[d]=0; });
  Object.entries(answers).forEach(([qId, origIdx]) => {
    const q = questions.find(q => q.id === parseInt(qId));
    if (!q) return;
    t[q.dim] += (origIdx/3)*100*q.w;
    c[q.dim] += q.w;
  });
  const s={};
  Object.keys(DIMS).forEach(d => { s[d] = c[d]>0 ? Math.round(t[d]/c[d]) : 50; });
  return s;
}

function getArchetypeKey(s) {
  const {impulsivity:imp, riskTolerance:risk, patience:pat, analyticalDepth:ana,
    lossAversion:loss, selfConfidence:conf, moneyMindset:money, discipline:disc} = s;
  if (money<40 && loss>65 && disc<35 && imp>65) return "gambler";
  if (money<35 && imp>70) return "gambler";
  if (ana>75 && disc>60 && pat>60 && conf<45) return "analyst";
  if (pat>65 && disc>65 && imp<45 && conf>55) return "sniper";
  if (pat>70 && imp<40 && loss<45 && risk<50) return "ghost";
  if (ana>65 && disc>65 && pat>50) return "architect";
  if (disc>60 && imp>50 && conf>60 && loss<50) return "warrior";
  if (conf>70 && risk>55 && pat>50) return "contrarian";
  if (imp>65 && risk>60) return "predator";
  return [{k:"sniper",v:pat*.4+disc*.4+(100-imp)*.2},{k:"architect",v:ana*.5+disc*.3+pat*.2},
    {k:"predator",v:imp*.5+risk*.3+conf*.2},{k:"ghost",v:pat*.4+(100-imp)*.3+(100-loss)*.3},
    {k:"warrior",v:disc*.35+conf*.35+imp*.3},{k:"contrarian",v:conf*.5+risk*.3+pat*.2}
  ].sort((a,b)=>b.v-a.v)[0].k;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function SpectrumBar({value, lo, hi, color}) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:5}}>
        <span style={{fontSize:10, color:C.dim, maxWidth:"45%", lineHeight:1.3}}>{lo}</span>
        <span style={{fontSize:10, color:C.dim, maxWidth:"45%", lineHeight:1.3, textAlign:"right"}}>{hi}</span>
      </div>
      <div style={{position:"relative", height:6, background:C.border, borderRadius:3}}>
        <div style={{position:"absolute", left:0, top:0, height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${C.border},${color})`, borderRadius:3}}/>
        <div style={{position:"absolute", top:-5, left:`calc(${pct}% - 8px)`, width:16, height:16, borderRadius:"50%", background:color, border:`2px solid ${C.bg}`}}/>
      </div>
    </div>
  );
}

function RadarChart({scores}) {
  const keys = Object.keys(DIMS), n = keys.length, size = 400;
  const cx=size/2, cy=size/2, r=size*0.32;
  const angle = (i) => i*(Math.PI*2/n)-Math.PI/2;
  const pt = (i,val) => { const a=angle(i), d=(Math.min(100,Math.max(0,val))/100)*r; return [cx+d*Math.cos(a), cy+d*Math.sin(a)]; };
  const lp = (i) => { const a=angle(i), d=r+34; return [cx+d*Math.cos(a), cy+d*Math.sin(a)]; };
  const grid = [.25,.5,.75,1].map(lv => keys.map((_,i) => { const a=angle(i),d=lv*r; return `${i===0?"M":"L"}${(cx+d*Math.cos(a)).toFixed(1)},${(cy+d*Math.sin(a)).toFixed(1)}`; }).join("")+"Z");
  const dataPath = keys.map((k,i) => { const [x,y]=pt(i,scores[k]||50); return `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`; }).join("")+"Z";
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{width:"100%", maxWidth:size}}>
      {grid.map((d,i) => <path key={i} d={d} fill="none" stroke={C.border} strokeWidth="0.8"/>)}
      {keys.map((k,i) => { const [x,y]=pt(i,100); return <line key={k} x1={cx} y1={cy} x2={x.toFixed(1)} y2={y.toFixed(1)} stroke={C.border} strokeWidth="0.8"/>; })}
      <path d={dataPath} fill={C.accent} fillOpacity="0.18" stroke={C.accent} strokeWidth="2.5"/>
      {keys.map((k,i) => { const [x,y]=pt(i,scores[k]||50); return <circle key={k} cx={x.toFixed(1)} cy={y.toFixed(1)} r="5" fill={C.accent} stroke={C.bg} strokeWidth="2"/>; })}
      {keys.map((k,i) => {
        const [lx,ly]=lp(i); const anchor=lx<cx-10?"end":lx>cx+10?"start":"middle";
        return <text key={k} x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor={anchor} fontSize="11" fill={C.muted} dominantBaseline="middle">{DIMS[k].icon} {DIMS[k].label}</text>;
      })}
    </svg>
  );
}

function RRGauge({min, ideal, max}) {
  const total = max+1-1;
  const toP = (v) => ((v-1)/total)*100;
  return (
    <div>
      <div style={{position:"relative", height:10, background:C.border, borderRadius:5, marginBottom:6}}>
        <div style={{position:"absolute", left:`${toP(min)}%`, width:`${toP(max)-toP(min)}%`, height:"100%", background:C.success+"30", borderRadius:5}}/>
        <div style={{position:"absolute", left:`${toP(ideal)}%`, transform:"translateX(-50%)", width:3, height:"100%", background:C.success, borderRadius:2}}/>
      </div>
      <div style={{display:"flex", justifyContent:"space-between", fontSize:11}}>
        <span style={{color:C.dim}}>min {min}R</span>
        <span style={{color:C.success, fontWeight:600}}>ideal {ideal}R</span>
        <span style={{color:C.dim}}>max {max}R</span>
      </div>
    </div>
  );
}

function StopTag({type}) {
  const map = {recommended:{label:"✓ RECOMMENDED",color:C.success}, advanced:{label:"◈ ADVANCED",color:C.info}, avoid:{label:"✗ AVOID",color:C.danger}};
  const m = map[type]||{label:type, color:C.muted};
  return <span style={{fontSize:9, padding:"2px 7px", borderRadius:4, background:m.color+"20", color:m.color, fontWeight:700, letterSpacing:"0.04em", flexShrink:0}}>{m.label}</span>;
}

function Lock({onUnlock}) {
  return (
    <div onClick={onUnlock} style={{cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6, color:C.accent, fontSize:12, marginTop:6}}>
      <span>🔒</span><span style={{textDecoration:"underline"}}>Unlock with Premium</span>
    </div>
  );
}

function PremiumModal({archetypeKey, onClose, onUnlock}) {
  const arch = ARCHETYPES[archetypeKey];
  return (
    <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.93)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem"}}>
      <div style={{background:C.card, border:`1px solid ${arch.color}60`, borderRadius:20, padding:"2rem", maxWidth:500, width:"100%", position:"relative", maxHeight:"92vh", overflowY:"auto"}}>
        <button onClick={onClose} style={{position:"absolute", top:14, right:18, background:"transparent", border:"none", color:C.muted, fontSize:20, cursor:"pointer"}}>✕</button>
        <div style={{textAlign:"center", marginBottom:24}}>
          <div style={{fontSize:36, marginBottom:6}}>{arch.emoji}</div>
          <div style={{fontSize:10, color:arch.color, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6}}>Full Access</div>
          <h2 style={{fontSize:22, fontWeight:400, color:C.text, fontFamily:"Georgia,serif", marginBottom:6}}>Premium Trading Report</h2>
          <p style={{color:C.muted, fontSize:13, lineHeight:1.6}}>Your complete guide to trade exactly the way your psychology demands.</p>
        </div>
        <div style={{marginBottom:24}}>
          {[["🧬","Complete psychological portrait"],["💪","What will save you in trading"],["💀","What will destroy you — and how to avoid it"],["🎭","4 cognitive biases with concrete trading impact"],["🗺","Full action plan (4 recommendations)"],["📊","Target R/R and optimal trade duration"],["🏦","Compatible and incompatible markets"],["🛡","Recommended vs avoid stop types"],["🎯","Setup leads adapted to your profile"],["💼","Complete personalized risk management"]].map(([icon,label]) => (
            <div key={label} style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
              <span style={{fontSize:16, flexShrink:0}}>{icon}</span>
              <span style={{fontSize:13, color:C.text}}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{background:C.surface, borderRadius:12, padding:"1.25rem", textAlign:"center"}}>
          <div style={{marginBottom:6}}><span style={{fontSize:38, fontWeight:700, color:arch.color}}>$19.99</span></div>
          <p style={{fontSize:12, color:C.dim, marginBottom:16}}>One-time payment · Lifetime access · 30-day money-back guarantee</p>
          <button onClick={onUnlock} style={{width:"100%", background:arch.color, color:"#0A0A0F", border:"none", borderRadius:10, padding:"15px", fontSize:15, fontWeight:700, cursor:"pointer", letterSpacing:"0.05em", marginBottom:8}}>
            ACCESS MY FULL REPORT →
          </button>
          <p style={{fontSize:11, color:C.dim}}>🔒 Secure payment</p>
        </div>
      </div>
    </div>
  );
}

function TradingSection({arch}) {
  const t = arch.trading;
  return (
    <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.75rem", marginBottom:24}}>
      <p style={{fontSize:10, color:arch.color, marginBottom:28, letterSpacing:"0.1em", textTransform:"uppercase"}}>📈 Trading Guide — tailored to your profile</p>

      {/* Parameters */}
      <div style={{marginBottom:28}}>
        <p style={{fontSize:12, color:C.muted, marginBottom:14, letterSpacing:"0.06em", textTransform:"uppercase"}}>Trade parameters</p>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16}}>
          <div style={{background:C.surface, borderRadius:10, padding:"1rem"}}>
            <p style={{fontSize:11, color:C.dim, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em"}}>Target R/R ratio</p>
            <RRGauge min={t.rr.min} ideal={t.rr.ideal} max={t.rr.max}/>
          </div>
          <div style={{background:C.surface, borderRadius:10, padding:"1rem"}}>
            <p style={{fontSize:11, color:C.dim, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em"}}>Optimal trade duration</p>
            <p style={{fontSize:16, fontWeight:700, color:C.success, marginBottom:4}}>{t.duration.label}</p>
            <p style={{fontSize:11, color:C.muted, lineHeight:1.5, margin:0}}>{t.duration.detail}</p>
          </div>
        </div>
        <p style={{fontSize:13, color:C.text, lineHeight:1.7, margin:"0 0 12px", borderLeft:`2px solid ${arch.color}`, paddingLeft:12}}>{t.rr.comment}</p>
        <div style={{marginTop:12}}>
          <p style={{fontSize:11, color:C.dim, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em"}}>Recommended sessions</p>
          {t.sessions.map((s,i) => (
            <div key={i} style={{display:"flex", gap:8, marginBottom:7}}>
              <span style={{color:s.ok?C.success:C.danger, fontSize:12, marginTop:2, flexShrink:0}}>{s.ok?"✓":"✗"}</span>
              <span style={{fontSize:13, color:C.text, lineHeight:1.4}}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{height:1, background:C.border, marginBottom:24}}/>

      {/* Markets */}
      <div style={{marginBottom:28}}>
        <p style={{fontSize:12, color:C.muted, marginBottom:14, letterSpacing:"0.06em", textTransform:"uppercase"}}>Compatible markets</p>
        {t.markets.map((m,i) => (
          <div key={i} style={{background:C.surface, borderRadius:8, padding:"0.875rem", marginBottom:10, borderLeft:`3px solid ${m.ok?C.success:C.danger}`}}>
            <div style={{marginBottom:4}}>
              <span style={{fontSize:13, fontWeight:600, color:m.ok?C.text:C.danger}}>{m.ok?"✅":"🚫"} {m.name}</span>
            </div>
            <p style={{fontSize:12, color:C.muted, margin:0, lineHeight:1.5}}>{m.why}</p>
          </div>
        ))}
      </div>

      <div style={{height:1, background:C.border, marginBottom:24}}/>

      {/* Stops */}
      <div style={{marginBottom:28}}>
        <p style={{fontSize:12, color:C.muted, marginBottom:14, letterSpacing:"0.06em", textTransform:"uppercase"}}>Stop management</p>
        {t.stops.map((s,i) => (
          <div key={i} style={{marginBottom:14, display:"flex", gap:12, alignItems:"flex-start"}}>
            <StopTag type={s.type}/>
            <div>
              <p style={{fontSize:13, fontWeight:600, color:s.type==="avoid"?C.danger:C.text, margin:"0 0 4px"}}>{s.name}</p>
              <p style={{fontSize:12, color:C.muted, margin:0, lineHeight:1.5}}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{height:1, background:C.border, marginBottom:24}}/>

      {/* Setups */}
      <div style={{marginBottom:28}}>
        <p style={{fontSize:12, color:C.muted, marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase"}}>Setup directions to explore</p>
        <p style={{fontSize:12, color:C.dim, marginBottom:14, fontStyle:"italic"}}>These directions give you a starting point adapted to your profile — not investment advice.</p>
        {t.setups.map((s,i) => (
          <div key={i} style={{background:C.surface, borderRadius:8, padding:"0.875rem", marginBottom:10, borderLeft:`3px solid ${arch.color}50`}}>
            <p style={{fontSize:13, fontWeight:600, color:arch.color, margin:"0 0 6px"}}>→ {s.name}</p>
            <p style={{fontSize:12, color:C.text, margin:0, lineHeight:1.65}}>{s.lead}</p>
          </div>
        ))}
      </div>

      <div style={{height:1, background:C.border, marginBottom:24}}/>

      {/* Risk */}
      <div>
        <p style={{fontSize:12, color:C.muted, marginBottom:14, letterSpacing:"0.06em", textTransform:"uppercase"}}>Risk management</p>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          {[
            {label:"Position size", value:t.risk.size},
            {label:"Maximum drawdown", value:t.risk.maxdd},
            {label:"Monthly frequency", value:t.risk.freq},
            {label:"Scaling / Pyramiding", value:t.risk.scaling},
          ].map(item => (
            <div key={item.label} style={{background:C.surface, borderRadius:8, padding:"0.875rem"}}>
              <p style={{fontSize:10, color:C.dim, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:"0.05em"}}>{item.label}</p>
              <p style={{fontSize:12, color:C.text, margin:0, lineHeight:1.5}}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULTS
// ─────────────────────────────────────────────────────────────────────────────
function Results({scores, archetypeKey, behav, onRestart}) {
  const [premium, setPremium] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const arch = ARCHETYPES[archetypeKey];
  const unlock = () => { setPremium(true); setShowModal(false); };
  const openModal = () => setShowModal(true);
  if (!arch) return <div style={{background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}><p style={{color:C.danger}}>Profile error.</p></div>;

  return (
    <div style={{minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"sans-serif", padding:"2rem 1rem"}}>
      {showModal && <PremiumModal archetypeKey={archetypeKey} onClose={() => setShowModal(false)} onUnlock={unlock}/>}
      <div style={{maxWidth:740, margin:"0 auto"}}>

        {/* Header */}
        <div style={{textAlign:"center", marginBottom:36, paddingTop:8}}>
          <div style={{fontSize:60, marginBottom:10}}>{arch.emoji}</div>
          <h1 style={{fontSize:"clamp(28px,6vw,48px)", fontWeight:400, color:arch.color, fontFamily:"Georgia,serif", marginBottom:8}}>{arch.name}</h1>
          {premium
            ? <p style={{color:C.muted, fontSize:14, lineHeight:1.75, maxWidth:520, margin:"0 auto"}}>{arch.desc}</p>
            : <div style={{maxWidth:520, margin:"0 auto"}}>
                <p style={{color:C.muted, fontSize:14, lineHeight:1.75}}>{arch.desc.slice(0,70)}...</p>
                <Lock onUnlock={openModal}/>
              </div>
          }
        </div>

        {/* Behavioral */}
        <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.25rem", marginBottom:24, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, textAlign:"center"}}>
          {[
            {icon:"⏱", val:`${Math.round(behav.avgTime/1000)}s`, label:"Avg. time / question"},
            {icon:"🔄", val:behav.totalChanges, label:"Hesitations detected"},
            {icon:"🧠", val:behav.avgTime>15000?"Deliberate":behav.avgTime<6000?"Intuitive":"Balanced", label:"Behavioral profile"},
          ].map(item => (
            <div key={item.label}>
              <div style={{fontSize:18, marginBottom:4}}>{item.icon}</div>
              <div style={{fontSize:20, fontWeight:700, color:C.accent}}>{item.val}</div>
              <div style={{fontSize:11, color:C.dim, marginTop:4}}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Radar + Spectrums */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24, alignItems:"start"}}>
          <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.25rem", display:"flex", justifyContent:"center"}}>
            <RadarChart scores={scores}/>
          </div>
          <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.5rem"}}>
            <p style={{fontSize:10, color:C.muted, marginBottom:18, letterSpacing:"0.1em", textTransform:"uppercase"}}>Psychological profile</p>
            {Object.entries(DIMS).map(([key,dim]) => {
              const val = scores[key]||50;
              const color = val>65?C.accent:val<35?C.danger:C.info;
              return (
                <div key={key}>
                  <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:4}}>
                    <span style={{fontSize:12}}>{dim.icon}</span>
                    <span style={{fontSize:12, color:C.text, fontWeight:500}}>{dim.label}</span>
                  </div>
                  <SpectrumBar value={val} lo={dim.lo} hi={dim.hi} color={color}/>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths / Weaknesses */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24}}>
          <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.25rem"}}>
            <p style={{fontSize:10, color:C.success, marginBottom:14, letterSpacing:"0.1em", textTransform:"uppercase"}}>✅ Strengths</p>
            {arch.strengths.slice(0, premium?arch.strengths.length:1).map(s => (
              <div key={s} style={{display:"flex", gap:8, marginBottom:10}}>
                <span style={{color:C.success, fontSize:12, marginTop:3, flexShrink:0}}>▸</span>
                <span style={{fontSize:13, color:C.text, lineHeight:1.45}}>{s}</span>
              </div>
            ))}
            {!premium && <Lock onUnlock={openModal}/>}
          </div>
          <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.25rem"}}>
            <p style={{fontSize:10, color:C.danger, marginBottom:14, letterSpacing:"0.1em", textTransform:"uppercase"}}>⚠ Critical points</p>
            {arch.weaknesses.slice(0, premium?arch.weaknesses.length:1).map(w => (
              <div key={w} style={{display:"flex", gap:8, marginBottom:10}}>
                <span style={{color:C.danger, fontSize:12, marginTop:3, flexShrink:0}}>▸</span>
                <span style={{fontSize:13, color:C.text, lineHeight:1.45}}>{w}</span>
              </div>
            ))}
            {!premium && <Lock onUnlock={openModal}/>}
          </div>
        </div>

        {/* Biases */}
        <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.5rem", marginBottom:24}}>
          <p style={{fontSize:10, color:C.muted, marginBottom:18, letterSpacing:"0.1em", textTransform:"uppercase"}}>🎭 Cognitive biases identified</p>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10}}>
            {arch.biases.slice(0,1).map(bias => (
              <div key={bias.name} style={{background:C.surface, border:`1px solid ${C.danger}40`, borderRadius:10, padding:"1rem"}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
                  <span style={{fontSize:13, fontWeight:600, color:C.text}}>{bias.name}</span>
                  <span style={{fontSize:10, padding:"2px 8px", borderRadius:10, background:C.danger+"20", color:C.danger}}>CRITICAL</span>
                </div>
                <p style={{fontSize:12, color:C.muted, lineHeight:1.5, margin:0}}>{bias.desc}</p>
              </div>
            ))}
            {premium ? arch.biases.slice(1).map(bias => (
              <div key={bias.name} style={{background:C.surface, border:`1px solid ${bias.sev==="high"?C.danger+"40":C.accent+"30"}`, borderRadius:10, padding:"1rem"}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
                  <span style={{fontSize:13, fontWeight:600, color:C.text}}>{bias.name}</span>
                  <span style={{fontSize:10, padding:"2px 8px", borderRadius:10, background:bias.sev==="high"?C.danger+"20":C.accent+"20", color:bias.sev==="high"?C.danger:C.accent}}>{bias.sev==="high"?"CRITICAL":"MODERATE"}</span>
                </div>
                <p style={{fontSize:12, color:C.muted, lineHeight:1.5, margin:0}}>{bias.desc}</p>
              </div>
            )) : [1,2,3].map(i => (
              <div key={i} onClick={openModal} style={{background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"1rem", cursor:"pointer", opacity:0.55}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
                  <span style={{fontSize:13, fontWeight:600, color:C.dim, filter:"blur(4px)"}}>Bias {i+1}</span>
                  <span style={{fontSize:16}}>🔒</span>
                </div>
                <div style={{height:36, background:C.border, borderRadius:4, filter:"blur(3px)"}}/>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.5rem", marginBottom:24}}>
          <p style={{fontSize:10, color:C.purple, marginBottom:24, letterSpacing:"0.1em", textTransform:"uppercase"}}>🧠 In-depth psychological analysis</p>
          {premium ? (
            <>
              {[{color:C.accent, icon:"🧬", title:"Psychological portrait", key:"portrait"},
                {color:C.success, icon:"💪", title:"What will save you", key:"save"},
                {color:C.danger, icon:"💀", title:"What will destroy you", key:"destroy"}
              ].map(({color,icon,title,key}) => (
                <div key={key} style={{marginBottom:24, borderLeft:`2px solid ${color}`, paddingLeft:18}}>
                  <p style={{fontSize:11, fontWeight:600, color, marginBottom:10, letterSpacing:"0.06em", textTransform:"uppercase"}}>{icon} {title}</p>
                  <p style={{color:C.text, fontSize:14, lineHeight:1.8, margin:0}}>{arch[key]}</p>
                </div>
              ))}
            </>
          ) : (
            <div onClick={openModal} style={{cursor:"pointer"}}>
              {[{color:C.accent, icon:"🧬", title:"Psychological portrait"},
                {color:C.success, icon:"💪", title:"What will save you"},
                {color:C.danger, icon:"💀", title:"What will destroy you"}
              ].map(({color,icon,title}) => (
                <div key={title} style={{marginBottom:18, borderLeft:`2px solid ${color}`, paddingLeft:18}}>
                  <p style={{fontSize:11, fontWeight:600, color, marginBottom:8, letterSpacing:"0.06em", textTransform:"uppercase"}}>{icon} {title}</p>
                  <div style={{height:52, background:C.border, borderRadius:4, filter:"blur(3px)", opacity:0.5}}/>
                </div>
              ))}
              <div style={{textAlign:"center", marginTop:12}}>
                <div style={{display:"inline-flex", alignItems:"center", gap:8, background:C.surface, border:`1px solid ${C.accent}40`, borderRadius:8, padding:"8px 16px", color:C.accent, fontSize:13}}>🔒 Unlock full analysis</div>
              </div>
            </div>
          )}
        </div>

        {/* Action plan */}
        <div style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1.5rem", marginBottom:24}}>
          <p style={{fontSize:10, color:C.info, marginBottom:24, letterSpacing:"0.1em", textTransform:"uppercase"}}>🗺 Psychological action plan</p>
          <div style={{marginBottom:16, display:"flex", gap:14}}>
            <div style={{width:28, height:28, borderRadius:"50%", background:C.accent, color:C.bg, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2}}>1</div>
            <p style={{color:C.text, fontSize:14, lineHeight:1.75, margin:0}}>{arch.actionFull[0]}</p>
          </div>
          <div style={{marginBottom:16, display:"flex", gap:14}}>
            <div style={{width:28, height:28, borderRadius:"50%", background:premium?C.accent:C.border, color:premium?C.bg:C.dim, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2}}>2</div>
            <div style={{flex:1}}>
              {premium ? <p style={{color:C.text, fontSize:14, lineHeight:1.75, margin:0}}>{arch.actionFull[1]}</p>
                : <>
                    <p style={{color:C.muted, fontSize:14, lineHeight:1.75, margin:"0 0 8px"}}>{arch.actionTeaser}</p>
                    <div style={{height:2, background:`linear-gradient(90deg,${C.border},transparent)`, marginBottom:10}}/>
                    <div onClick={openModal} style={{display:"inline-flex", alignItems:"center", gap:6, color:C.accent, fontSize:13, cursor:"pointer"}}>🔒 <span style={{textDecoration:"underline"}}>See the rest and 2 more recommendations</span></div>
                  </>}
            </div>
          </div>
          {premium ? arch.actionFull.slice(2).map((action,i) => (
            <div key={i} style={{marginBottom:16, display:"flex", gap:14}}>
              <div style={{width:28, height:28, borderRadius:"50%", background:C.accent, color:C.bg, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2}}>{i+3}</div>
              <p style={{color:C.text, fontSize:14, lineHeight:1.75, margin:0}}>{action}</p>
            </div>
          )) : [3,4].map(n => (
            <div key={n} onClick={openModal} style={{marginBottom:14, display:"flex", gap:14, cursor:"pointer", opacity:0.5}}>
              <div style={{width:28, height:28, borderRadius:"50%", background:C.border, color:C.dim, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>🔒</div>
              <div style={{height:40, flex:1, background:C.border, borderRadius:4, filter:"blur(3px)"}}/>
            </div>
          ))}
        </div>

        {/* Trading section */}
        {premium ? <TradingSection arch={arch}/> : (
          <div style={{background:C.card, border:`2px solid ${arch.color}50`, borderRadius:16, padding:"2rem", marginBottom:32}}>
            <div style={{textAlign:"center", marginBottom:20}}>
              <div style={{fontSize:10, color:arch.color, letterSpacing:"0.15em", marginBottom:10, textTransform:"uppercase"}}>🔒 Premium Trading Guide</div>
              <h3 style={{fontSize:20, fontWeight:400, color:C.text, marginBottom:10, fontFamily:"Georgia,serif"}}>Your personalized trading manual</h3>
              <p style={{color:C.muted, fontSize:13, lineHeight:1.7, maxWidth:440, margin:"0 auto 20px"}}>
                Target R/R · Optimal duration · Compatible markets · Adapted stops · Setup directions · Complete risk management
              </p>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:8, marginBottom:24}}>
              {[["📊","R/R & duration"],["🏦","Markets"],["🛡","Stops"],["🎯","Setups"],["💼","Risk mgmt"],["🧬","Full psycho"],["🎭","4 biases"],["🗺","Full plan"]].map(([icon,title]) => (
                <div key={title} style={{background:C.surface, borderRadius:8, padding:"0.75rem", textAlign:"center"}}>
                  <div style={{fontSize:18, marginBottom:4}}>{icon}</div>
                  <div style={{fontSize:11, color:C.muted}}>{title}</div>
                </div>
              ))}
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{marginBottom:12}}><span style={{fontSize:36, fontWeight:700, color:arch.color}}>$19.99</span><span style={{fontSize:13, color:C.muted}}> — one-time payment, lifetime access</span></div>
              <button onClick={openModal} style={{background:arch.color, color:"#0A0A0F", border:"none", borderRadius:10, padding:"15px 36px", fontSize:15, fontWeight:700, cursor:"pointer", letterSpacing:"0.05em", marginBottom:8}}>ACCESS MY FULL REPORT →</button>
              <p style={{fontSize:11, color:C.dim}}>🔒 30-day money-back guarantee</p>
            </div>
          </div>
        )}

        <div style={{textAlign:"center", paddingBottom:48}}>
          <button onClick={onRestart} style={{background:"transparent", border:`1px solid ${C.border}`, color:C.muted, borderRadius:8, padding:"10px 24px", cursor:"pointer", fontSize:13}}>
            Restart (new set of questions)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState("intro");
  const [seed] = useState(() => Math.floor(Math.random()*100000));
  const [questions, setQuestions] = useState([]);
  const [optMap, setOptMap] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [qStart, setQStart] = useState(Date.now());
  const [times, setTimes] = useState([]);
  const [changes, setChanges] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const qs = pickQuestions(seed);
    setQuestions(qs);
    const om = {};
    qs.forEach(q => { om[q.id] = shuffleOpts(q.opts, q.id, seed); });
    setOptMap(om);
  }, [seed]);

  const q = questions[currentQ];
  const progress = questions.length>0 ? (currentQ/questions.length)*100 : 0;

  const handleSelect = (di) => { if (selected!==null && selected!==di) setChanges(c=>c+1); setSelected(di); };

  const handleNext = () => {
    if (selected===null || !q) return;
    const origIdx = optMap[q.id][selected].origIdx;
    const elapsed = Date.now()-qStart;
    const newTimes = [...times, elapsed];
    const newAnswers = {...answers, [q.id]:origIdx};
    setTimes(newTimes); setAnswers(newAnswers);
    if (currentQ<questions.length-1) { setCurrentQ(i=>i+1); setSelected(null); setQStart(Date.now()); }
    else {
      const scores = computeScores(newAnswers, questions);
      const archetypeKey = getArchetypeKey(scores);
      const avg = newTimes.reduce((a,b)=>a+b,0)/newTimes.length;
      setResult({scores, archetypeKey, behav:{avgTime:avg, totalChanges:changes}});
      setPhase("results");
    }
  };

  const restart = () => { setPhase("intro"); setCurrentQ(0); setAnswers({}); setSelected(null); setTimes([]); setChanges(0); setResult(null); };

  if (phase==="results" && result) return <Results scores={result.scores} archetypeKey={result.archetypeKey} behav={result.behav} onRestart={restart}/>;

  if (phase==="intro") return (
    <div style={{minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia,serif", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem 1rem"}}>
      <div style={{maxWidth:560, textAlign:"center"}}>
        <div style={{fontSize:52, marginBottom:20}}>🧠</div>
        <h1 style={{fontSize:"clamp(28px,5vw,46px)", fontWeight:400, letterSpacing:"-0.02em", marginBottom:12, lineHeight:1.2}}>
          What kind of trader<br/><span style={{color:C.accent}}>are you, really?</span>
        </h1>
        <p style={{color:C.muted, fontSize:15, lineHeight:1.75, marginBottom:36, fontFamily:"sans-serif"}}>
          40 general psychology questions — no trading questions — to reveal your deep trader profile and the biases that will sabotage your performance.
        </p>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:36}}>
          {[["⏱","12–15 min","Estimated time"],["🔬","8 dimensions","Psychometric"],["📈","Full guide","Included in premium"]].map(([icon,label,sub]) => (
            <div key={label} style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1rem"}}>
              <div style={{fontSize:24, marginBottom:6}}>{icon}</div>
              <div style={{fontSize:14, fontWeight:600, color:C.text, fontFamily:"sans-serif"}}>{label}</div>
              <div style={{fontSize:11, color:C.muted, fontFamily:"sans-serif"}}>{sub}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:12, color:C.dim, fontFamily:"sans-serif", marginBottom:28, lineHeight:1.6}}>
          💡 Answer instinctively. We also measure your response time and hesitations.
        </p>
        <button onClick={() => setPhase("quiz")} style={{background:C.accent, color:"#0A0A0F", border:"none", borderRadius:10, padding:"16px 52px", fontSize:16, fontWeight:700, cursor:"pointer", letterSpacing:"0.05em", fontFamily:"sans-serif"}}>
          START THE ASSESSMENT
        </button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"2rem 1rem"}}>
      <div style={{width:"100%", maxWidth:600, marginBottom:28}}>
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
          <span style={{fontSize:12, color:C.muted}}>Question {currentQ+1} / {questions.length}</span>
          <span style={{fontSize:12, color:C.accent}}>{Math.round(progress)}%</span>
        </div>
        <div style={{background:C.border, borderRadius:4, height:4}}>
          <div style={{width:`${progress}%`, height:"100%", background:C.accent, borderRadius:4, transition:"width 0.4s ease"}}/>
        </div>
      </div>
      {q && optMap[q.id] && (
        <div style={{width:"100%", maxWidth:600}}>
          <h2 style={{fontSize:"clamp(17px,2.8vw,22px)", fontWeight:400, lineHeight:1.5, color:C.text, marginBottom:28, fontFamily:"Georgia,serif"}}>{q.text}</h2>
          <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom:36}}>
            {optMap[q.id].map((opt,di) => (
              <button key={di} onClick={() => handleSelect(di)} style={{background:selected===di?C.accent+"18":C.card, border:`1px solid ${selected===di?C.accent:C.border}`, borderRadius:10, padding:"15px 18px", color:selected===di?C.accent:C.muted, fontSize:14, textAlign:"left", cursor:"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:12}}>
                <span style={{width:22, height:22, borderRadius:"50%", border:`1.5px solid ${selected===di?C.accent:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:selected===di?C.accent:"transparent"}}>
                  {selected===di && <span style={{width:9, height:9, borderRadius:"50%", background:C.bg}}/>}
                </span>
                {opt.text}
              </button>
            ))}
          </div>
          <button onClick={handleNext} disabled={selected===null} style={{width:"100%", background:selected!==null?C.accent:C.border, color:selected!==null?"#0A0A0F":C.dim, border:"none", borderRadius:8, padding:"15px", fontSize:14, fontWeight:700, cursor:selected!==null?"pointer":"not-allowed", transition:"all 0.2s", letterSpacing:"0.05em"}}>
            {currentQ<questions.length-1?"NEXT QUESTION →":"SEE MY ANALYSIS →"}
          </button>
        </div>
      )}
    </div>
  );
}
 