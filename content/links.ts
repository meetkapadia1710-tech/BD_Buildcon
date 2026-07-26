export const employeeLinks = {
  erp: 'http://bhumi.novasoftwares.com/',
  email: 'https://mail.yandex.ru/?pdd_domain=bdbuildcon.com',
}

// Leave a value empty ('') and it simply won't render in the footer.
// Fill in the real profile URLs, e.g. 'https://linkedin.com/company/bd-buildcon'.
export const socialLinks = {
  twitter: '',
  facebook: '',
  linkedin: '',
}

export const addressComponents = {
  streetAddress: '7-8-9, Millenium Arcade, Opp. SVM Engineering College, Old National Highway No 8',
  addressLocality: 'Bharuch',
  addressRegion: 'Gujarat',
  postalCode: '392002',
  addressCountry: 'IN',
  fullAddress:
    '7-8-9, Millenium Arcade, Opp. SVM Engineering College, Old National Highway No 8, Bharuch - 392 002, Gujarat, INDIA',
}

export const openingHoursSpec = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '20:00',
  },
]

export const contactInfo = {
  phone: '+91 98791 00355',
  phoneTel: '+919879100355',
  email: 'business@bdbuildcon.com',
  address: addressComponents.fullAddress,
  streetAddress: addressComponents.streetAddress,
  hours: 'Mon–Fri: 10:00 – 20:00',
  openingHoursSchema: 'Mo-Fr 10:00-20:00',
  openingHoursSpecification: openingHoursSpec,
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.505!2d72.99590!3d21.70510!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQyJzE4LjQiTiA3MsKwNTknNDUuMiJF!5e0!3m2!1sen!2sin!4v1234567890',
}
