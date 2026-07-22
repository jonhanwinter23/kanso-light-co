/** @type {import('./types').Product[]} */
const products = [
  {
    id: 1,
    name: { km: 'អំពូលតុ Kiri Classic', en: 'The Kiri Classic Table Lamp' },
    category: 'table',
    tags: ['table', 'japandi'],
    price: 29.0,
    badge: { km: 'លក់ដាច់បំផុត', en: 'Bestseller' },
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    specs: {
      km: 'ជើងទម្រពណ៌ខ្មៅ Matte • កន្សែងក្រណាត់ Linen',
      en: 'Matte Black Pedestal • Warm Linen Shade',
    },
    desc: {
      km: 'រចនាឡើងជាមួយជើងទម្រឈើ/លោហៈយ៉ាងប្រណិត គួបផ្សំជាមួយកន្សែងក្រណាត់ linen ពន្លឺទន់ភ្លឺថ្លា។ បញ្ចេញពន្លឺក្តៅសម្រួលភ្នែក ស័ក្តិសមបំផុតសម្រាប់តុជិតគ្រែ ឬតុទទួលភ្ញៀវ។',
      en: 'Designed with a classic turned pedestal base and paired with a textured cream linen shade. Casts a soft, soothing ambient warm glow perfect for nightstands or coffee tables.',
    },
  },
  {
    id: 2,
    name: { km: 'អំពូលកែវមូល Sora Opal', en: 'The Sora Opal Globe' },
    category: 'table',
    tags: ['table', 'japandi'],
    price: 42.0,
    badge: { km: 'ពេញនិយម', en: 'Popular' },
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
    specs: {
      km: 'លោហៈពណ៌មាស Brushed Brass • កែវស្រអាប់រលោង',
      en: 'Brushed Brass • Frosted Glass Diffuser',
    },
    desc: {
      km: 'អំពូលរាងមូលបែបធរណីមាត្រដែលនាំមកនូវសភណ្ឌភាពប្រណិតកម្រិតសណ្ឋាគារសម្រាប់តុធ្វើការ ឬទូក្លាស៊ិក។',
      en: 'A timeless geometric sphere lamp that brings a refined, hotel-like aesthetic to any credenza or desk.',
    },
  },
  {
    id: 3,
    name: { km: 'អំពូលឈររាងកោង Akor Timber', en: 'The Akor Timber Floor Arc' },
    category: 'floor',
    tags: ['floor', 'japandi'],
    price: 78.0,
    badge: { km: 'ម៉ូដឆ្នើម', en: 'Statement Piece' },
    image:
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80',
    specs: {
      km: 'ឈើពណ៌ Walnut • រាងកោងទន់ភ្លន់',
      en: 'Walnut Wood Finish • Curved Arc Profile',
    },
    desc: {
      km: 'អំពូលឈររាងកោងខ្ពស់ដ៏ប្រណិតដែលបញ្ចេញពន្លឺពីលើមកលើកៅអីអានសៀវភៅ និងសាឡុងយ៉ាងមានរចនាប័ទ្ម។',
      en: 'Graceful overarching floor lamp designed to float gentle overhead light over reading armchairs and sofas.',
    },
  },
  {
    id: 4,
    name: { km: 'អំពូលសេរ៉ាមិច Wabi Ceramic', en: 'The Wabi Ceramic Accent Light' },
    category: 'table',
    tags: ['table', 'japandi'],
    price: 35.0,
    badge: { km: 'ម៉ូដថ្មី', en: 'New' },
    image:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
    specs: {
      km: 'សេរ៉ាមិចធ្វើដោយដៃ • ពណ៌ដីឥដ្ឋ Terracotta',
      en: 'Handcrafted Ceramic • Terracotta Tone',
    },
    desc: {
      km: 'ជើងសេរ៉ាមិចបែបធម្មជាតិ Wabi-Sabi ផ្តល់អារម្មណ៍កក់ក្តៅ និងភាពស្ងប់ស្ងាត់ដល់ជ្រុងបន្ទប់។',
      en: 'Tactile, organic ceramic base with natural texture variations. Brings grounding warmth to quiet living room corners.',
    },
  },
  {
    id: 5,
    name: {
      km: 'អំពូលឈរក្រដាស Lantern Minimalist',
      en: 'Minimalist Paper Lantern Floor Lamp',
    },
    category: 'floor',
    tags: ['floor', 'japandi'],
    price: 55.0,
    badge: { km: 'រចនាប័ទ្ម Japandi', en: 'Japandi Icon' },
    image:
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=600&q=80',
    specs: {
      km: 'កន្សែងក្រដាសសរសៃធម្មជាតិ • ជើងដែកស្តើង',
      en: 'Woven Rice Paper Shade • Slim Black Legs',
    },
    desc: {
      km: 'ចាំងពន្លឺទន់ 360 ដឺក្រេ តាមបច្ចេកទេសគោមក្រដាសបុរាណ បន្សំជាមួយឌីហ្សាញទំនើប។',
      en: 'Ultra-diffused, 360-degree soft illumination inspired by traditional lantern craft updated for modern interiors.',
    },
  },
  {
    id: 6,
    name: {
      km: 'កញ្ចប់អំពូល LED Warm 2700K (២ គ្រាប់)',
      en: 'KANSŌ 2700K Soft Warm LED Bulb Pack (2x)',
    },
    category: 'bulbs',
    tags: ['bulbs'],
    price: 9.0,
    badge: { km: 'គ្រឿងបន្លាស់', en: 'Accessory' },
    image:
      'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80',
    specs: {
      km: 'កម្រិតពន្លឺក្តៅ 2700K • ក្បាល E27 • 6W',
      en: '2700K Warm Temperature • E27 Base • 6W',
    },
    desc: {
      km: 'អំពូល LED មិនព្រិចភ្នែក កម្រិតពន្លឺក្តៅ 2700K ពិសេសបង្កើតបរិយាកាសដូចពន្លឺព្រះអាទិត្យរៀបអស្ដង្គត។',
      en: 'Specifically calibrated flicker-free warm LED bulbs selected to give off the ideal cozy, golden-hour light temperature.',
    },
  },
];
