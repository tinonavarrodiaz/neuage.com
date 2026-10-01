export const createModalImg = (img: string, listImg: string[], name = ''): void => {
  const imagesTotal = listImg.length
  const Modal = document.createElement('div')
  Modal.className = 'Modal'
  Modal.setAttribute('role', 'dialog')
  Modal.setAttribute('aria-modal', 'true')
  Modal.setAttribute('aria-label', name ? `Galería de ${name}` : 'Galería de imágenes')

  Modal.innerHTML = `
    <button class="Modal__close" aria-label="Cerrar galería">&times;</button>
    <div class="Modal__content">
      <button class="btn-nav btn-prev" aria-label="Imagen anterior"><i class="fa-solid fa-angle-left"></i></button>
      <button class="btn-nav btn-next" aria-label="Imagen siguiente"><i class="fa-solid fa-angle-right"></i></button>
      <img src="${img}" alt="${name ? `Habitación ${name}` : 'Imagen de habitación'}" />
    </div>
  `
  document.body.append(Modal)

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
  }

  const closeModal = (): void => {
    Modal.classList.remove('open')
    window.removeEventListener('keydown', onKeydown)
    setTimeout(() => Modal.remove(), 500)
  }

  setTimeout(() => {
    Modal.classList.add('open')
    Modal.querySelector<HTMLButtonElement>('.Modal__close')?.focus()
  }, 50)

  Modal.querySelector('.Modal__close')?.addEventListener('click', closeModal)
  Modal.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).classList.contains('Modal')) closeModal()
  })
  window.addEventListener('keydown', onKeydown)

  const Image = Modal.querySelector('img') as HTMLImageElement
  Modal.querySelectorAll<HTMLButtonElement>('.btn-nav').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (imagesTotal < 2) return
      const currentIndex = listImg.indexOf(Image.src)
      const base = currentIndex === -1 ? 0 : currentIndex
      const isPrev = btn.classList.contains('btn-prev')
      const nextIndex = isPrev
        ? (base - 1 + imagesTotal) % imagesTotal
        : (base + 1) % imagesTotal

      Modal.classList.remove('change-image')
      setTimeout(() => {
        Modal.classList.add('change-image')
        Image.src = listImg[nextIndex]
      }, 50)
    })
  })
}
