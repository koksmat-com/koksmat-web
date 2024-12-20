/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/mrXeApUaeE7
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"

export function Disclaimer(props : {onConsent : ()=>void}) {
  return (
    <section className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl rounded-lg bg-card p-6 text-center shadow">
          <div className="mb-4 text-lg font-medium text-muted-foreground">Disclaimer</div>
          <p className="mb-6 text-muted-foreground">
            Please read the following disclaimer carefully. By clicking &quot;Continue&quot;, you acknowledge and understand the
            terms of this disclaimer.
          </p>
          <p className="mb-6 text-sm text-muted-foreground">
            The information provided on this website is for general informational purposes only. We make no
            representations or warranties of any kind, express or implied, about the completeness, accuracy,
            reliability, suitability or availability of the information, products, services, or related graphics
            contained on the website for any purpose. Any reliance you place on such information is therefore strictly
            at your own risk.
          </p>
          <Button onClick={()=> {props.onConsent()}} className="bg-primary text-primary-foreground hover:bg-primary/90">Continue</Button>
        </div>
      </div>
    </section>
  )
}
