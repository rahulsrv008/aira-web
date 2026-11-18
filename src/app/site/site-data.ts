export const SITE = {
  name: 'Aira Luxury',
  url: 'https://airaluxury.in',
  email: 'hello@airaluxury.com',
  privacyEmail: 'privacy@airaluxury.in',
  foundingYear: '2000',
  slogan: 'Trusted Beauty Since 2000. Now Bringing Luxury Salon Experiences to Your Doorstep.',
  defaultImage: '/images/hero-team.jpg',
};

export interface Faq {
  q: string;
  a: string;
}

export interface Section {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  link?: { label: string; path: string };
}

export type PageKind = 'service' | 'city' | 'about' | 'services' | 'contact' | 'partner' | 'privacy' | 'delete-account';

/**
 * `label` is what visitors see; `name`, `seoTitle` and `description` carry the
 * search phrases (service + "at home", city, Delhi NCR) for titles, snippets
 * and structured data, so the visible copy doesn't have to repeat them.
 */
export interface PageContent {
  path: string;
  kind: PageKind;
  label: string;
  name: string;
  seoTitle: string;
  description: string;
  kicker: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: Section[];
  faqs?: Faq[];
  closing: string;
  city?: string;
}

export interface ServiceCard {
  path: string;
  kicker: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
}

export const SERVICE_CARDS: ServiceCard[] = [
  { path: 'haircut-at-home', kicker: 'Hair', title: 'Haircut & Styling', copy: 'Trims, restyles, blow-dry and ironing.', image: '/images/hero-hair.jpg', alt: 'Haircut at home by Aira Luxury' },
  { path: 'facial-at-home', kicker: 'Skin', title: 'Facials & Clean-ups', copy: 'Fruit, glow, brightening and anti-tan.', image: '/images/hero-facial.jpg', alt: 'Facial at home by Aira Luxury' },
  { path: 'waxing-at-home', kicker: 'Grooming', title: 'Waxing', copy: 'Rica, honey and chocolate wax.', image: '/images/waxing-at-home.jpg', alt: 'Waxing at home by Aira Luxury' },
  { path: 'hair-spa-at-home', kicker: 'Hair care', title: 'Hair Spa', copy: 'Spa, keratin, scalp and hair-fall care.', image: '/images/hero-ritual.jpg', alt: 'Hair spa at home by Aira Luxury' },
  { path: 'makeup-at-home', kicker: 'Occasion', title: 'Party Makeup', copy: 'Party, engagement and festive looks.', image: '/images/bridal-makeup-at-home.jpg', alt: 'Makeup artist at home by Aira Luxury' },
  { path: 'kids-haircut-at-home', kicker: 'Kids', title: 'Kids Haircut', copy: 'Calm, quick cuts in a familiar space.', image: '/images/hero-hair.jpg', alt: 'Kids haircut at home by Aira Luxury' },
  { path: 'bridal-makeup', kicker: 'Bridal', title: 'Bridal Beauty', copy: 'Wedding-day makeup and pre-bridal care.', image: '/images/bridal-makeup-at-home.jpg', alt: 'Bridal makeup by Aira Luxury' },
  { path: 'manicure-pedicure-at-home', kicker: 'Nails', title: 'Manicure & Pedicure', copy: 'Classic, deluxe, nail paint and gel.', image: '/images/manicure-pedicure-at-home.jpg', alt: 'Manicure and pedicure at home by Aira Luxury' },
  { path: 'threading-at-home', kicker: 'Grooming', title: 'Threading', copy: 'Eyebrows, upper lip and chin.', image: '/images/threading-at-home.jpg', alt: 'Threading at home by Aira Luxury' },
  { path: 'hair-colouring-at-home', kicker: 'Colour', title: 'Hair Colouring', copy: 'Root touch-up, global colour, refresh.', image: '/images/hero-hair.jpg', alt: 'Hair colouring at home by Aira Luxury' },
];

export const CITY_CARDS = [
  { path: 'salon-at-home-delhi', name: 'Delhi', copy: 'Check availability for your locality.' },
  { path: 'salon-at-home-noida', name: 'Noida', copy: 'Check which services reach your sector.' },
  { path: 'salon-at-home-gurgaon', name: 'Gurgaon', copy: 'Gurugram localities, checked before booking.' },
];

export const HOME_FAQS: Faq[] = [
  { q: 'Which areas do you serve?', a: 'Delhi, Noida and Gurgaon. Availability varies by locality, so check yours before booking.' },
  { q: 'How do I book?', a: 'Choose a service, then download the Aira app to check availability and book.' },
  { q: 'What services can I book?', a: "Haircuts, facials, waxing, hair spa, makeup, kids' haircuts, bridal services, manicure and pedicure, threading and hair colouring." },
  { q: 'How long has Aira Luxury been in beauty?', a: 'Our beauty journey began in 2000. We are now bringing it online so services are easier to discover and book.' },
  { q: 'Can I book more than one service?', a: 'Yes. Combined services need extra appointment time, shown when you book.' },
  { q: 'Is there a mobile app?', a: 'Yes. Book through the Aira app. This website helps you explore services and download the app.' },
];

const SERVICE_PAGES: PageContent[] = [
  {
    path: 'haircut-at-home',
    kind: 'service',
    label: 'Haircut & Styling',
    name: 'Haircut at Home',
    seoTitle: 'Haircut at Home in Delhi NCR | Aira Luxury',
    description: 'Explore haircut services at home with Aira Luxury in Delhi, Noida and Gurgaon. Trims, restyling, blow-dry and styling details, with booking in the mobile app.',
    kicker: 'Hair',
    h1: 'Haircut at Home',
    intro: 'A fresh cut or a new look, styled for your hair type and routine, without the trip to a salon.',
    image: '/images/hero-hair.jpg',
    imageAlt: 'Haircut at home by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Haircut and trim', 'Restyle', 'Blow-dry', 'Hair ironing', 'Occasion styling'] },
      { heading: 'Good to know', list: ['Share reference photos of the look you want.', 'Mention recent colouring or treatments.', 'Keep a chair in a well-lit spot ready.'] },
    ],
    faqs: [
      { q: 'Can I add a blow-dry to my haircut?', a: 'Yes. Styling such as blow-dry or ironing can be added; it needs a little extra time.' },
      { q: 'How do I explain the style I want?', a: 'Show a photo and say how much length you want to keep.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'facial-at-home',
    kind: 'service',
    label: 'Facials & Clean-ups',
    name: 'Facial at Home',
    seoTitle: 'Facial at Home in Delhi NCR | Aira Luxury',
    description: 'Book a facial at home with Aira Luxury: clean-up, fruit, glow, brightening and anti-tan facials in Delhi, Noida and Gurgaon.',
    kicker: 'Skin',
    h1: 'Facial at Home',
    intro: "Deep-cleansing and refreshing treatments chosen for your skin's needs, done in your own space.",
    image: '/images/hero-facial.jpg',
    imageAlt: 'Facial at home by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Clean-up', 'Fruit facial', 'Glow facial', 'Brightening facial', 'Anti-tan facial'] },
      {
        heading: 'Good to know',
        list: ['Start with a clean face, without heavy makeup.', 'Skip scrubs the day before.', 'Mention sensitive skin or allergies.'],
        paragraphs: ['Facials are beauty treatments, not medical or dermatological care.'],
      },
    ],
    faqs: [
      { q: 'Which facial should I choose?', a: 'A clean-up for a quick refresh; glow, brightening or anti-tan for a fuller routine.' },
      { q: 'How long does it take?', a: 'About an hour for most facials. A clean-up is shorter.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'waxing-at-home',
    kind: 'service',
    label: 'Waxing',
    name: 'Waxing at Home',
    seoTitle: 'Waxing at Home in Delhi NCR | Aira Luxury',
    description: 'Book waxing at home with Aira Luxury: Rica, honey and chocolate wax for arms, legs, underarms and face in Delhi, Noida and Gurgaon.',
    kicker: 'Grooming',
    h1: 'Waxing at Home',
    intro: 'Full-body or partial waxing with the wax that suits your skin, booked around your day.',
    image: '/images/waxing-at-home.jpg',
    imageAlt: 'Waxing at home by Aira Luxury',
    sections: [
      { heading: 'Wax types', list: ['Rica wax', 'Honey wax', 'Chocolate wax'] },
      { heading: 'Areas', list: ['Full arms', 'Full legs', 'Half legs', 'Underarms', 'Face'] },
      { heading: 'Good to know', list: ['Hair should be about a quarter inch long.', 'No lotion or oil on the day.', 'Mention sunburn or sensitive skin.'] },
    ],
    faqs: [
      { q: 'Which wax suits sensitive skin?', a: 'Rica is often chosen for sensitive areas, but skin differs. Mention sensitivity when you book.' },
      { q: 'Can I combine areas?', a: 'Yes. Arms, legs and underarms can be booked together; longer combinations take more time.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'hair-spa-at-home',
    kind: 'service',
    label: 'Hair Spa',
    name: 'Hair Spa at Home',
    seoTitle: 'Hair Spa at Home in Delhi NCR | Aira Luxury',
    description: 'Book a hair spa at home with Aira Luxury: deep-conditioning spa, keratin, scalp scrub and hair-fall treatments in Delhi, Noida and Gurgaon.',
    kicker: 'Hair care',
    h1: 'Hair Spa at Home',
    intro: 'Conditioning and scalp care that lets you unwind without stepping out.',
    image: '/images/hero-ritual.jpg',
    imageAlt: 'Hair spa at home by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Hair spa', 'Keratin treatment', 'Scalp scrub', 'Hair-fall treatment', 'Head massage'] },
      { heading: 'Good to know', list: ['Time depends on hair length.', 'Mention recent colour or chemical treatments.', 'Go easy on heat styling after keratin.'] },
    ],
    faqs: [
      { q: 'How often should I book a hair spa?', a: 'Every few weeks suits most people; it depends on your hair.' },
      { q: 'How long is a keratin treatment?', a: 'Around two hours, depending on hair length.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'makeup-at-home',
    kind: 'service',
    label: 'Party Makeup',
    name: 'Makeup Artist at Home',
    seoTitle: 'Makeup Artist at Home in Delhi NCR | Aira Luxury',
    description: 'Book a makeup artist at home with Aira Luxury for parties, engagements and festive events in Delhi, Noida and Gurgaon.',
    kicker: 'Occasion',
    h1: 'Makeup Artist at Home',
    intro: 'Get event-ready where you are, with makeup planned around your outfit and timing.',
    image: '/images/bridal-makeup-at-home.jpg',
    imageAlt: 'Makeup artist at home by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Party makeup', 'Engagement makeup', 'Festive makeup', 'Hair styling add-on'] },
      { heading: 'Good to know', list: ['Share outfit colours and reference looks.', 'Book early in wedding and festive season.'] },
      { heading: 'Getting married?', paragraphs: ['Wedding-day and pre-bridal services have their own page.'], link: { label: 'Bridal beauty', path: '/bridal-makeup' } },
    ],
    faqs: [
      { q: 'Can I add hair styling?', a: 'Yes, subject to availability when you book.' },
      { q: 'How early should I book?', a: 'As early as you can, especially in wedding season.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'kids-haircut-at-home',
    kind: 'service',
    label: 'Kids Haircut',
    name: 'Kids Haircut at Home',
    seoTitle: 'Kids Haircut at Home in Delhi NCR | Aira Luxury',
    description: "Book a kids' haircut at home with Aira Luxury in Delhi, Noida and Gurgaon. No salon queues, in a space your child knows.",
    kicker: 'Kids',
    h1: 'Kids Haircut at Home',
    intro: 'No queues and no unfamiliar chairs. Haircut time is easier where your child feels comfortable.',
    image: '/images/hero-hair.jpg',
    imageAlt: 'Kids haircut at home by Aira Luxury',
    sections: [
      { heading: 'Good to know', list: ['Pick a time when your child is rested and fed.', 'Keep a favourite toy or video nearby.', "Tell us your child's age and any worries, such as clippers."] },
    ],
    faqs: [
      { q: 'What if my child is nervous?', a: "Choose a calm time and share any worries; the cut can go at your child's pace." },
      { q: 'Can parents book alongside?', a: 'Yes. Combined appointments need extra time.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'bridal-makeup',
    kind: 'service',
    label: 'Bridal Beauty',
    name: 'Bridal Makeup',
    seoTitle: 'Bridal Makeup in Delhi NCR | Aira Luxury',
    description: 'Bridal makeup, engagement makeup and pre-bridal beauty with Aira Luxury in Delhi, Noida and Gurgaon. Plan your appointments ahead.',
    kicker: 'Bridal',
    h1: 'Bridal Makeup',
    intro: 'Get ready for your big day with family around you, from pre-bridal care to the final look.',
    image: '/images/bridal-makeup-at-home.jpg',
    imageAlt: 'Bridal makeup by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Wedding-day makeup', 'Engagement makeup', 'Pre-bridal packages', 'Bridal hair styling'] },
      { heading: 'Planning tips', list: ['Book months ahead in wedding season.', 'Share outfit, jewellery and reference looks.', 'Plan facials, waxing and hair care in the weeks before.'] },
      { heading: 'Packages and trials', paragraphs: ['Package details, trials and artist availability vary; confirm them before booking.'] },
    ],
    faqs: [
      { q: 'What are pre-bridal services?', a: 'Beauty appointments in the weeks before the wedding: facials, waxing, threading, mani-pedi and hair care.' },
      { q: 'When should I book?', a: 'A few months ahead in peak season.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'manicure-pedicure-at-home',
    kind: 'service',
    label: 'Manicure & Pedicure',
    name: 'Manicure and Pedicure at Home',
    seoTitle: 'Manicure & Pedicure at Home | Aira Luxury',
    description: 'Book a manicure and pedicure at home with Aira Luxury: classic and deluxe mani-pedi, nail paint and gel nails in Delhi, Noida and Gurgaon.',
    kicker: 'Nails',
    h1: 'Manicure & Pedicure at Home',
    intro: 'Shaping, cuticle care, exfoliation and a massage, finished with the polish you choose.',
    image: '/images/manicure-pedicure-at-home.jpg',
    imageAlt: 'Manicure and pedicure at home by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Classic manicure', 'Deluxe manicure', 'Classic pedicure', 'Deluxe pedicure', 'Nail paint', 'Gel nails'] },
      { heading: 'Good to know', list: ['Remove old polish if you can.', 'Wear open footwear after a pedicure.'] },
    ],
    faqs: [
      { q: "What's the difference?", a: 'A manicure is for hands, a pedicure for feet. Many people book both.' },
      { q: 'How long does a mani-pedi take?', a: 'One to two hours, depending on the treatments.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'threading-at-home',
    kind: 'service',
    label: 'Threading',
    name: 'Threading at Home',
    seoTitle: 'Threading at Home in Delhi NCR | Aira Luxury',
    description: 'Book threading at home with Aira Luxury: eyebrow shaping, upper lip and chin in Delhi, Noida and Gurgaon.',
    kicker: 'Grooming',
    h1: 'Threading at Home',
    intro: 'Quick, precise shaping that fits easily alongside a facial or waxing appointment.',
    image: '/images/threading-at-home.jpg',
    imageAlt: 'Threading at home by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Eyebrows', 'Upper lip', 'Chin'], paragraphs: ['Face waxing is available for larger areas.'] },
      { heading: 'Good to know', list: ['Skip exfoliants and retinol the day before.', 'Mention sensitive skin.'] },
    ],
    faqs: [
      { q: 'How long does eyebrow threading take?', a: 'About 10 to 15 minutes.' },
      { q: 'Can I add it to a facial?', a: 'Yes, threading can be booked with a facial or waxing.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
  {
    path: 'hair-colouring-at-home',
    kind: 'service',
    label: 'Hair Colouring',
    name: 'Hair Colouring at Home',
    seoTitle: 'Hair Colouring at Home in Delhi NCR | Aira Luxury',
    description: 'Book hair colouring at home with Aira Luxury: root touch-up, global colour and shade refresh in Delhi, Noida and Gurgaon.',
    kicker: 'Colour',
    h1: 'Hair Colouring at Home',
    intro: 'Talk through your shade and history first, then colour in comfort.',
    image: '/images/hero-hair.jpg',
    imageAlt: 'Hair colouring at home by Aira Luxury',
    sections: [
      { heading: 'What you can book', list: ['Root touch-up', 'Global colour', 'Shade refresh'] },
      { heading: 'Good to know', list: ['Share photos of the colour you want.', 'Mention previous colour or chemical treatments.', 'Price and time depend on hair length.'] },
      { heading: 'Patch test', paragraphs: ['Hair dye can cause allergic reactions. A patch test is recommended, especially with a new product.'] },
    ],
    faqs: [
      { q: 'Do I need a patch test?', a: 'It is recommended, particularly with a new product or sensitive skin.' },
      { q: 'Does hair length matter?', a: 'Yes. Longer or thicker hair needs more product and time.' },
    ],
    closing: 'Beauty experience since 2000.',
  },
];

const CITY_SECTIONS = (city: string, extra: string): Section[] => [
  { heading: 'What you can book', paragraphs: [`All ten Aira services are available to explore in ${city}. ${extra}`] },
  { heading: 'How it works', list: ['Explore a service.', 'Check your locality in the app.', 'Book through the Aira mobile app.'] },
];

const CITY_PAGES: PageContent[] = [
  {
    path: 'salon-at-home-delhi',
    kind: 'city',
    city: 'Delhi',
    label: 'Delhi',
    name: 'Salon at Home in Delhi',
    seoTitle: 'Salon at Home in Delhi | Aira Luxury Beauty Services',
    description: 'Salon at home in Delhi with Aira Luxury. Book haircuts, facials, waxing, hair spa, makeup, bridal and more at home. Beauty experience since 2000.',
    kicker: 'Delhi',
    h1: 'Salon at Home in Delhi',
    intro: 'Hair, skin, makeup and grooming appointments across Delhi, from a beauty business that began in 2000.',
    image: '/images/hero-team.jpg',
    imageAlt: 'Aira Luxury salon at home in Delhi',
    sections: CITY_SECTIONS('Delhi', 'Availability varies by locality.'),
    faqs: [
      { q: 'Which parts of Delhi do you cover?', a: 'Coverage is growing; check your locality before booking.' },
      { q: 'Can I book bridal makeup in Delhi?', a: 'Yes, subject to artist availability for your date and area.' },
    ],
    closing: 'Your beauty, your comfort, your home.',
  },
  {
    path: 'salon-at-home-noida',
    kind: 'city',
    city: 'Noida',
    label: 'Noida',
    name: 'Salon at Home in Noida',
    seoTitle: 'Salon at Home in Noida | Aira Luxury Home Beauty Services',
    description: 'Explore Aira Luxury salon-at-home services in Noida, including haircuts, facials, waxing, hair spa, makeup and mani-pedi. Book through the mobile app.',
    kicker: 'Noida',
    h1: 'Salon at Home in Noida',
    intro: 'Discover everyday grooming and occasion beauty across Noida sectors, then book in the Aira app.',
    image: '/images/hero-facial.jpg',
    imageAlt: 'Aira Luxury salon at home in Noida',
    sections: CITY_SECTIONS('Noida', 'Availability varies by sector.'),
    faqs: [
      { q: 'Do you cover every Noida sector?', a: 'Not yet; check your sector before booking.' },
      { q: 'Can I book a facial in Noida?', a: 'Yes. See which facial options reach your sector.' },
    ],
    closing: 'Beauty experience since 2000, now online.',
  },
  {
    path: 'salon-at-home-gurgaon',
    kind: 'city',
    city: 'Gurugram',
    label: 'Gurgaon',
    name: 'Salon at Home in Gurgaon',
    seoTitle: 'Salon at Home in Gurgaon | Aira Luxury Beauty Services',
    description: 'Salon at home in Gurgaon (Gurugram) with Aira Luxury. Book haircuts, facials, waxing, hair spa, makeup, bridal and grooming at home.',
    kicker: 'Gurgaon · Gurugram',
    h1: 'Salon at Home in Gurgaon',
    intro: 'Personal care and special-occasion beauty across Gurugram, planned from your sofa.',
    image: '/images/hero-ritual.jpg',
    imageAlt: 'Aira Luxury salon at home in Gurgaon',
    sections: CITY_SECTIONS('Gurugram', 'Availability varies by locality.'),
    faqs: [
      { q: 'Is Gurugram covered?', a: 'Yes. Availability varies by locality, so check yours first.' },
      { q: 'Can I book a hair spa in Gurgaon?', a: 'Yes. See which hair care options reach your area.' },
    ],
    closing: 'A beauty journey since 2000, growing with you.',
  },
];

const OTHER_PAGES: PageContent[] = [
  {
    path: 'about-aira-luxury',
    kind: 'about',
    label: 'Our story',
    name: 'About Aira Luxury',
    seoTitle: 'About Aira Luxury | Beauty Experience Since 2000',
    description: "Discover Aira Luxury's beauty journey since 2000, our home salon services in Delhi, Noida and Gurgaon, and the app where appointments are booked.",
    kicker: 'Since 2000',
    h1: 'About Aira Luxury',
    intro: 'A beauty business that began in 2000, now making professional beauty easier to book.',
    image: '/images/hero-team.jpg',
    imageAlt: 'The Aira Luxury beauty team',
    sections: [
      {
        heading: 'Our journey',
        paragraphs: [
          'What started in 2000 as a passion for beauty and personal care has grown with changing trends and customer needs.',
          'Today we are taking the next step: sharing our services online and making booking simple through the Aira mobile app.',
        ],
      },
      {
        heading: 'What we stand for',
        list: ['Experience, since 2000', 'Personalised care', 'Modern convenience'],
      },
      {
        heading: 'Our services',
        paragraphs: ["Haircuts, facials, waxing, hair spa, makeup, kids' haircuts, bridal, manicure and pedicure, threading and hair colouring."],
        link: { label: 'Explore services', path: '/services' },
      },
    ],
    closing: 'Experience since 2000. A new way to book beauty.',
  },
  {
    path: 'services',
    kind: 'services',
    label: 'Services',
    name: 'Home Beauty Services',
    seoTitle: 'Home Beauty Services in Delhi NCR | Aira Luxury',
    description: 'Aira Luxury home salon services in Delhi, Noida and Gurgaon: haircut, facial, waxing, hair spa, makeup, bridal, kids haircut, mani-pedi, threading and hair colour.',
    kicker: 'Our services',
    h1: 'Beauty Services, Brought to You',
    intro: 'Skip the travel and the wait. Choose a service to see what is included and how to prepare.',
    image: '/images/hero-facial.jpg',
    imageAlt: 'Aira Luxury beauty services',
    sections: [],
    faqs: HOME_FAQS.slice(0, 3),
    closing: 'Your beauty. Your comfort. Your home.',
  },
  {
    path: 'contact',
    kind: 'contact',
    label: 'Book',
    name: 'Book an Appointment',
    seoTitle: 'Book an Appointment | Aira Luxury Home Salon in Delhi NCR',
    description: 'Explore Aira Luxury home salon services in Delhi, Noida and Gurgaon, then book an appointment through the Aira mobile app.',
    kicker: 'Book',
    h1: 'Book an Appointment',
    intro: 'Choose your device to download the Aira app and book an appointment.',
    image: '/images/hero-team.jpg',
    imageAlt: 'Book an Aira Luxury appointment',
    sections: [],
    closing: 'Bringing beauty home since 2000.',
  },
  {
    path: 'become-a-partner',
    kind: 'partner',
    label: 'Become a partner',
    name: 'Become an Aira Luxury Partner',
    seoTitle: 'Become a Partner | Aira Luxury',
    description: 'Partner with Aira Luxury. Tell us about yourself and your beauty business, and our team will follow up with you.',
    kicker: 'Grow with Aira',
    h1: 'Become an Aira Partner',
    intro: 'Are you a beauty professional or business looking to grow? Tell us a little about yourself and we will be in touch.',
    image: '/images/hero-team.jpg',
    imageAlt: 'The Aira Luxury beauty team',
    sections: [],
    closing: 'Let’s grow together.',
  },
];

const LEGAL_PAGES: PageContent[] = [
  {
    path: 'privacy-policy',
    kind: 'privacy',
    label: 'Privacy policy',
    name: 'Aira Luxury Privacy Policy',
    seoTitle: 'Privacy Policy | Aira Luxury',
    description: 'Learn how Aira Luxury collects, uses, shares, and retains personal information when you use our website and app.',
    kicker: 'Your privacy',
    h1: 'Privacy Policy',
    intro: 'Last updated 13 November 2026. This policy explains how Aira Luxury handles information when you use our website and mobile app.',
    image: '/images/hero-team.jpg',
    imageAlt: 'Aira Luxury',
    sections: [
      {
        heading: 'Information we collect',
        paragraphs: [
          'Depending on how you use Aira Luxury, we may collect your mobile number and one-time-passcode verification details; your name, email address, and profile details that you provide; saved addresses and service location; and information about services, appointments, payments, and support requests.',
          'If you allow location access in the app, location information may be used to help set an address and check service availability. You can manage location permission in your device settings.',
        ],
      },
      {
        heading: 'How we use information',
        list: [
          'Create and secure your account, and verify sign-in requests.',
          'Check service availability and arrange appointments at your chosen address.',
          'Coordinate a booking with the beauty professional assigned to it.',
          'Process or confirm payments and provide customer support.',
          'Maintain service, security, and administrative records.',
        ],
      },
      {
        heading: 'When information is shared',
        paragraphs: [
          'We share only information needed to operate the service with providers who help us deliver it, such as hosting, communications, and payment providers. Appointment details needed to perform a service may be shared with the beauty professional assigned to that appointment. We may also disclose information when required by law or to protect customers, the business, or the service.',
        ],
      },
      {
        heading: 'Payments and security',
        paragraphs: [
          'Payments may be handled by a payment provider. Aira Luxury receives transaction details needed to manage your booking; payment information handled by a provider is subject to that provider’s own privacy terms. We use reasonable safeguards to protect information, but no online service can guarantee absolute security.',
        ],
      },
      {
        heading: 'Retention and account deletion',
        paragraphs: [
          'We keep information for as long as needed to provide and administer the service, meet legal obligations, resolve disputes, and protect the service. We verify control of the mobile number with a one-time code before disabling access to a matching account and recording the request for administration. Some records may be retained; submitting the form does not mean all information is immediately erased. Signing in again later may create a new account.',
        ],
        link: { label: 'Submit an account-deletion request', path: '/delete-account' },
      },
      {
        heading: 'Contact us',
        paragraphs: [
          `For privacy questions or requests, email ${SITE.privacyEmail}.`,
        ],
      },
    ],
    closing: 'Your trust matters to us.',
  },
  {
    path: 'delete-account',
    kind: 'delete-account',
    label: 'Delete account',
    name: 'Aira Luxury Account Deletion Request',
    seoTitle: 'Delete Your Aira Luxury Account',
    description: 'Submit an account-deletion request for Aira Luxury using the mobile number associated with your account.',
    kicker: 'Account settings',
    h1: 'Delete Your Account',
    intro: 'Verify the mobile number linked to your Aira Luxury account to submit an account-deletion request.',
    image: '/images/hero-team.jpg',
    imageAlt: 'Aira Luxury',
    sections: [
      {
        heading: 'What happens after you submit',
        paragraphs: [
          'We send a one-time code to verify control of the mobile number before processing the request. If an account exists for that number, access is disabled and the request is recorded for administrative follow-up. Some information may be retained for administrative or legal requirements, so this request does not guarantee immediate erasure of every record. Signing in again later may create a new account.',
          `You can also request account deletion from Profile → Delete account in the Aira Luxury app. For help, contact ${SITE.privacyEmail}.`,
        ],
        link: { label: 'Read the Privacy Policy', path: '/privacy-policy' },
      },
    ],
    closing: 'Confirm your mobile number to submit a deletion request.',
  },
];

export const PAGES: PageContent[] = [...SERVICE_PAGES, ...CITY_PAGES, ...OTHER_PAGES, ...LEGAL_PAGES];

export const pageByPath = (path: string) => PAGES.find((page) => page.path === path);
