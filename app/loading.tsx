import { PageTitleBand } from '@/components/layout/PageTitleBand'

export default function Loading() {
  return (
    <>
      <div className="h-[200px] lg:h-[300px] w-full bg-surface animate-pulse" />
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="h-12 w-64 bg-surface rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-card bg-surface animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
