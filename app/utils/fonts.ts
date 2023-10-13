import { Albert_Sans, Inter, Noto_Sans_Thai, Prompt } from 'next/font/google'

export const default_font_eng = Inter({
    subsets: ['latin'],
    style: ['normal'],
    weight: ['300', '400', '600', '700'],
})
// export const default_font_thai = Noto_Sans_Thai({
// 	subsets: ['thai'],
// 	style: ['normal'],
// 	weight: ['300', '400', '600'],
// });

export const second_font_thai = Prompt({
    subsets: ['thai', 'latin-ext'],
    style: ['normal'],
    weight: ['300', '400', '600'],
})
