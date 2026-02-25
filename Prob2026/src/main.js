const yearEl = document.querySelector('#year')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())

const intro = document.querySelector('#intro')
if (intro instanceof HTMLElement) {
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const delay = prefersReduced ? 0 : 220
  const duration = prefersReduced ? 0 : 780

  window.setTimeout(() => {
    intro.classList.add('intro--hide')
    window.setTimeout(() => intro.remove(), duration)
  }, delay)
}

const menuBtn = document.querySelector('.menu')
const mobileNav = document.querySelector('#mobileNav')

function setMobileOpen(isOpen) {
  if (!menuBtn || !mobileNav) return
  menuBtn.setAttribute('aria-expanded', String(isOpen))
  mobileNav.hidden = !isOpen
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true'
    setMobileOpen(!isOpen)
  })

  mobileNav.addEventListener('click', (e) => {
    const target = e.target
    if (target instanceof HTMLAnchorElement) setMobileOpen(false)
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMobileOpen(false)
  })
}

const form = document.querySelector('#leadForm')
if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const contact = String(formData.get('contact') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !contact || !message) {
      alert('Пожалуйста, заполните все поля.')
      return
    }

    const leadText = [
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      '',
      'Задача:',
      message,
      '',
      '—',
      'Отправлено с сайта Аяулым (SMM).'
    ].join('\n')

    const instagramUrl =
      form.dataset.instagram || 'https://www.instagram.com/kairullaaya?igsh=bmx5cmk3bnZqa3pr'

    const openInstagram = () => {
      window.open(instagramUrl, '_blank', 'noopener,noreferrer')
    }

    const notify = (copied) => {
      if (copied) {
        alert('Текст заявки скопирован. Сейчас открою Instagram — вставьте текст в Direct.')
      } else {
        alert('Открою Instagram. Скопируйте текст заявки вручную из формы и отправьте в Direct.')
      }
    }

    const clipboard = navigator.clipboard
    if (clipboard?.writeText) {
      clipboard
        .writeText(leadText)
        .then(() => {
          notify(true)
          openInstagram()
        })
        .catch(() => {
          notify(false)
          openInstagram()
        })
    } else {
      notify(false)
      openInstagram()
    }
  })
}

const wordLayer = document.querySelector('#wordLayer')
if (wordLayer instanceof HTMLElement) {
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  const words = [
    'SMM',
    'REELS',
    'INSTAGRAM',
    'РЕКЛАМА',
    'КОНТЕНТ',
    'ЛИДЫ',
    'ОБУЧЕНИЕ',
    'ИИ',
    'IT КУРСЫ'
  ]

  const spawn = () => {
    const el = document.createElement('div')
    el.className = 'word'
    el.textContent = words[Math.floor(Math.random() * words.length)]

    const x = Math.floor(Math.random() * 92) + 4
    const dur = Math.floor(Math.random() * 1700) + 4200
    const size = Math.floor(Math.random() * 18) + 14
    const opacity = (Math.random() * 0.08 + 0.08).toFixed(3)

    el.style.setProperty('--x', `${x}%`)
    el.style.setProperty('--dur', `${dur}ms`)
    el.style.fontSize = `${size}px`
    el.style.color = `rgba(255,255,255,${opacity})`

    wordLayer.appendChild(el)
    window.setTimeout(() => el.remove(), dur + 200)
  }

  if (!prefersReduced) {
    for (let i = 0; i < 6; i += 1) window.setTimeout(spawn, i * 140)
    window.setInterval(spawn, 650)
  }
}
