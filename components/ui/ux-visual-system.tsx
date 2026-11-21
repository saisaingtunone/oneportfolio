import { uxVisualSystems } from '../../src/ux-visual-systems'
import TextReveal from './text-reveal'

export function UXVisualSystem({ projectId }: { projectId: string }) {
  const system = uxVisualSystems[projectId]
  if (!system) return null

  return (
    <section className="project-evidence ux-visual-system" aria-labelledby="ux-visual-system-heading">
      <TextReveal as="h2" id="ux-visual-system-heading">Visual system</TextReveal>
      <div className="workflow-panel ux-system-panel">
        <section aria-labelledby="ux-palette-heading">
          <TextReveal as="h3" id="ux-palette-heading">Color palette</TextReveal>
          <TextReveal as="p" className="workflow-note">{system.paletteSource ?? 'Colors sampled from the project screens.'}</TextReveal>
          <TextReveal as="ul" className="artwork-swatches ux-system-swatches">
            {system.palette.map(([name, color, use]) => (
              <li key={color}>
                <span className="artwork-swatch" style={{ backgroundColor: color }} aria-hidden="true" />
                <strong>{name}</strong>
                <code>{color}</code>
                <span>{use}</span>
              </li>
            ))}
          </TextReveal>
        </section>
        <section aria-labelledby="ux-typography-heading">
          <TextReveal as="h3" id="ux-typography-heading">Typography</TextReveal>
          <TextReveal as="p" className="workflow-note">{system.typeSource}</TextReveal>
          <TextReveal as="dl" className="ux-type-scale">
            {system.type.map(([role, font, size]) => (
              <div key={role}>
                <dt>{role}</dt>
                <dd>
                  <span>{font}</span>
                  {size && <span className="ux-type-size">{size}</span>}
                </dd>
              </div>
            ))}
          </TextReveal>
        </section>
      </div>
    </section>
  )
}
