/**
 * Marco de teléfono para las capturas de la app.
 *
 * Los PNG de `assets/mockups-free/` son capturas crudas, sin marco dibujado.
 * El marco se hace aquí en CSS para no depender de imágenes nuevas y para
 * que el borde se vea nítido en cualquier densidad.
 *
 * Las capturas vienen del teléfono a 1320×2868 y están reescaladas a 840 de
 * ancho: se muestran como mucho a 280 px CSS, así que 840 cubre pantallas
 * de 3x sin arrastrar varios MB por imagen.
 */

const SHOT_WIDTH = 840
const SHOT_HEIGHT = 1825

type Props = {
  src: string
  alt: string
  className?: string
  /** El mockup del hero es lo primero que se ve: ese carga sin lazy. */
  priority?: boolean
}

export default function PhoneFrame({ src, alt, className = '', priority = false }: Props) {
  return (
    <div
      className={`rounded-[2rem] bg-forest p-[3px] shadow-[0_30px_50px_-24px_rgba(31,74,44,0.55)] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.85rem] bg-white">
        <img
          src={src}
          alt={alt}
          width={SHOT_WIDTH}
          height={SHOT_HEIGHT}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="block w-full"
        />
      </div>
    </div>
  )
}
