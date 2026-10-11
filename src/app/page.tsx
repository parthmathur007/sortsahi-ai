import Link from "next/link";
import { ArrowRight, Camera, Check, ChevronRight, CircleHelp, Leaf, Recycle, ScanSearch, ShieldCheck, Trophy, Zap } from "lucide-react";
import { HomeScoreWidget } from "@/components/ui/HomeScoreWidget";

const STREAMS = [
  { number: "01", label: "Wet waste", examples: "Food scraps · peels · tea leaves", note: "Organic, biodegradable material", color: "bg-[#e8f1df]", text: "text-[#35623c]", mark: "●" },
  { number: "02", label: "Dry waste", examples: "Clean paper · glass · metal", note: "Check whether the item is accepted locally", color: "bg-[#e8eff1]", text: "text-[#35616a]", mark: "◆" },
  { number: "03", label: "Sanitary waste", examples: "Used pads · diapers", note: "Wrap and follow local collection guidance", color: "bg-[#f3e9dd]", text: "text-[#8a5a35]", mark: "＋" },
  { number: "04", label: "Special care", examples: "Batteries · e-waste · bulbs", note: "Use an appropriate collection route", color: "bg-[#eee9f4]", text: "text-[#695184]", mark: "✳" },
];

const STEPS = [
  { icon: Camera, number: "01", title: "Show us the item", body: "Take a photo or type an item name. Start with what you have." },
  { icon: ScanSearch, number: "02", title: "Understand the answer", body: "Get the likely category, why it fits, and a practical next step." },
  { icon: Leaf, number: "03", title: "Build the habit", body: "Learn through quick challenges and grow your GreenScore over time." },
];

export default function HomePage() {
  return (
    <div className="pb-8">
      <section className="relative isolate overflow-hidden border-b border-[#dce4d5] bg-[#eef1e5]">
        <div aria-hidden="true" className="soft-grid pointer-events-none absolute inset-y-0 right-0 w-[46%] opacity-25 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full border border-[#d5dfcb] sm:h-[600px] sm:w-[600px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-14 h-[320px] w-[320px] rounded-full border border-[#d5dfcb] sm:right-16 sm:top-16 sm:h-[420px] sm:w-[420px]" />
        <div className="page-shell relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-24">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4dfcc] bg-[#fafbf6] px-4 py-2.5 text-sm font-bold text-[#45664a]"><span className="h-2.5 w-2.5 rounded-full bg-[#6e9656]" /> Your everyday waste guide</div>
            <h1 className="max-w-2xl text-[clamp(2.8rem,6vw,5.35rem)] font-extrabold leading-[.99] tracking-[-.065em] text-[#173b2d]">Not sure where it goes? <span className="font-serif font-medium italic text-[#668450]">Sort it right.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#58695b] sm:text-xl">Identify everyday waste, understand the likely category, and learn what to do next—with guidance that knows when to ask for more detail.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/classify" className="btn-primary"><ScanSearch className="h-5 w-5" /> Identify an item <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/challenge" className="btn-secondary"><Trophy className="h-5 w-5" /> Try a 1-minute challenge</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-[#617363]"><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#628450]" /> No sign-up needed</span><span className="inline-flex items-center gap-2"><CircleHelp className="h-4 w-4 text-[#628450]" /> Asks when unsure</span><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#628450]" /> Guidance-first design</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-[490px] lg:justify-self-end">
            <div className="absolute -left-5 top-12 h-28 w-28 rounded-full bg-[#d9e6ce] blur-2xl" />
            <div className="absolute -bottom-5 right-2 h-32 w-32 rounded-full bg-[#dce7d9] blur-2xl" />
            <div className="relative rounded-[30px] border border-white/90 bg-[#fffef9] p-5 shadow-[0_28px_80px_rgba(34,67,43,.15)] sm:rounded-[36px] sm:p-7">
              <div className="mb-3 overflow-hidden rounded-[24px] bg-[#f0f5e9]">{/* Local illustration keeps the hero visual reliable in production. */}<img src="/images/sort-hero.svg" alt="Illustration of wet, dry and special-care waste sorting bins" className="hero-illustration block h-auto max-h-[230px] w-full object-contain" /></div>
              <div className="flex items-center justify-between gap-3 border-b border-[#e6ebdf] pb-5"><div><p className="eyebrow">The SortSahi method</p><p className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#244832]">One item. One clearer next step.</p></div><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7f0df] text-[#4d7545]"><Leaf className="h-6 w-6" /></div></div>
              <Link href="/classify" className="group mt-5 block rounded-[24px] border border-dashed border-[#c7d7bd] bg-[#f5f7ef] p-5 transition hover:border-[#719767] hover:bg-[#f0f5e9] sm:p-6">
                <div className="flex items-start gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e2ecd9] text-[#47764a]"><Camera className="h-7 w-7" /></div><div className="min-w-0 flex-1"><p className="text-lg font-extrabold text-[#294b34] sm:text-xl">What are you throwing away?</p><p className="mt-1 text-sm leading-6 text-[#738071]">Use a photo or search by item name.</p></div><ChevronRight className="mt-1 h-5 w-5 shrink-0 text-[#7d9575] transition group-hover:translate-x-1" /></div>
                <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-[#e5eadf] bg-white px-3.5 py-2 text-sm font-semibold text-[#5b7258]">🍌 Banana peel</span><span className="rounded-full border border-[#e5eadf] bg-white px-3.5 py-2 text-sm font-semibold text-[#5b7258]">🔋 Battery</span><span className="rounded-full border border-[#e5eadf] bg-white px-3.5 py-2 text-sm font-semibold text-[#5b7258]">📦 Cardboard</span></div>
              </Link>
              <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-[#e9f1e2] p-4"><div className="flex items-center gap-2 text-[#47764a]"><Recycle className="h-5 w-5" /><span className="text-sm font-extrabold">4 waste streams</span></div><p className="mt-2 text-sm leading-5 text-[#62775e]">A simpler way to learn the basics.</p></div><div className="rounded-2xl bg-[#f4efe2] p-4"><div className="flex items-center gap-2 text-[#876a35]"><Zap className="h-5 w-5" /><span className="text-sm font-extrabold">Learn as you go</span></div><p className="mt-2 text-sm leading-5 text-[#81745b]">Quick challenges. Useful habits.</p></div></div>
              <p className="mt-5 text-center text-xs font-extrabold tracking-[.18em] text-[#82917c]">IDENTIFY IT · SORT IT RIGHT</p>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell space-y-16 py-14 sm:space-y-20 sm:py-20">
        <HomeScoreWidget />
        <section>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Four simple streams</p><h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#183b2d] sm:text-4xl">Every item has a next step.</h2></div><p className="max-w-md text-base leading-7 text-[#69766a] sm:text-lg">Material and condition matter. Local collection rules can vary, especially for mixed or contaminated items.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{STREAMS.map((stream) => <article key={stream.number} className="card card-hover !p-5 sm:!p-6"><div className="flex items-center justify-between"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stream.color} ${stream.text} text-xl font-bold`}>{stream.mark}</span><span className="text-xs font-extrabold tracking-[.15em] text-[#a3afa0]">{stream.number}</span></div><h3 className="mt-5 text-xl font-extrabold text-[#244832]">{stream.label}</h3><p className="mt-2 min-h-[48px] text-base leading-6 text-[#657267]">{stream.examples}</p><div className="mt-4 border-t border-[#edf0e9] pt-3 text-sm font-semibold leading-5 text-[#748271]">{stream.note}</div></article>)}</div>
        </section>

        <section><div className="mx-auto mb-10 max-w-2xl text-center"><p className="eyebrow">How SortSahi works</p><h2 className="mt-3 text-3xl font-extrabold text-[#183b2d] sm:text-4xl">Small steps. Better sorting.</h2><p className="mt-4 text-base leading-7 text-[#69766a] sm:text-lg">Less confusion at the bin, more confidence in everyday choices.</p></div><div className="grid gap-5 md:grid-cols-3">{STEPS.map(({ icon: Icon, number, title, body }) => <article key={number} className="relative rounded-3xl border border-[#dfe7da] bg-white p-6 sm:p-7"><span className="absolute right-6 top-6 text-xs font-extrabold tracking-[.15em] text-[#a1b19b]">{number}</span><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf3e7] text-[#47764a]"><Icon className="h-7 w-7" /></div><h3 className="mt-6 text-xl font-extrabold text-[#244832]">{title}</h3><p className="mt-2 text-base leading-7 text-[#69766a]">{body}</p></article>)}</div></section>

        <section className="overflow-hidden rounded-[30px] bg-[#214d35] px-6 py-10 text-white sm:rounded-[36px] sm:px-10 sm:py-12 lg:px-14"><div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#c1d8b0]">Your next good habit</p><h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Make the right choice feel easy.</h2><p className="mt-4 max-w-xl text-base leading-7 text-[#dce8d8] sm:text-lg">Identify an item, learn what to do with it, then build your knowledge one quick challenge at a time.</p></div><div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row"><Link href="/classify" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f5f5e9] px-6 py-3.5 text-base font-bold text-[#214d35] transition hover:bg-white">Start sorting <ArrowRight className="h-4 w-4" /></Link><Link href="/challenge" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-base font-bold text-white transition hover:bg-white/10"><Trophy className="h-4 w-4" /> Take a challenge</Link></div></div></section>

        <footer className="border-t border-[#dfe7da] pt-6 text-sm leading-6 text-[#7a8678]"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p>Disposal guidance can vary by city and collection provider. Check local instructions for special-care and mixed-material items.</p><p className="shrink-0 font-semibold text-[#61745e]">Built by ASAP · Environmental Hacks 2026</p></div></footer>
      </div>
    </div>
  );
}
