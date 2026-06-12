import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { DataTable } from '@/components/ui/DataTable'
import { machinery } from '@/content/machinery'

export const metadata: Metadata = {
  title: 'Plant & Machinery',
  description: "Complete inventory of BD Buildcon's owned plant and machinery — excavators, cranes, concrete pumps, piling rigs and more.",
}

export default function PlantMachineryPage() {
  return (
    <>
      <PageTitleBand
        title="Plant and Machineries"
        breadcrumbs={[{ label: 'About Us' }, { label: 'Plant & Machinery' }]}
        description="Our owned fleet of heavy construction plant and machinery — enabling on-schedule delivery without third-party dependencies."
      />

      <section className="section-pad bg-white">
        <div className="container-max">
          <DataTable data={machinery} caption="Plant and Machinery Inventory" />
        </div>
      </section>

      <CTABand />
    </>
  )
}
